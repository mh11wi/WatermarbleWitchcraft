function angleToPoint(theta) {
  return { x: Math.cos(theta), y: Math.sin(theta) }
}

function dotProduct(p1, p2) {
  return p1.x * p2.x + p1.y * p2.y;
}

function magnitude(p) {
  return Math.sqrt(dotProduct(p, p));
}

function chaikin(source, start, finish) {
  const result = [];

  for (let i = start; i < finish; i++) {
    const a = source[(i + source.length - 1) % source.length]
    const b = source[i]
    const c = source[(i + 1) % source.length]

    const ab = { x: b.x - a.x, y: b.y - a.y }
    const bc = { x: c.x - b.x, y: c.y - b.y }

    const abLength = magnitude(ab);
    const bcLength = magnitude(bc);

    const dot = dotProduct(ab, bc) / (abLength * bcLength);

    let chop = false;
    if (dot < .8) chop = true;
    else {
      const approxTheta = Math.acos(dot) //(1 - dot) / 2
      const deviation = approxTheta * Math.max(abLength, bcLength)
      if (deviation > 1) chop = true
    }

    if (chop) {
      const left = { x: ab.x * 0.75 + a.x, y: ab.y * 0.75 + a.y }
      const right = { x: bc.x * 0.25 + b.x, y: bc.y * 0.25 + b.y }

      result.push(left);
      result.push(right);

    } else {
      result.push(b);
    }
  }

  return result;
}

function closedSmoothed(points) {
  let result = [...points];
  let grown = true;

  do {
    const newResult = chaikin(result, 0, result.length);
    grown = newResult.length > result.length;
    result = newResult;
  } while (grown)

  return result;
}

function getFlowerPoints(radius, petals, numPoints, gap, width) {
  let points = [];
  for (let i = 0; i < numPoints; i++) {
    const theta = 2 * Math.PI * i / numPoints;
    const p = angleToPoint(theta);
    const c =  Math.cos(petals * theta);

    // Bias upward so it's positive most of the time
    const bias = 1 - gap;
    let v = c + bias;          // shift up
    v = Math.max(0, v);        // clamp negative to 0 (sharp valleys)
    v /= (1 + bias);           // normalize back to [0,1]

    const k = Math.pow(v, width);
    points.push({ x: p.x * k * radius, y: p.y * k * radius });
  }
  
  return points;
}

export function drawFlower(ctx, colors, radius) {
  const petals = 8;
  const numPoints = 100 * petals;
  let gap = 0;
  let width = 0;

  colors.forEach((color, index) => {
    const factor = 1 - (index / (colors.length));
    const points = getFlowerPoints(radius * factor, petals, numPoints, gap, width);
    const smoothed = closedSmoothed(points);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(smoothed[0].x, smoothed[0].y);
    for (let i = 1; i < smoothed.length; i++) {
      ctx.lineTo(smoothed[i].x, smoothed[i].y); 
    }
    ctx.closePath();
    ctx.fill();
    
    gap += index > 0 ? 0.03 : 0;
    width = index > 0 ? width * 1.5 : 0.02;
  });
}
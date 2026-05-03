import Draggable from 'react-draggable';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ToolContext } from 'components/tool/Tool';
import { Box } from '@mui/material';
import { drawFlower } from 'helpers/math';


const StepWatermarble = (props) => {
  const { orientation, colors, coordinate, setCoordinate } = useContext(ToolContext);
  const [posPx, setPosPx] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const canvasRef = useRef(null);
  const allColors = colors.filter(color => color != null);
  
  const getStyle = (color, index) => {
    return {
      width: `${100 - (100 * index / allColors.length)}%`,
      height: 'auto',
      aspectRatio: '1 / 1', 
      backgroundColor: color, 
      borderRadius: '50%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) scale(0)',
      animation: `fadeIn 100ms linear ${(index + 1) * 700}ms, appear 10ms linear ${(allColors.length + 1) * 700}ms reverse`,
      animationFillMode: 'both',
      '@keyframes fadeIn': {
        from: { transform: 'translate(-50%, -50%) scale(0%)' },
        to: { transform: 'translate(-50%, -50%) scale(100%)' }
      },
      '@keyframes appear': {
        from: { opacity: 0, pointerEvents: 'none' },
        to: { opacity: 1, pointerEvents: 'auto' }
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    drawFlower(ctx, allColors, radius);
  }, []);
  
  // Recompute pixel position whenever parent resizes
  useLayoutEffect(() => {
    const parent = canvasRef.current;
    if (!parent) return;

    const update = () => {
      const { offsetWidth: w, offsetHeight: h } = parent;
      setPosPx({
        x: coordinate.x * w,
        y: coordinate.y * h
      });
    };

    update();

    const obs = new ResizeObserver(update);
    obs.observe(parent);
    return () => obs.disconnect();
  }, [coordinate]);
  
  const clampToCircle = (x, y) => {
    const parent = canvasRef.current;
    const circleRadius = parent.offsetWidth / 2;
    
    const rect = dragRef.current;
    const rectRadius = Math.hypot(rect.offsetWidth, rect.offsetHeight) / 2;
    
    const dist = Math.hypot(x, y);
    const maxDist = circleRadius - rectRadius;

    if (dist <= maxDist || dist === 0) return { x, y };

    const scale = maxDist / dist;
    return { x: x * scale, y: y * scale };
  };

  const onDrag = (e, data) => {
    const parent = canvasRef.current;
    const w = parent.offsetWidth;
    const h = parent.offsetHeight;
    
    const { x, y } = clampToCircle(data.x, data.y);

    // Convert pixel to percentage
    setCoordinate({ x: x / w, y: y / h });
  };
  
  return (
    <Box sx={{ 
      position: 'relative',
      width: '100%',
      maxWidth: orientation == 'landscape' ? '60vmin' : '50vmax', 
      flexGrow: 1,
      aspectRatio: '1 / 1',
      border: '2px solid black',
      borderRadius: '50%',
      background: `radial-gradient(circle at 50% 50%,
        rgba(255, 255, 255, 0.95) 0%,   /* bright cup highlight */
        rgba(173, 216, 230, 0.25) 40%, /* very light aqua tint */
        rgba(135, 206, 235, 0.35) 70%, /* pale sky blue */
        rgba(25, 25, 112, 0.4) 100%    /* faint depth at edges */
      )`,
      boxShadow: 3,
      overflow: 'hidden',
      mx: {
        xs: orientation == 'landscape' ? 6 : 0,
        md: orientation == 'landscape' ? 8 : 0,
        lg: orientation == 'landscape' ? 10 : 0
      }
    }}>
      {allColors.map((color, index) => (
        <Box key={index} sx={getStyle(color, index)} />
      ))}
      <canvas ref={canvasRef} width="1000" height="1000" style={{
        width: '100%', 
        height: '100%',
        borderRadius: '50%', 
        position: 'absolute', 
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        animation: `appear 10ms linear`,
        animationDelay: `${(allColors.length + 1) * 700}ms`,
        animationFillMode: 'both'
      }} />
      <Draggable
        position={posPx}
        positionOffset={{x: '-50%', y: '-50%'}}
        onDrag={onDrag}>
        <Box 
          ref={dragRef}
          sx={{ 
            width: '27.5%', 
            height: '50%', 
            position: 'absolute',
            top: '50%',
            left: '50%',
            background: 'rgba(180, 210, 255, 0.16)',
            backgroundImage:
              `linear-gradient(to bottom right, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.1))`,
            backdropFilter: 'blur(1px) saturate(1.1)',
            boxShadow:
              `0 18px 40px rgba(0, 0, 0, 0.10), 0 4px 12px rgba(0, 0, 0, 0.08)`,
            cursor: 'move',
            animation: `appear 10ms linear`,
            animationDelay: `${(allColors.length == 1 ? 2 : allColors.length + 2) * 700}ms`,
            animationFillMode: 'both'
          }} 
        />
      </Draggable>
    </Box>
  );
};

export default StepWatermarble;

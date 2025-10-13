export function debounce(func, timeout) {
  let timer;
  return function(event) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, timeout, event);
  };
}

export function isTouchDevice() {
  return ('ontouchstart' in window)
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function getPageScale() {
  const html = document.querySelectorAll('html')[0];
  const matrix = window.getComputedStyle(html).transform;
  const matrixArray = matrix.replace("matrix(", "").split(",");
  return parseFloat(matrixArray[0]);
}

const BASESIZE = 32;

function setRem() {
  const SCALE = document.documentElement.clientWidth / 1920 ;
  document.documentElement.style.fontSize = (BASESIZE * Math.min(SCALE,2)) + 'px';

}
setRem();
window.onresize = function () {
  setRem()
}

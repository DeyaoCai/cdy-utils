export default function makeExecLater(fn) {
  let time = 0;
  return function () {
    const thisTime = time = `${Date.now()} ${Math.random()}`;
    setTimeout(() => {
      if (thisTime === time) fn.apply(null, arguments);
    }, 340)
  }
}

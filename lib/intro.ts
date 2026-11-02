// The preloader resolves this once the curtain lifts; the hero waits for it.
let done = false;
const waiting: Array<() => void> = [];

export function onIntroDone(fn: () => void) {
  if (done) fn();
  else waiting.push(fn);
}

export function finishIntro() {
  if (done) return;
  done = true;
  waiting.splice(0).forEach((fn) => fn());
}

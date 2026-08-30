let ctx: AudioContext | null = null;

function beep(freq: number, dur = 0.14, type: OscillatorType = "sine") {
  try {
    ctx = ctx ?? new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.12, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + dur);
  } catch {
    /* sound disabled */
  }
}

export const sounds = {
  correct: () => beep(880, 0.16, "sine"),
  wrong: () => beep(220, 0.28, "square"),
  click: () => beep(520, 0.06, "sine"),
  submit: () => {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => beep(f, 0.18, "triangle"), i * 120));
  },
};

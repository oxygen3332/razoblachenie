export const TIMINGS = {
  scene1: { durationInFrames: 493, start: 0 },
  scene2: { durationInFrames: 470, start: 493 },
  scene3: { durationInFrames: 484, start: 493 + 470 },
  scene4: { durationInFrames: 1355, start: 493 + 470 + 484 },
  scene5: { durationInFrames: 402, start: 493 + 470 + 484 + 1355 },
  scene6: { durationInFrames: 405, start: 493 + 470 + 484 + 1355 + 402 },
  totalFrames: 493 + 470 + 484 + 1355 + 402 + 405,
};

export const COLORS = {
  bg: '#08090d',
  cardBg: 'rgba(18, 20, 29, 0.85)',
  cardBorder: 'rgba(255, 255, 255, 0.1)',
  red: '#ff334b',
  redGlow: 'rgba(255, 51, 75, 0.4)',
  green: '#10b981',
  greenGlow: 'rgba(16, 185, 129, 0.4)',
  yellow: '#f59e0b',
  cyan: '#06b6d4',
  purple: '#8b5cf6',
  text: '#ffffff',
  textMuted: '#94a3b8',
};

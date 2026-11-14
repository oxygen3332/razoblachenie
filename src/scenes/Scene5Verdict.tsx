import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS } from '../types';

export const Scene5Verdict: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 12 } });

  const stampScale = spring({
    frame: frame - 25,
    fps,
    config: { damping: 8, mass: 1.4, stiffness: 120 },
  });
  const stampOpacity = interpolate(frame, [25, 35], [0, 1], { extrapolateRight: 'clamp' });

  const listOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' });
  const listY = interpolate(frame, [60, 80], [30, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '0 60px',
        textAlign: 'center',
      }}
    >
      {/* Title */}
      <div
        style={{
          transform: `scale(${titleScale})`,
          fontSize: 32,
          fontWeight: 900,
          color: COLORS.red,
          letterSpacing: '0.2em',
          marginBottom: 20,
        }}
      >
        ИТОГОВЫЙ ВЕРДИКТ
      </div>

      {/* Huge Slamming Stamp */}
      <div
        style={{
          transform: `scale(${Math.max(0, stampScale)}) rotate(-5deg)`,
          opacity: stampOpacity,
          border: '8px solid #ff334b',
          borderRadius: 24,
          padding: '24px 44px',
          background: 'rgba(255, 51, 75, 0.15)',
          boxShadow: '0 0 60px rgba(255, 51, 75, 0.6), inset 0 0 30px rgba(255, 51, 75, 0.3)',
          marginBottom: 44,
        }}
      >
        <div style={{ fontSize: 62, fontWeight: 900, color: '#ff334b', letterSpacing: '0.08em', lineHeight: 1.1 }}>
          100% ПОДМЕНА <br />
          <span style={{ fontSize: 44, color: '#ffffff' }}>И РЕРОУТ МОДЕЛЕЙ</span>
        </div>
      </div>

      {/* Summary Checklist */}
      <div
        style={{
          transform: `translateY(${listY}px)`,
          opacity: listOpacity,
          width: '100%',
          background: 'rgba(18, 20, 29, 0.95)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 24,
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          textAlign: 'left',
          fontSize: 24,
          color: '#e2e8f0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ color: '#ef4444', fontSize: 28, fontWeight: 900 }}>✕</span>
          <span>Thinking и рассуждения <strong>полностью вырезаны</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ color: '#ef4444', fontSize: 28, fontWeight: 900 }}>✕</span>
          <span>Крипто-подписи Anthropic <strong>отсутствуют</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ color: '#ef4444', fontSize: 28, fontWeight: 900 }}>✕</span>
          <span>Имя модели <strong>инжектится через промпт</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ color: '#ef4444', fontSize: 28, fontWeight: 900 }}>✕</span>
          <span>Светится сторонний шлюз <strong>NexoraX</strong></span>
        </div>
      </div>

      {/* Call to action */}
      <div
        style={{
          marginTop: 36,
          fontSize: 26,
          fontWeight: 700,
          color: '#38bdf8',
          letterSpacing: '0.05em',
        }}
      >
        🛡️ Проверяйте чистоту ключей и не кормите скамеров!
      </div>
    </div>
  );
};

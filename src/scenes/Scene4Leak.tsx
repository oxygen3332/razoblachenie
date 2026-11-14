import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS } from '../types';

export const Scene4Leak: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 12 } });

  const leak1X = interpolate(frame, [15, 30], [-40, 0], { extrapolateRight: 'clamp' });
  const leak1Opacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });

  const leak2X = interpolate(frame, [50, 65], [40, 0], { extrapolateRight: 'clamp' });
  const leak2Opacity = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: 'clamp' });

  const leak3Scale = spring({ frame: frame - 100, fps, config: { damping: 12 } });
  const leak3Opacity = interpolate(frame, [100, 115], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '0 60px',
      }}
    >
      <div
        style={{
          transform: `scale(${titleScale})`,
          fontSize: 32,
          fontWeight: 900,
          color: COLORS.purple,
          letterSpacing: '0.15em',
          marginBottom: 16,
        }}
      >
        ФАКТ №3
      </div>
      <div
        style={{
          fontSize: 54,
          fontWeight: 900,
          textAlign: 'center',
          lineHeight: 1.2,
          marginBottom: 36,
        }}
      >
        ПАЛЕВО В ЗАГОЛОВКАХ <br />
        <span style={{ color: COLORS.red }}>И ФЕЙКОВЫЕ ID</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
        {/* Leak Item 1: Nexorax Header */}
        <div
          style={{
            transform: `translateX(${leak1X}px)`,
            opacity: leak1Opacity,
            background: 'rgba(255, 51, 75, 0.1)',
            border: '2px solid rgba(255, 51, 75, 0.5)',
            borderRadius: 20,
            padding: '22px 26px',
          }}
        >
          <div style={{ fontSize: 20, color: '#f87171', fontWeight: 700, marginBottom: 6 }}>
            🚨 УТЕЧКА ШЛЮЗА В HEADERS:
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 22, color: '#ffffff', background: 'rgba(0,0,0,0.4)', padding: '10px 16px', borderRadius: 10 }}>
            access-control-expose-headers: <br />
            <strong style={{ color: '#fb7185' }}>x-nexorax-credits-spent</strong>
          </div>
        </div>

        {/* Leak Item 2: Fake Message ID */}
        <div
          style={{
            transform: `translateX(${leak2X}px)`,
            opacity: leak2Opacity,
            background: 'rgba(14, 165, 233, 0.1)',
            border: '2px solid rgba(14, 165, 233, 0.4)',
            borderRadius: 20,
            padding: '22px 26px',
          }}
        >
          <div style={{ fontSize: 20, color: '#38bdf8', fontWeight: 700, marginBottom: 6 }}>
            🔍 ФЕЙКОВЫЕ ИДЕНТИФИКАТОРЫ (MD5):
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 20, color: '#e2e8f0', lineHeight: 1.5 }}>
            <div>Anthropic: <span style={{ color: '#34d399' }}>msg_013Zva2CM... (Base62)</span></div>
            <div>Cheat-AI: <span style={{ color: '#f87171' }}>msg_f20358fe97... (32-hex)</span></div>
          </div>
        </div>

        {/* Leak Item 3: 404 on Model Catalog */}
        <div
          style={{
            transform: `scale(${Math.max(0, leak3Scale)})`,
            opacity: leak3Opacity,
            background: 'rgba(245, 158, 11, 0.1)',
            border: '2px solid rgba(245, 158, 11, 0.4)',
            borderRadius: 20,
            padding: '22px 26px',
          }}
        >
          <div style={{ fontSize: 20, color: '#fbbf24', fontWeight: 700, marginBottom: 6 }}>
            ⚠️ БИТЫЕ МОДЕЛИ ИЗ СПИСКА:
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 20, color: '#fef08a' }}>
            curl ... /v1/messages -d '{"{"}"model": "fable-5"{"}"}' <br />
            <strong style={{ color: '#ef4444' }}>→ HTTP 404: Not Found</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

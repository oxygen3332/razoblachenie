import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from 'remotion';
import { COLORS } from '../types';

export const Scene5Leak: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 12 } });

  // 0 - 3s (0 - 90 frames): Title
  // 3s - 7s (90 - 210 frames): Leak 1 - Nexorax billing header
  const leak1X = interpolate(frame, [80, 100], [-40, 0], { extrapolateRight: 'clamp' });
  const leak1Opacity = interpolate(frame, [80, 100], [0, 1], { extrapolateRight: 'clamp' });

  // 7s - 10s (210 - 300 frames): Leak 2 - Fake MD5 ID
  const leak2X = interpolate(frame, [200, 220], [40, 0], { extrapolateRight: 'clamp' });
  const leak2Opacity = interpolate(frame, [200, 220], [0, 1], { extrapolateRight: 'clamp' });

  // 10s - 13.4s (300 - 402 frames): Leak 3 - 404 Error on Fable 5
  const leak3Scale = spring({ frame: frame - 290, fps, config: { damping: 12 } });
  const leak3Opacity = interpolate(frame, [290, 305], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: '0 40px',
        boxSizing: 'border-box',
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
        <span style={{ color: COLORS.red }}>И БИТЫЙ КАТАЛОГ</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
        {/* Leak 1: Nexorax billing header */}
        {frame >= 70 && (
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <Img
                src={staticFile('images/nexorax_logo.jpg')}
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  border: '2px solid rgba(255, 51, 75, 0.6)',
                  boxShadow: '0 0 16px rgba(255, 51, 75, 0.4)',
                }}
              />
              <div>
                <div style={{ fontSize: 20, color: '#f87171', fontWeight: 800 }}>
                  🚨 УТЕЧКА ШЛЮЗА В HEADERS:
                </div>
                <div style={{ fontSize: 16, color: '#94a3b8' }}>
                  NexoraX Bot Gateway
                </div>
              </div>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 22, color: '#ffffff', background: 'rgba(0,0,0,0.4)', padding: '10px 16px', borderRadius: 10 }}>
              access-control-expose-headers: <br />
              <strong style={{ color: '#fb7185' }}>x-nexorax-credits-spent</strong>
            </div>
          </div>
        )}

        {/* Leak 2: Fake Message ID */}
        {frame >= 190 && (
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
        )}

        {/* Leak 3: 404 Error on Fable 5 */}
        {frame >= 280 && (
          <div
            style={{
              transform: `scale(${Math.max(0, leak3Scale)})`,
              opacity: leak3Opacity,
              background: 'rgba(245, 158, 11, 0.1)',
              border: '2px solid rgba(245, 158, 11, 0.45)',
              borderRadius: 20,
              padding: '22px 26px',
            }}
          >
            <div style={{ fontSize: 20, color: '#fbbf24', fontWeight: 700, marginBottom: 6 }}>
              ⚠️ МОДЕЛИ ПАДАЮТ С ОШИБКОЙ 404:
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 20, color: '#fef08a' }}>
              curl ... -d '{"{"}"model": "fable-5"{"}"}' <br />
              <strong style={{ color: '#ef4444' }}>→ HTTP 404: Model Not Found</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

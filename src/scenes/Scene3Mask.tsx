import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS } from '../types';

export const Scene3Mask: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth fadeout into scene 4
  const sceneFade = interpolate(frame, [465, 484], [1, 0], { extrapolateRight: 'clamp' });
  const titleScale = spring({ frame, fps, config: { damping: 12 } });

  // Terminal entrance
  const terminalScale = spring({ frame: frame - 15, fps, config: { damping: 14 } });

  // Step 1: Opus 5.5 (frame 85 - 230)
  const step1Opacity = interpolate(frame, [85, 105], [0, 1], { extrapolateRight: 'clamp' });
  const step1Y = interpolate(frame, [85, 105], [20, 0], { extrapolateRight: 'clamp' });

  // Step 2: Sonnet (frame 230 - 370)
  const step2Opacity = interpolate(frame, [230, 250], [0, 1], { extrapolateRight: 'clamp' });
  const step2Y = interpolate(frame, [230, 250], [20, 0], { extrapolateRight: 'clamp' });

  // Step 3: Bottom Alert Stamp (frame 370 - 484)
  const alertScale = spring({ frame: frame - 370, fps, config: { damping: 10, mass: 1.1 } });
  const alertOpacity = interpolate(frame, [370, 385], [0, 1], { extrapolateRight: 'clamp' });

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
        textAlign: 'center',
        opacity: sceneFade,
      }}
    >
      {/* Header */}
      <div
        style={{
          transform: `scale(${titleScale})`,
          fontSize: 32,
          fontWeight: 900,
          color: COLORS.yellow,
          letterSpacing: '0.15em',
          marginBottom: 16,
        }}
      >
        ФАКТ №2
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
        МАСКАРАД И ПЕРЕОБУВАНИЕ <br />
        <span style={{ color: COLORS.red }}>ПО ОДНОМУ КЛИКУ</span>
      </div>

      {/* Terminal / Live Test Demonstration */}
      <div
        style={{
          transform: `scale(${Math.max(0, terminalScale)})`,
          width: '100%',
          background: 'rgba(15, 17, 26, 0.95)',
          border: '2px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
          boxSizing: 'border-box',
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '14px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#27c93f' }} />
          <span style={{ fontSize: 18, color: '#94a3b8', marginLeft: 10, fontFamily: 'monospace' }}>
            api.cheat-ai.shop // live-test
          </span>
        </div>

        {/* Terminal Body */}
        <div style={{ padding: '24px', fontFamily: 'monospace', fontSize: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Step 1: Opus 5.5 */}
          <div style={{ opacity: step1Opacity, transform: `translateY(${step1Y}px)` }}>
            <div style={{ color: '#38bdf8', textAlign: 'left' }}>&gt; curl -d '{"{"}"model": "claude-opus-5.5"{"}"}'</div>
            <div style={{ color: '#ffffff', marginTop: 6, padding: '10px 16px', background: 'rgba(245, 158, 11, 0.12)', borderLeft: '4px solid #f59e0b', borderRadius: 8, textAlign: 'left' }}>
              «I’m <strong style={{ color: '#f59e0b' }}>Claude Opus 5.5</strong>, an AI assistant.»
            </div>
          </div>

          {/* Step 2: Sonnet & Haiku */}
          {frame >= 225 && (
            <div style={{ opacity: step2Opacity, transform: `translateY(${step2Y}px)` }}>
              <div style={{ color: '#38bdf8', textAlign: 'left' }}>&gt; curl -d '{"{"}"model": "claude-3-5-sonnet"{"}"}'</div>
              <div style={{ color: '#ffffff', marginTop: 6, padding: '10px 16px', background: 'rgba(56, 189, 248, 0.12)', borderLeft: '4px solid #38bdf8', borderRadius: 8, textAlign: 'left' }}>
                «I’m <strong style={{ color: '#38bdf8' }}>Claude Sonnet</strong>, an AI assistant.»
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Explainer / Reality Check */}
      {frame >= 365 && (
        <div
          style={{
            transform: `scale(${Math.max(0, alertScale)})`,
            opacity: alertOpacity,
            marginTop: 28,
            width: '100%',
            padding: '18px 24px',
            background: 'rgba(255, 51, 75, 0.12)',
            border: '2px solid rgba(255, 51, 75, 0.45)',
            borderRadius: 20,
            fontSize: 24,
            textAlign: 'center',
            color: '#fecaca',
            lineHeight: 1.4,
            boxShadow: '0 0 35px rgba(255, 51, 75, 0.25)',
            boxSizing: 'border-box',
          }}
        >
          🎭 <strong>ПОД КАПОТОМ ОДНА И ТА ЖЕ СЕТКА!</strong> <br />
          Провайдер просто подсовывает в промпт: <em>«Ты — {`{model_name}`}»</em>!
        </div>
      )}
    </div>
  );
};

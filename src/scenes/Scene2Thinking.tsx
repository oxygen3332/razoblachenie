import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS } from '../types';

export const Scene2Thinking: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene Entrance & Fadeout (no hanging/lag)
  const sceneFade = interpolate(frame, [450, 470], [1, 0], { extrapolateRight: 'clamp' });
  const titleScale = spring({ frame, fps, config: { damping: 12 } });

  // Card 1: Real Opus (Voice starts at ~1.8s = frame 54)
  const realCardOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateRight: 'clamp' });
  const realCardY = interpolate(frame, [45, 65], [30, 0], { extrapolateRight: 'clamp' });

  // Card 2: Cheat-AI Stripped Thinking (Voice says "Но cheat-ai просто вырезает блок thinking" at 8.3s = frame 250)
  const fakeCardIn = frame >= 245;
  const fakeCardScale = spring({ frame: frame - 245, fps, config: { damping: 12, mass: 1.1 } });
  const fakeCardOpacity = interpolate(frame, [245, 260], [0, 1], { extrapolateRight: 'clamp' });

  // Warning Banner (Voice says "Никаких рассуждений там нет..." at 11.8s = frame 355)
  const alertScale = spring({ frame: frame - 355, fps, config: { damping: 12 } });
  const alertOpacity = interpolate(frame, [355, 370], [0, 1], { extrapolateRight: 'clamp' });

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
      {/* Scene Header */}
      <div
        style={{
          transform: `scale(${titleScale})`,
          fontSize: 32,
          fontWeight: 900,
          color: COLORS.cyan,
          letterSpacing: '0.15em',
          marginBottom: 16,
        }}
      >
        ФАКТ №1
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
        ГДЕ МЫШЛЕНИЕ <br />
        <span style={{ color: COLORS.red }}>И ПОДПИСЬ КЛОДА?</span>
      </div>

      {/* Comparison Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          width: '100%',
          alignItems: 'center',
        }}
      >
        {/* Real Opus 5.5 Card */}
        <div
          style={{
            width: '100%',
            opacity: realCardOpacity,
            transform: `translateY(${realCardY}px)`,
            background: 'rgba(16, 185, 129, 0.08)',
            border: '2px solid rgba(16, 185, 129, 0.5)',
            borderRadius: 24,
            padding: '24px 28px',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.15)',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#10b981' }}>
              ✓ НАСТОЯЩИЙ OPUS 5.5
            </span>
            <span style={{ fontSize: 18, background: '#10b981', color: '#000', padding: '4px 14px', borderRadius: 8, fontWeight: 900 }}>
              ANTHROPIC API
            </span>
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 21,
              background: 'rgba(0, 0, 0, 0.65)',
              padding: '16px 20px',
              borderRadius: 14,
              color: '#a7f3d0',
              lineHeight: 1.5,
              textAlign: 'left',
            }}
          >
            <div>"type": <span style={{ color: '#38bdf8' }}>"thinking"</span>,</div>
            <div>"thinking": "Step 1: deep architecture analysis...",</div>
            <div style={{ color: '#34d399', fontWeight: 900 }}>"signature": "EiYKAw..." // КРИПТО-ПОДПИСЬ</div>
          </div>
        </div>

        {/* Cheat-AI / Nexorax Card - Drops in under voice at frame 245 */}
        <div
          style={{
            width: '100%',
            opacity: fakeCardIn ? fakeCardOpacity : 0,
            transform: `scale(${fakeCardIn ? Math.max(0, fakeCardScale) : 0})`,
            display: fakeCardIn ? 'block' : 'none',
            background: 'rgba(255, 51, 75, 0.1)',
            border: '3px solid rgba(255, 51, 75, 0.65)',
            borderRadius: 24,
            padding: '24px 28px',
            boxShadow: '0 10px 40px rgba(255, 51, 75, 0.35)',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#ff334b' }}>
              ✗ CHEAT-AI.SHOP
            </span>
            <span style={{ fontSize: 18, background: '#ff334b', color: '#fff', padding: '4px 14px', borderRadius: 8, fontWeight: 900 }}>
              БЛОК ВЫРЕЗАН ❌
            </span>
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 21,
              background: 'rgba(0, 0, 0, 0.65)',
              padding: '16px 20px',
              borderRadius: 14,
              color: '#fca5a5',
              lineHeight: 1.5,
              textAlign: 'left',
            }}
          >
            <div style={{ textDecoration: 'line-through', opacity: 0.55 }}>"thinking": NULL</div>
            <div style={{ color: '#ff334b', fontWeight: 900 }}>"signature": ОТСУТСТВУЕТ ❌</div>
            <div style={{ color: '#94a3b8' }}>"content": [ Голый дешёвый текст ]</div>
          </div>
        </div>
      </div>

      {/* Bottom Explainer Note - Appears at frame 355 */}
      {frame >= 350 && (
        <div
          style={{
            transform: `scale(${Math.max(0, alertScale)})`,
            opacity: alertOpacity,
            marginTop: 28,
            width: '100%',
            fontSize: 24,
            color: '#fef08a',
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.4,
            padding: '16px 24px',
            background: 'rgba(245, 158, 11, 0.12)',
            borderRadius: 18,
            border: '2px solid rgba(245, 158, 11, 0.45)',
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.25)',
            boxSizing: 'border-box',
          }}
        >
          ⚠️ <strong>Никаких рассуждений нет:</strong> мышление вырезали и отдают копеечный ответ!
        </div>
      )}
    </div>
  );
};

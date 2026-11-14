import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from 'remotion';
import { COLORS } from '../types';

export const Scene6Verdict: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Verdict animations (0 - 350)
  const isJumpscare = frame >= 350;
  const jumpscareFrame = frame - 350;

  // Kinetic subtitles & card animations under ElevenLabs voice
  // 0 - 25 frames: "Итог."
  const titleScale = spring({ frame, fps, config: { damping: 12 } });

  // 35 - 195 frames: "Под видом топового флагмана вам скармливают дешёвую мини-модельку..."
  const card1Scale = spring({ frame: frame - 35, fps, config: { damping: 12 } });
  const card1Opacity = interpolate(frame, [35, 48], [0, 1], { extrapolateRight: 'clamp' });

  // 200 - 270 frames: "Не ведитесь на развод cheat-ai shop..."
  const card2Scale = spring({ frame: frame - 200, fps, config: { damping: 12 } });
  const card2Opacity = interpolate(frame, [200, 215], [0, 1], { extrapolateRight: 'clamp' });

  // 270 - 350 frames: "...и всегда проверяйте чистоту ключей!"
  const card3Scale = spring({ frame: frame - 270, fps, config: { damping: 12 } });
  const card3Opacity = interpolate(frame, [270, 285], [0, 1], { extrapolateRight: 'clamp' });

  // Jumpscare parameters (frame >= 350)
  const shakeX = Math.sin(jumpscareFrame * 14.5) * (jumpscareFrame < 25 ? 32 : 12);
  const shakeY = Math.cos(jumpscareFrame * 18.2) * (jumpscareFrame < 25 ? 26 : 8);
  const jumpScale = interpolate(jumpscareFrame, [0, 4, 15, 55], [0.85, 1.3, 1.15, 1.2], {
    extrapolateRight: 'clamp',
  });
  const flashRed = jumpscareFrame % 3 === 0;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* ============================================================== */}
      {/* VERDICT WITH KINETIC SUBTITLES & CARDS (0 - 350 frames)        */}
      {/* ============================================================== */}
      {!isJumpscare && (
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
          }}
        >
          {/* Title */}
          <div
            style={{
              transform: `scale(${titleScale})`,
              fontSize: 34,
              fontWeight: 900,
              color: COLORS.red,
              letterSpacing: '0.2em',
              marginBottom: 16,
            }}
          >
            ИТОГОВЫЙ ВЕРДИКТ
          </div>

          <div
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: 36,
            }}
          >
            ИТОГ РАССЛЕДОВАНИЯ
          </div>

          {/* Sequential Cards matching voice */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              width: '100%',
              alignItems: 'center',
            }}
          >
            {/* Card 1: Под видом топового флагмана (frame >= 35) */}
            {frame >= 35 && (
              <div
                style={{
                  transform: `scale(${Math.max(0, card1Scale)})`,
                  opacity: card1Opacity,
                  width: '100%',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '2px solid rgba(239, 68, 68, 0.55)',
                  borderRadius: 22,
                  padding: '24px 28px',
                  boxShadow: '0 10px 30px rgba(239, 68, 68, 0.2)',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: 20, color: '#f87171', fontWeight: 800, marginBottom: 6 }}>
                  🏷️ ОБМАН ОЖИДАНИЙ:
                </div>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#ffffff', lineHeight: 1.3 }}>
                  Под видом топового флагмана — <span style={{ color: '#ef4444' }}>дешёвая мини-моделька</span> с надетым бейджиком.
                </div>
              </div>
            )}

            {/* Card 2: Не ведитесь на развод cheat-ai (frame >= 200) */}
            {frame >= 200 && (
              <div
                style={{
                  transform: `scale(${Math.max(0, card2Scale)})`,
                  opacity: card2Opacity,
                  width: '100%',
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '2px solid rgba(245, 158, 11, 0.55)',
                  borderRadius: 22,
                  padding: '24px 28px',
                  boxShadow: '0 10px 30px rgba(245, 158, 11, 0.2)',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: 20, color: '#fbbf24', fontWeight: 800, marginBottom: 6 }}>
                  ⚠️ БУДЬТЕ БДИТЕЛЬНЫ:
                </div>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#ffffff', lineHeight: 1.3 }}>
                  Не ведитесь на развод <strong style={{ color: '#fbbf24' }}>cheat-ai.shop</strong> и сторонних прокси!
                </div>
              </div>
            )}

            {/* Card 3: Всегда проверяйте чистоту ключей (frame >= 270) */}
            {frame >= 270 && (
              <div
                style={{
                  transform: `scale(${Math.max(0, card3Scale)})`,
                  opacity: card3Opacity,
                  width: '100%',
                  background: 'rgba(56, 189, 248, 0.14)',
                  border: '2px solid rgba(56, 189, 248, 0.6)',
                  borderRadius: 22,
                  padding: '24px 28px',
                  boxShadow: '0 10px 30px rgba(56, 189, 248, 0.25)',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: 20, color: '#38bdf8', fontWeight: 800, marginBottom: 6 }}>
                  🛡️ ГЛАВНЫЙ СОВЕТ:
                </div>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#ffffff', lineHeight: 1.3 }}>
                  Всегда проверяйте <strong style={{ color: '#38bdf8' }}>чистоту ключей и крипто-подписи</strong>!
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* HORROR JUMPSCARE (frame >= 350)                                */}
      {/* ============================================================== */}
      {isJumpscare && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: flashRed ? '#200000' : '#000000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translate(${shakeX}px, ${shakeY}px) scale(${jumpScale})`,
            zIndex: 9999,
          }}
        >
          {/* Blood-red vignette overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              boxShadow: 'inset 0 0 140px rgba(255, 0, 0, 0.95), inset 0 0 40px rgba(255, 255, 255, 0.4)',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />

          {/* Glitch CRT lines */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 2px, transparent 2px, transparent 6px)',
              pointerEvents: 'none',
              zIndex: 11,
            }}
          />

          {/* Cursed Chica Meme Image */}
          <Img
            src={staticFile('images/secret_deepseek.png')}
            style={{
              width: '95%',
              maxWidth: 980,
              borderRadius: 20,
              border: flashRed ? '6px solid #ff0000' : '6px solid #ffffff',
              boxShadow: '0 0 80px rgba(255, 0, 0, 0.95)',
              filter: flashRed ? 'contrast(160%) saturate(140%)' : 'contrast(130%)',
            }}
          />

          {/* Creepy Warning Text */}
          <div
            style={{
              marginTop: 40,
              fontFamily: 'monospace',
              fontSize: 32,
              fontWeight: 900,
              color: flashRed ? '#ff0033' : '#ffffff',
              letterSpacing: '0.1em',
              textShadow: '0 0 30px rgba(255, 0, 0, 1)',
              textAlign: 'center',
              padding: '0 30px',
            }}
          >
            ⚠️ СЕКРЕТНЫЙ DEEPSEEK НАЙДЕН ⚠️
          </div>
        </div>
      )}
    </div>
  );
};

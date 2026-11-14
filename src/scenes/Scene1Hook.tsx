import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from 'remotion';
import { COLORS } from '../types';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // -------------------------------------------------------------------------
  // Phase 1: Fake Ad (0 - 155 frames) - Progressive reveal matching speech
  // -------------------------------------------------------------------------
  const adFadeOut = interpolate(frame, [145, 155], [1, 0], { extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame, fps, config: { damping: 12 } });
  const titleScale = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const priceCardScale = spring({ frame: frame - 55, fps, config: { damping: 12 } });
  const priceAmountScale = spring({ frame: frame - 85, fps, config: { damping: 10, mass: 1.1 } });
  const priceTokensScale = spring({ frame: frame - 115, fps, config: { damping: 12 } });

  // -------------------------------------------------------------------------
  // Phase 2: Mammoths / Reality check (155 - 330 frames) - Progressive reveal
  // Frame 155: "Мда."
  // Frame 180: "Это вы слышите каждый день..."
  // Frame 260 (0:09 - 0:10): "...и именно так наёбывают мамонтов."
  // -------------------------------------------------------------------------
  const realityFadeOut = interpolate(frame, [315, 330], [1, 0], { extrapolateRight: 'clamp' });
  const mdaScale = spring({ frame: frame - 155, fps, config: { damping: 12 } });
  const everydayScale = spring({ frame: frame - 180, fps, config: { damping: 12 } });
  const mammothStampScale = spring({ frame: frame - 260, fps, config: { damping: 10, mass: 1.2 } });

  // -------------------------------------------------------------------------
  // Phase 3: The Target - cheat-ai.shop (330 - 493 frames) - Progressive reveal
  // Frame 335: "Сегодня мы вскроем сервис..."
  // Frame 365: cheat-ai.shop + NexoraX Bot card
  // -------------------------------------------------------------------------
  const targetTitleScale = spring({ frame: frame - 335, fps, config: { damping: 12 } });
  const targetCardScale = spring({ frame: frame - 365, fps, config: { damping: 12 } });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      {/* ============================================================== */}
      {/* PHASE 1: FAKE TELEGRAM / PROMO AD (0 - 155 frames)              */}
      {/* ============================================================== */}
      {frame < 155 && (
        <div
          style={{
            opacity: adFadeOut,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: 960,
          }}
        >
          {/* Flashy Badge */}
          <div
            style={{
              transform: `scale(${Math.max(0, badgeScale)})`,
              padding: '12px 32px',
              borderRadius: 999,
              background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
              color: '#000000',
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: '0.15em',
              marginBottom: 30,
              boxShadow: '0 0 35px rgba(245, 158, 11, 0.6)',
            }}
          >
            🔥 МЕГА ХАЛЯВА -99%
          </div>

          {/* Title: Claude Opus & Fable 5 */}
          {frame >= 15 && (
            <div
              style={{
                transform: `scale(${Math.max(0, titleScale)})`,
                fontSize: 68,
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: 36,
                color: '#ffffff',
              }}
            >
              CLAUDE OPUS <br />
              <span style={{ color: '#38bdf8' }}>& FABLE 5</span>
            </div>
          )}

          {/* Price Card Container */}
          {frame >= 55 && (
            <div
              style={{
                transform: `scale(${Math.max(0, priceCardScale)})`,
                width: '100%',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '3px solid #f59e0b',
                borderRadius: 32,
                padding: '36px',
                boxShadow: '0 0 50px rgba(245, 158, 11, 0.3)',
              }}
            >
              <div style={{ fontSize: 32, color: '#fef08a', marginBottom: 10, fontWeight: 700 }}>
                СВЕРХДЕШЁВЫЕ ЦЕНЫ:
              </div>

              {/* 3 РУБЛЯ (under speech "всего 3 рубля") */}
              {frame >= 85 && (
                <div
                  style={{
                    transform: `scale(${Math.max(0, priceAmountScale)})`,
                    fontSize: 82,
                    fontWeight: 900,
                    color: '#22c55e',
                    letterSpacing: '0.02em',
                    textShadow: '0 0 35px rgba(34, 197, 94, 0.7)',
                  }}
                >
                  3 РУБЛЯ
                </div>
              )}

              {/* за 1 000 000 токенов (under speech "за миллион токенов!") */}
              {frame >= 115 && (
                <div
                  style={{
                    transform: `scale(${Math.max(0, priceTokensScale)})`,
                    fontSize: 30,
                    color: '#e2e8f0',
                    marginTop: 8,
                    fontWeight: 700,
                  }}
                >
                  за 1 000 000 токенов! 🤑
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* PHASE 2: REALITY CHECK / "НАЁБЫВАЮТ МАМОНТОВ" (155 - 330 frames)*/}
      {/* ============================================================== */}
      {frame >= 155 && frame < 330 && (
        <div
          style={{
            opacity: realityFadeOut,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: 960,
          }}
        >
          {/* Frame 155: "Мда." */}
          <div
            style={{
              transform: `scale(${Math.max(0, mdaScale)})`,
              fontSize: 110,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '0.05em',
              marginBottom: 20,
              textShadow: '0 0 40px rgba(255, 255, 255, 0.4)',
            }}
          >
            МДА... 🦣
          </div>

          {/* Frame 180: "Это вы слышите каждый день..." */}
          {frame >= 180 && (
            <div
              style={{
                transform: `scale(${Math.max(0, everydayScale)})`,
                fontSize: 48,
                fontWeight: 800,
                lineHeight: 1.3,
                color: '#94a3b8',
                marginBottom: 40,
              }}
            >
              Это вы слышите каждый день...
            </div>
          )}

          {/* Frame 260 (0:09-0:10): "...и именно так наёбывают мамонтов." */}
          {frame >= 260 && (
            <div
              style={{
                transform: `scale(${Math.max(0, mammothStampScale)}) rotate(-3deg)`,
                border: '6px solid #ff334b',
                borderRadius: 28,
                padding: '24px 40px',
                color: '#ff334b',
                fontSize: 48,
                fontWeight: 900,
                letterSpacing: '0.08em',
                background: 'rgba(255, 51, 75, 0.18)',
                boxShadow: '0 0 70px rgba(255, 51, 75, 0.7)',
              }}
            >
              И ИМЕННО ТАК <br />
              НАЁБЫВАЮТ МАМОНТОВ
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* PHASE 3: THE REVEAL - CHEAT-AI.SHOP (330 - 493 frames)         */}
      {/* ============================================================== */}
      {frame >= 330 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: 960,
          }}
        >
          {/* Header */}
          <div
            style={{
              transform: `scale(${Math.max(0, targetTitleScale)})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                padding: '12px 30px',
                borderRadius: 999,
                background: 'rgba(255, 51, 75, 0.15)',
                border: '2px solid #ff334b',
                color: '#ff334b',
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: '0.15em',
                marginBottom: 26,
                boxShadow: '0 0 30px rgba(255, 51, 75, 0.4)',
              }}
            >
              🎯 ЦЕЛЬ РАССЛЕДОВАНИЯ
            </div>

            <div
              style={{
                fontSize: 62,
                fontWeight: 900,
                color: '#ffffff',
                marginBottom: 36,
                lineHeight: 1.2,
              }}
            >
              СЕГОДНЯ МЫ ВСКРОЕМ
            </div>
          </div>

          {/* Target Card with NexoraX logo (appears under speech at frame 365) */}
          {frame >= 365 && (
            <div
              style={{
                transform: `scale(${Math.max(0, targetCardScale)})`,
                width: '100%',
                background: 'rgba(18, 20, 29, 0.95)',
                border: '3px solid rgba(56, 189, 248, 0.6)',
                borderRadius: 32,
                padding: '40px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.25)',
              }}
            >
              {/* NexoraX Bot Avatar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 18,
                  marginBottom: 24,
                  padding: '12px 20px',
                  borderRadius: 20,
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Img
                  src={staticFile('images/nexorax_logo.jpg')}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 18,
                    border: '2px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 0 25px rgba(255, 255, 255, 0.2)',
                  }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#ffffff' }}>NexoraX Bot</div>
                  <div style={{ fontSize: 18, color: '#94a3b8' }}>@nexorax_bot // cheat-ai</div>
                </div>
              </div>

              <div
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  color: '#38bdf8',
                  letterSpacing: '0.04em',
                  marginBottom: 16,
                }}
              >
                cheat-ai.shop
              </div>
              <div
                style={{
                  display: 'inline-block',
                  padding: '10px 24px',
                  borderRadius: 14,
                  background: 'rgba(255, 255, 255, 0.08)',
                  fontSize: 26,
                  color: '#e2e8f0',
                }}
              >
                он же <strong style={{ color: '#f43f5e' }}>NexoraX</strong>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from 'remotion';
import { COLORS } from '../types';

export const Scene4Analogy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade transitions
  const p1Fade = interpolate(frame, [305, 320], [1, 0], { extrapolateRight: 'clamp' });
  const p2Fade = interpolate(frame, [700, 715], [1, 0], { extrapolateRight: 'clamp' });
  const p3Fade = interpolate(frame, [1160, 1175], [1, 0], { extrapolateRight: 'clamp' });

  // -------------------------------------------------------------------------
  // Phase 1: Kinetic Subtitles (0 - 320 frames)
  // -------------------------------------------------------------------------
  const p1TitleScale = spring({ frame, fps, config: { damping: 12 } });
  const sub2In = interpolate(frame, [75, 90], [0, 1], { extrapolateRight: 'clamp' });
  const sub3In = interpolate(frame, [160, 175], [0, 1], { extrapolateRight: 'clamp' });
  const sub4In = interpolate(frame, [240, 255], [0, 1], { extrapolateRight: 'clamp' });

  // -------------------------------------------------------------------------
  // Phase 2: At 00:59 (frame 320) "А у cheat-ai?" -> "У них нет опуса" -> Models 1-by-1
  // -------------------------------------------------------------------------
  // Frame 320 (10.6s): Question card with NexoraX logo pops in
  const nexoraxLogoScale = spring({ frame: frame - 320, fps, config: { damping: 12 } });
  
  // Frame 330 (11.0s): "У них вообще нет Опуса!" badge slams in
  const noOpusScale = spring({ frame: frame - 330, fps, config: { damping: 10, mass: 1.1 } });
  
  // Models appearing strictly ONE BY ONE under speech:
  // Frame 462 (15.4s): Opus 5.5
  const m1In = spring({ frame: frame - 462, fps, config: { damping: 12 } });
  // Frame 510 (17.0s): Sonnet 4.6
  const m2In = spring({ frame: frame - 510, fps, config: { damping: 12 } });
  // Frame 558 (18.6s): Opus 4.8
  const m3In = spring({ frame: frame - 558, fps, config: { damping: 12 } });

  // Frame 627 (20.9s): "Одна и та же дешёвая сетка" pops in
  const cheapNetScale = spring({ frame: frame - 627, fps, config: { damping: 10, mass: 1.2 } });

  // -------------------------------------------------------------------------
  // Phase 3: At 1:12 (frame 715) Sequential items
  // -------------------------------------------------------------------------
  const p3TitleScale = spring({ frame: frame - 715, fps, config: { damping: 12 } });
  // Item 1: 10 files (frame 950 / 31.7s)
  const item1Scale = spring({ frame: frame - 950, fps, config: { damping: 12 } });
  // Item 2: Logic fail (frame 1015 / 33.8s)
  const item2Scale = spring({ frame: frame - 1015, fps, config: { damping: 12 } });
  // Item 3: Billed as flagship (frame 1085 / 36.2s)
  const item3Scale = spring({ frame: frame - 1085, fps, config: { damping: 12 } });

  // -------------------------------------------------------------------------
  // Phase 4: Beaten-up Zhiguli + Ferrari badge + Duct tape (1175 - 1355)
  // -------------------------------------------------------------------------
  const carTitleScale = spring({ frame: frame - 1175, fps, config: { damping: 12 } });
  const carScale = spring({ frame: frame - 1195, fps, config: { damping: 12 } });
  const badgeDrop = spring({ frame: frame - 1235, fps, config: { damping: 8, mass: 1.3 } });
  const tape1Scale = spring({ frame: frame - 1260, fps, config: { damping: 10 } });
  const tape2Scale = spring({ frame: frame - 1275, fps, config: { damping: 10 } });
  const carStampScale = spring({ frame: frame - 1295, fps, config: { damping: 10, mass: 1.2 } });

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
      }}
    >
      {/* ============================================================== */}
      {/* PHASE 1: SUBTITLES / В ЧЁМ НАЁБ (0 - 320 frames)               */}
      {/* ============================================================== */}
      {frame < 325 && (
        <div
          style={{
            opacity: p1Fade,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              transform: `scale(${p1TitleScale})`,
              padding: '12px 32px',
              borderRadius: 999,
              background: 'rgba(56, 189, 248, 0.15)',
              border: '2px solid #38bdf8',
              color: '#38bdf8',
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: '0.15em',
              marginBottom: 26,
            }}
          >
            🤔 ВЫ МОЖЕТЕ СПРОСИТЬ:
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: 36,
              textShadow: '0 0 40px rgba(255, 51, 75, 0.5)',
            }}
          >
            А В ЧЁМ НАЁБ?
          </div>

          {/* Kinetic Subtitle Box */}
          <div
            style={{
              width: '100%',
              background: 'rgba(18, 20, 29, 0.95)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 28,
              padding: '36px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              alignItems: 'center',
            }}
          >
            {/* Phrase 1 */}
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: frame >= 75 ? '#f59e0b' : '#64748b',
                opacity: sub2In,
              }}
            >
              «В каталоге заявляют <strong style={{ color: '#fbbf24' }}>только Opus и Fable</strong>...»
            </div>

            {/* Phrase 2 */}
            {frame >= 155 && (
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: frame >= 160 ? '#38bdf8' : '#64748b',
                  opacity: sub3In,
                }}
              >
                «...вы покупаете доступ только к ним...»
              </div>
            )}

            {/* Phrase 3 */}
            {frame >= 235 && (
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  color: '#ef4444',
                  opacity: sub4In,
                  textShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
                }}
              >
                «А про реальные модели — ТИШИНА! 🤫»
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* PHASE 2: "А У CHEAT-AI?" -> MODELS APPEAR 1-BY-1 (320 - 715)  */}
      {/* ============================================================== */}
      {frame >= 320 && frame < 720 && (
        <div
          style={{
            opacity: p2Fade,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Logo + Question Banner (00:59 speech) */}
          <div
            style={{
              transform: `scale(${Math.max(0, nexoraxLogoScale)})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              padding: '12px 28px',
              borderRadius: 20,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              marginBottom: 24,
            }}
          >
            <Img
              src={staticFile('images/nexorax_logo.jpg')}
              style={{
                width: 58,
                height: 58,
                borderRadius: 14,
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 22, color: '#94a3b8', fontWeight: 600 }}>ВОПРОС:</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#ffffff' }}>А что у cheat-ai? 🤔</div>
            </div>
          </div>

          {/* "У НИХ НЕТ ОПУСА" Badge */}
          {frame >= 330 && (
            <div
              style={{
                transform: `scale(${Math.max(0, noOpusScale)})`,
                border: '4px solid #ef4444',
                borderRadius: 22,
                padding: '16px 36px',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
                fontSize: 34,
                fontWeight: 900,
                letterSpacing: '0.05em',
                marginBottom: 26,
                boxShadow: '0 0 40px rgba(239, 68, 68, 0.4)',
              }}
            >
              У НИХ ВООБЩЕ НЕТ ОПУСА ❌
            </div>
          )}

          {/* Model pills appearing ONE BY ONE under speech (NO ARROWS!) */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              alignItems: 'center',
            }}
          >
            {/* Model 1: claude-opus-5.5 (frame >= 462) */}
            {frame >= 462 && (
              <div
                style={{
                  transform: `scale(${Math.max(0, m1In)})`,
                  width: '90%',
                  padding: '16px 20px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '2px solid rgba(245, 158, 11, 0.6)',
                  borderRadius: 16,
                  color: '#fbbf24',
                  fontSize: 24,
                  fontWeight: 800,
                  fontFamily: 'monospace',
                  boxShadow: '0 0 25px rgba(245, 158, 11, 0.25)',
                }}
              >
                1. claude-opus-5.5
              </div>
            )}

            {/* Model 2: claude-sonnet-4.6 (frame >= 510) */}
            {frame >= 510 && (
              <div
                style={{
                  transform: `scale(${Math.max(0, m2In)})`,
                  width: '90%',
                  padding: '16px 20px',
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '2px solid rgba(56, 189, 248, 0.6)',
                  borderRadius: 16,
                  color: '#38bdf8',
                  fontSize: 24,
                  fontWeight: 800,
                  fontFamily: 'monospace',
                  boxShadow: '0 0 25px rgba(56, 189, 248, 0.25)',
                }}
              >
                2. claude-sonnet-4.6
              </div>
            )}

            {/* Model 3: claude-opus-4.8 (frame >= 558) */}
            {frame >= 558 && (
              <div
                style={{
                  transform: `scale(${Math.max(0, m3In)})`,
                  width: '90%',
                  padding: '16px 20px',
                  background: 'rgba(168, 85, 247, 0.15)',
                  border: '2px solid rgba(168, 85, 247, 0.6)',
                  borderRadius: 16,
                  color: '#c084fc',
                  fontSize: 24,
                  fontWeight: 800,
                  fontFamily: 'monospace',
                  boxShadow: '0 0 25px rgba(168, 85, 247, 0.25)',
                }}
              >
                3. claude-opus-4.8
              </div>
            )}

            {/* "ОДНА И ТА ЖЕ ДЕШЁВАЯ СЕТКА" - Drops in at frame 627 */}
            {frame >= 627 && (
              <div
                style={{
                  transform: `scale(${Math.max(0, cheapNetScale)})`,
                  marginTop: 14,
                  width: '95%',
                  padding: '20px 24px',
                  background: 'rgba(239, 68, 68, 0.25)',
                  border: '3px solid #ef4444',
                  borderRadius: 20,
                  color: '#ffffff',
                  fontSize: 26,
                  fontWeight: 900,
                  boxShadow: '0 0 35px rgba(239, 68, 68, 0.45)',
                }}
              >
                ⚡️ ОДНА И ТА ЖЕ ДЕШЁВАЯ СЕТКА!
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* PHASE 3: 1:12 SEQUENTIAL ITEMS (715 - 1175 frames)            */}
      {/* ============================================================== */}
      {frame >= 715 && frame < 1175 && (
        <div
          style={{
            opacity: p3Fade,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Prompt injection pill */}
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 22,
              color: '#38bdf8',
              background: 'rgba(0,0,0,0.7)',
              border: '2px solid rgba(56, 189, 248, 0.4)',
              borderRadius: 18,
              padding: '14px 24px',
              marginBottom: 28,
            }}
          >
            system: "Ты — claude-opus-5.5"
          </div>

          <div
            style={{
              transform: `scale(${p3TitleScale})`,
              fontSize: 46,
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: 32,
              lineHeight: 1.25,
            }}
          >
            МОДЕЛЬ ОТ ЭТОГО <br />
            <span style={{ color: '#ef4444' }}>УМНЕЕ НЕ СТАНОВИТСЯ</span>
          </div>

          {/* Items appearing ONE BY ONE under speech */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%' }}>
            {frame >= 950 && (
              <div
                style={{
                  transform: `scale(${Math.max(0, item1Scale)})`,
                  padding: '18px 24px',
                  background: 'rgba(239,68,68,0.14)',
                  border: '2px solid rgba(239,68,68,0.5)',
                  borderRadius: 18,
                  color: '#fca5a5',
                  fontSize: 24,
                  fontWeight: 700,
                  textAlign: 'left',
                }}
              >
                ❌ Архитектуру на 10 файлов <strong>не напишет</strong>
              </div>
            )}

            {frame >= 1015 && (
              <div
                style={{
                  transform: `scale(${Math.max(0, item2Scale)})`,
                  padding: '18px 24px',
                  background: 'rgba(239,68,68,0.14)',
                  border: '2px solid rgba(239,68,68,0.5)',
                  borderRadius: 18,
                  color: '#fca5a5',
                  fontSize: 24,
                  fontWeight: 700,
                  textAlign: 'left',
                }}
              >
                ❌ Сложные логические задачи <strong>завалит</strong>
              </div>
            )}

            {frame >= 1085 && (
              <div
                style={{
                  transform: `scale(${Math.max(0, item3Scale)})`,
                  padding: '18px 24px',
                  background: 'rgba(245,158,11,0.16)',
                  border: '2px solid rgba(245,158,11,0.5)',
                  borderRadius: 18,
                  color: '#fef08a',
                  fontSize: 24,
                  fontWeight: 800,
                  textAlign: 'left',
                  boxShadow: '0 0 30px rgba(245, 158, 11, 0.25)',
                }}
              >
                💸 А спишут — <strong>как за топ-флагман!</strong>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* PHASE 4: RUSTY ZHIGULI + FERRARI BADGE + DUCT TAPE (1175-1355)  */}
      {/* ============================================================== */}
      {frame >= 1175 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Title appears at frame 1175 under speech "Это как продать..." */}
          <div
            style={{
              transform: `scale(${Math.max(0, carTitleScale)})`,
              fontSize: 44,
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: 20,
              color: '#ffffff',
            }}
          >
            ЭТО КАК ПРОДАТЬ <br />
            <span style={{ color: '#ef4444' }}>ЖИГУЛИ</span> С ШИЛЬДИКОМ <span style={{ color: '#f59e0b' }}>FERRARI</span>
          </div>

          {/* The Beaten-up Zhiguli Photo Container appears at frame 1195 */}
          {frame >= 1195 && (
            <div
              style={{
                transform: `scale(${Math.max(0, carScale)})`,
                position: 'relative',
                width: '100%',
                borderRadius: 24,
                overflow: 'hidden',
                border: '3px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
              }}
            >
              {/* The Real Beaten-up Zhiguli in Snow */}
              <Img
                src={staticFile('images/rusty_zhiguli.jpg')}
                style={{
                  width: '100%',
                  height: 380,
                  objectFit: 'cover',
                  filter: 'contrast(115%) brightness(95%)',
                  display: 'block',
                }}
              />

              {/* Ferrari Badge Dropped on Hood at frame 1235 */}
              {frame >= 1235 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '42%',
                    left: '42%',
                    transform: `translate(-50%, -50%) scale(${Math.max(0, badgeDrop)}) rotate(-8deg)`,
                    width: 140,
                    height: 140,
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.9))',
                    zIndex: 20,
                  }}
                >
                  <Img
                    src={staticFile('images/ferrari_badge.svg')}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />

                  {/* Duct Tape Strip 1 (Clean frosted tape, no text) at frame 1260 */}
                  {frame >= 1260 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 15,
                        left: -25,
                        width: 180,
                        height: 38,
                        background: 'rgba(235, 240, 245, 0.78)',
                        backdropFilter: 'blur(3px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                        transform: `rotate(-32deg) scale(${Math.max(0, tape1Scale)})`,
                        borderRadius: 3,
                        zIndex: 30,
                      }}
                    />
                  )}

                  {/* Duct Tape Strip 2 (Clean frosted tape, no text) at frame 1275 */}
                  {frame >= 1275 && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 20,
                        left: -20,
                        width: 170,
                        height: 36,
                        background: 'rgba(235, 240, 245, 0.78)',
                        backdropFilter: 'blur(3px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                        transform: `rotate(28deg) scale(${Math.max(0, tape2Scale)})`,
                        borderRadius: 3,
                        zIndex: 30,
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Final Slamming Stamp at frame 1295 under speech "Ехать быстрее оно не станет" */}
          {frame >= 1295 && (
            <div
              style={{
                transform: `scale(${Math.max(0, carStampScale)}) rotate(-3deg)`,
                marginTop: 26,
                border: '6px solid #ff334b',
                borderRadius: 22,
                padding: '20px 36px',
                color: '#ff334b',
                fontSize: 38,
                fontWeight: 900,
                letterSpacing: '0.08em',
                background: 'rgba(255, 51, 75, 0.15)',
                boxShadow: '0 0 50px rgba(255, 51, 75, 0.55)',
              }}
            >
              ЕХАТЬ БЫСТРЕЕ <br />
              ОНО НЕ СТАНЕТ!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

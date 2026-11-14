import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS } from '../types';

export const CyberBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = (frame / durationInFrames) * 100;
  const pulse = Math.sin(frame * 0.1) * 0.5 + 0.5;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.bg,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "system-ui, -apple-system, 'SF Pro Display', Inter, sans-serif",
        color: '#ffffff',
      }}
    >
      {/* Background Cyber Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.8,
        }}
      />

      {/* Radial ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(255, 51, 75, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top HUD Bar */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 28px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 20,
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: COLORS.red,
              boxShadow: `0 0 ${12 * pulse}px ${COLORS.red}`,
            }}
          />
          <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: '0.15em', color: COLORS.red }}>
            EXPOSÉ // REROUTE DETECTED
          </span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.05em' }}>
          CASE: CHEAT-AI.SHOP
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 50 }}>
        {children}
      </div>

      {/* Bottom Progress Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 8,
          width: `${progress}%`,
          backgroundColor: COLORS.red,
          boxShadow: `0 0 16px ${COLORS.red}`,
          zIndex: 20,
        }}
      />
    </div>
  );
};

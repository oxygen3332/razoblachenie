import React from 'react';
import { Sequence, Audio, staticFile } from 'remotion';
import { CyberBackground } from './components/CyberBackground';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Thinking } from './scenes/Scene2Thinking';
import { Scene3Mask } from './scenes/Scene3Mask';
import { Scene4Analogy } from './scenes/Scene4Analogy';
import { Scene5Leak } from './scenes/Scene5Leak';
import { Scene6Verdict } from './scenes/Scene6Verdict';
import { TIMINGS } from './types';

export const MainExposeVideo: React.FC = () => {
  return (
    <CyberBackground>
      {/* Background Ambience Track */}
      <Audio src={staticFile('audio/bg_music.mp3')} volume={0.12} />

      {/* SCENE 1: THE HOOK (0 - 493) */}
      <Sequence from={TIMINGS.scene1.start} durationInFrames={TIMINGS.scene1.durationInFrames}>
        <Audio src={staticFile('audio/scene1.mp3')} volume={1.0} />
        <Sequence from={0} durationInFrames={60}>
          <Audio src={staticFile('sfx/glitch.mp3')} volume={0.35} />
        </Sequence>
        <Sequence from={155} durationInFrames={60}>
          <Audio src={staticFile('sfx/alert.mp3')} volume={0.3} />
        </Sequence>
        <Sequence from={260} durationInFrames={60}>
          <Audio src={staticFile('sfx/impact.mp3')} volume={0.65} />
        </Sequence>
        <Scene1Hook />
      </Sequence>

      {/* SCENE 2: FACT 1 - THINKING STRIPPED (493 - 963) */}
      <Sequence from={TIMINGS.scene2.start} durationInFrames={TIMINGS.scene2.durationInFrames}>
        <Audio src={staticFile('audio/scene2.mp3')} volume={1.0} />
        {/* Alert triggers exactly at frame 245 when Card 2 drops */}
        <Sequence from={245} durationInFrames={60}>
          <Audio src={staticFile('sfx/alert.mp3')} volume={0.35} />
        </Sequence>
        <Scene2Thinking />
      </Sequence>

      {/* SCENE 3: FACT 2 - THE MASK (963 - 1447) */}
      <Sequence from={TIMINGS.scene3.start} durationInFrames={TIMINGS.scene3.durationInFrames}>
        <Audio src={staticFile('audio/scene3.mp3')} volume={1.0} />
        <Sequence from={85} durationInFrames={60}>
          <Audio src={staticFile('sfx/glitch.mp3')} volume={0.25} />
        </Sequence>
        <Sequence from={230} durationInFrames={60}>
          <Audio src={staticFile('sfx/glitch.mp3')} volume={0.25} />
        </Sequence>
        <Scene3Mask />
      </Sequence>

      {/* SCENE 4: WHY IT MATTERS & ANALOGY (1447 - 2802) */}
      <Sequence from={TIMINGS.scene4.start} durationInFrames={TIMINGS.scene4.durationInFrames}>
        <Audio src={staticFile('audio/scene4_analogy.mp3')} volume={1.0} />
        {/* Alert on "У них нет Опуса" at frame 370 */}
        <Sequence from={370} durationInFrames={60}>
          <Audio src={staticFile('sfx/alert.mp3')} volume={0.3} />
        </Sequence>
        {/* Glitch on "Одна и та же дешёвая сетка" at frame 625 */}
        <Sequence from={625} durationInFrames={60}>
          <Audio src={staticFile('sfx/glitch.mp3')} volume={0.35} />
        </Sequence>
        {/* Impact when Ferrari badge drops on Zhiguli at frame 1235 */}
        <Sequence from={1235} durationInFrames={60}>
          <Audio src={staticFile('sfx/impact.mp3')} volume={0.7} />
        </Sequence>
        {/* Duct tape slap at frame 1260 */}
        <Sequence from={1260} durationInFrames={30}>
          <Audio src={staticFile('sfx/glitch.mp3')} volume={0.35} />
        </Sequence>
        {/* Stamp at frame 1295 */}
        <Sequence from={1295} durationInFrames={60}>
          <Audio src={staticFile('sfx/impact.mp3')} volume={0.65} />
        </Sequence>
        <Scene4Analogy />
      </Sequence>

      {/* SCENE 5: FACT 3 - THE LEAK & 404 (2802 - 3204) */}
      <Sequence from={TIMINGS.scene5.start} durationInFrames={TIMINGS.scene5.durationInFrames}>
        <Audio src={staticFile('audio/scene5_leak.mp3')} volume={1.0} />
        <Sequence from={70} durationInFrames={60}>
          <Audio src={staticFile('sfx/alert.mp3')} volume={0.3} />
        </Sequence>
        <Scene5Leak />
      </Sequence>

      {/* SCENE 6: FINAL VERDICT & HORROR JUMPSCARE (3204 - 3609) */}
      <Sequence from={TIMINGS.scene6.start} durationInFrames={TIMINGS.scene6.durationInFrames}>
        <Audio src={staticFile('audio/scene6_verdict.mp3')} volume={1.0} />
        <Sequence from={35} durationInFrames={60}>
          <Audio src={staticFile('sfx/impact.mp3')} volume={0.5} />
        </Sequence>
        {/* Screamer jumpscare sound starting exactly at frame 350 */}
        <Sequence from={350} durationInFrames={55}>
          <Audio src={staticFile('sfx/screamer.mp3')} volume={1.0} />
        </Sequence>
        <Scene6Verdict />
      </Sequence>
    </CyberBackground>
  );
};

import React from 'react';
import { Composition } from 'remotion';
import { MainExposeVideo } from './MainExposeVideo';
import { TIMINGS } from './types';

export const Root: React.FC = () => {
  return (
    <Composition
      id="NexoraxExpose"
      component={MainExposeVideo}
      durationInFrames={TIMINGS.totalFrames}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

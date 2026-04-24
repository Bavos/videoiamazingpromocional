import React from "react";
import {AbsoluteFill, Composition, Sequence} from "remotion";
import sceneData from "../data/sceneData.json";
import {Scene1} from "./components/Scene1";
import {Scene2} from "./components/Scene2";
import {Scene3} from "./components/Scene3";
import {Scene4} from "./components/Scene4";
import {Scene5} from "./components/Scene5";

export interface VideoConfig {
  id: string;
  width: number;
  height: number;
  fps: number;
  durationInSeconds: number;
  backgroundColor: string;
  fontFamily: string;
  transitionFrames: number;
  titleLetterSpacing: number;
}

interface SceneAnimation {
  [key: string]: number;
}

interface BaseScene {
  id: string;
  durationInSeconds: number;
  backgroundColor: string;
  accentColor: string;
  title: string;
  animation: SceneAnimation;
}

export interface Scene1Data extends BaseScene {
  subtitle: string;
}

export interface BulletSceneData extends BaseScene {
  bullets: string[];
}

export interface Scene5Data extends BaseScene {
  targetTitle: string;
  targetAudience: string[];
  specialistName: string;
  specialistTitle: string;
  credentials: string[];
}

interface SceneData {
  video: VideoConfig;
  scenes: [Scene1Data, BulletSceneData, BulletSceneData, BulletSceneData, Scene5Data];
}

export interface SceneProps<T> {
  scene: T;
  durationInFrames: number;
  transitionFrames: number;
  global: VideoConfig;
}

const typedData = sceneData as SceneData;

const secondsToFrames = (seconds: number, fps: number): number => Math.round(seconds * fps);

export const Video: React.FC = () => {
  const {video, scenes} = typedData;
  const overlap = video.transitionFrames;

  const sceneDurations = scenes.map((scene) => secondsToFrames(scene.durationInSeconds, video.fps));

  const starts = sceneDurations.reduce<number[]>((acc, current, index) => {
    if (index === 0) {
      return [0];
    }

    const previousStart = acc[index - 1] ?? 0;
    const previousDuration = sceneDurations[index - 1] ?? 0;
    return [...acc, previousStart + previousDuration - overlap];
  }, []);

  return (
    <AbsoluteFill style={{backgroundColor: video.backgroundColor, fontFamily: video.fontFamily}}>
      <Sequence from={starts[0]} durationInFrames={sceneDurations[0]}>
        <Scene1
          scene={scenes[0]}
          durationInFrames={sceneDurations[0]}
          transitionFrames={overlap}
          global={video}
        />
      </Sequence>

      <Sequence from={starts[1]} durationInFrames={sceneDurations[1]}>
        <Scene2
          scene={scenes[1]}
          durationInFrames={sceneDurations[1]}
          transitionFrames={overlap}
          global={video}
        />
      </Sequence>

      <Sequence from={starts[2]} durationInFrames={sceneDurations[2]}>
        <Scene3
          scene={scenes[2]}
          durationInFrames={sceneDurations[2]}
          transitionFrames={overlap}
          global={video}
        />
      </Sequence>

      <Sequence from={starts[3]} durationInFrames={sceneDurations[3]}>
        <Scene4
          scene={scenes[3]}
          durationInFrames={sceneDurations[3]}
          transitionFrames={overlap}
          global={video}
        />
      </Sequence>

      <Sequence from={starts[4]} durationInFrames={sceneDurations[4]}>
        <Scene5
          scene={scenes[4]}
          durationInFrames={sceneDurations[4]}
          transitionFrames={overlap}
          global={video}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  const {video} = typedData;

  return (
    <Composition
      id={video.id}
      component={Video}
      width={video.width}
      height={video.height}
      fps={video.fps}
      durationInFrames={secondsToFrames(video.durationInSeconds, video.fps)}
    />
  );
};

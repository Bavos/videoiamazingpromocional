import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {Scene1Data, SceneProps} from "../Video";

export const Scene1: React.FC<SceneProps<Scene1Data>> = ({
  scene,
  durationInFrames,
  transitionFrames,
  global
}) => {
  const frame = useCurrentFrame();
  const fadeOutStart = Math.floor(durationInFrames * scene.animation.fadeOutStartPercent);

  const opacity = interpolate(
    frame,
    [0, transitionFrames, fadeOutStart, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
  );

  const translateY = interpolate(
    frame,
    [0, transitionFrames, fadeOutStart, durationInFrames],
    [scene.animation.enterY, 0, 0, scene.animation.exitY],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
  );

  const scale = interpolate(
    frame,
    [0, transitionFrames, fadeOutStart],
    [scene.animation.titleScaleFrom, scene.animation.titleScaleTo, 1],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
  );

  const subtitleOpacity = interpolate(
    frame,
    [transitionFrames * 0.3, transitionFrames * 1.8],
    [scene.animation.subtitleOpacityFrom, scene.animation.subtitleOpacityTo],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: scene.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `translateY(${translateY}px)`
      }}
    >
      <div
        style={{
          color: "#FFFFFF",
          textAlign: "center",
          maxWidth: 1300,
          padding: "0 80px"
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 108,
            letterSpacing: global.titleLetterSpacing,
            transform: `scale(${scale})`
          }}
        >
          {scene.title}
        </h1>
        <div
          style={{
            margin: "26px auto 0",
            width: 260,
            height: 8,
            borderRadius: 10,
            backgroundColor: scene.accentColor,
            opacity: subtitleOpacity
          }}
        />
        <p
          style={{
            marginTop: 34,
            fontSize: 42,
            lineHeight: 1.28,
            opacity: subtitleOpacity
          }}
        >
          {scene.subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};

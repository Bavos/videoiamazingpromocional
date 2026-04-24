import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {BulletSceneData, SceneProps} from "../Video";

export const Scene2: React.FC<SceneProps<BulletSceneData>> = ({
  scene,
  durationInFrames,
  transitionFrames
}) => {
  const frame = useCurrentFrame();
  const fadeOutStart = Math.floor(durationInFrames * scene.animation.fadeOutStartPercent);

  const opacity = interpolate(
    frame,
    [0, transitionFrames, fadeOutStart, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
  );

  const titleOpacity = interpolate(frame, [0, transitionFrames * 1.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill style={{backgroundColor: scene.backgroundColor, opacity, color: "#FFFFFF"}}>
      <h2
        style={{
          margin: 0,
          marginTop: scene.animation.titleY,
          textAlign: "center",
          fontSize: 76,
          color: scene.accentColor,
          opacity: titleOpacity
        }}
      >
        {scene.title}
      </h2>

      {scene.bullets.map((item, index) => {
        const stagger = transitionFrames + index * 12;
        const itemOpacity = interpolate(frame, [stagger, stagger + 14], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp"
        });
        const translateX = interpolate(
          frame,
          [stagger, stagger + 18],
          [scene.animation.itemSlideX, 0],
          {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
        );

        return (
          <div
            key={item}
            style={{
              position: "absolute",
              left: 260,
              top: scene.animation.listStartY + index * scene.animation.itemGap,
              fontSize: 52,
              opacity: itemOpacity,
              transform: `translateX(${translateX}px)`,
              display: "flex",
              alignItems: "center",
              gap: 20
            }}
          >
            <span style={{color: scene.accentColor, fontSize: 62}}>•</span>
            <span>{item}</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

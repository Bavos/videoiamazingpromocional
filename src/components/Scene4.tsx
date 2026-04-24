import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {BulletSceneData, SceneProps} from "../Video";

export const Scene4: React.FC<SceneProps<BulletSceneData>> = ({
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

  return (
    <AbsoluteFill style={{backgroundColor: scene.backgroundColor, color: "#FFFFFF", opacity}}>
      <h2
        style={{
          margin: 0,
          marginTop: scene.animation.titleY,
          textAlign: "center",
          fontSize: 66,
          color: scene.accentColor,
          padding: "0 100px"
        }}
      >
        {scene.title}
      </h2>

      {scene.bullets.map((item, index) => {
        const start = transitionFrames + index * 9;
        const itemOpacity = interpolate(frame, [start, start + 14], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp"
        });
        const scale = interpolate(frame, [start, start + 14], [0.92, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp"
        });

        return (
          <div
            key={item}
            style={{
              position: "absolute",
              left: 180,
              top: scene.animation.listStartY + index * scene.animation.listStep,
              width: 1560,
              borderLeft: `8px solid ${scene.accentColor}`,
              paddingLeft: 28,
              fontSize: 44,
              lineHeight: scene.animation.lineHeight,
              opacity: itemOpacity,
              transform: `scale(${scale})`,
              transformOrigin: "left center"
            }}
          >
            {item}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

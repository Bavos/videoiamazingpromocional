import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {Scene5Data, SceneProps} from "../Video";

export const Scene5: React.FC<SceneProps<Scene5Data>> = ({
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

  const leftColumnOpacity = interpolate(frame, [transitionFrames, transitionFrames + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  const rightColumnOpacity = interpolate(
    frame,
    [transitionFrames + 10, transitionFrames + 30],
    [0, 1],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
  );

  return (
    <AbsoluteFill style={{backgroundColor: scene.backgroundColor, color: "#FFFFFF", opacity}}>
      <h2
        style={{
          margin: "110px 0 0",
          textAlign: "center",
          fontSize: 74,
          color: scene.accentColor
        }}
      >
        {scene.title}
      </h2>

      <div
        style={{
          position: "absolute",
          left: scene.animation.leftColumnX,
          top: scene.animation.contentY,
          width: 670,
          opacity: leftColumnOpacity
        }}
      >
        <h3 style={{margin: 0, fontSize: 52, color: scene.accentColor}}>{scene.targetTitle}</h3>
        {scene.targetAudience.map((item) => (
          <p key={item} style={{fontSize: 42, margin: "24px 0 0"}}>
            • {item}
          </p>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: scene.animation.rightColumnX,
          top: scene.animation.contentY,
          width: 760,
          opacity: rightColumnOpacity
        }}
      >
        <h3 style={{margin: 0, fontSize: 56}}>{scene.specialistName}</h3>
        <p style={{margin: "14px 0 0", fontSize: 36, color: scene.accentColor}}>{scene.specialistTitle}</p>
        {scene.credentials.map((item) => (
          <p key={item} style={{fontSize: 34, margin: "22px 0 0", lineHeight: 1.25}}>
            • {item}
          </p>
        ))}
      </div>
    </AbsoluteFill>
  );
};

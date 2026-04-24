import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {BulletSceneData, SceneProps} from "../Video";

export const Scene3: React.FC<SceneProps<BulletSceneData>> = ({
  scene,
  durationInFrames,
  transitionFrames
}) => {
  const frame = useCurrentFrame();
  const fadeOutStart = Math.floor(durationInFrames * scene.animation.fadeOutStartPercent);

  const sceneOpacity = interpolate(
    frame,
    [0, transitionFrames, fadeOutStart, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
  );

  const cardsPerRow = scene.animation.cardsPerRow;

  return (
    <AbsoluteFill style={{backgroundColor: scene.backgroundColor, opacity: sceneOpacity, color: "#FFFFFF"}}>
      <h2
        style={{
          margin: "130px 120px 0",
          textAlign: "center",
          fontSize: 72,
          color: scene.accentColor
        }}
      >
        {scene.title}
      </h2>

      {scene.bullets.map((item, index) => {
        const row = Math.floor(index / cardsPerRow);
        const col = index % cardsPerRow;
        const x = 230 + col * (scene.animation.cardWidth + scene.animation.cardGapX);
        const y = scene.animation.gridStartY + row * (scene.animation.cardHeight + scene.animation.cardGapY);

        const entryStart = transitionFrames + index * 10;
        const cardOpacity = interpolate(frame, [entryStart, entryStart + 16], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp"
        });
        const lift = interpolate(frame, [entryStart, entryStart + 16], [32, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp"
        });

        return (
          <div
            key={item}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: scene.animation.cardWidth,
              height: scene.animation.cardHeight,
              borderRadius: 24,
              backgroundColor: "rgba(255,255,255,0.08)",
              border: `2px solid ${scene.accentColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "24px 36px",
              fontSize: 46,
              opacity: cardOpacity,
              transform: `translateY(${lift}px)`
            }}
          >
            {item}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

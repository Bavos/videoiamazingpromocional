import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface SceneProps {
  scene: any;
  startFrame: number;
  durationInFrames: number;
}

export const Scene2 = ({ scene, startFrame, durationInFrames }: SceneProps) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  const slideX = interpolate(relativeFrame, [0, 40], [1920, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: scene.backgroundColor,
        padding: 60,
      }}
    >
      <h2
        style={{
          fontSize: 48,
          color: scene.accentColor,
          marginBottom: 50,
          fontFamily: "sans-serif",
        }}
      >
        {scene.title}
      </h2>
      <div
        style={{
          transform: `translateX(${slideX}px)`,
        }}
      >
        {scene.items.map((item: string, index: number) => {
          const itemDelay = index * 15;
          const itemOpacity = interpolate(
            relativeFrame,
            [itemDelay, itemDelay + 20],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          return (
            <p
              key={index}
              style={{
                fontSize: 28,
                color: scene.textColor,
                marginBottom: 20,
                opacity: itemOpacity,
                fontFamily: "sans-serif",
              }}
            >
              {item}
            </p>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface SceneProps {
  scene: any;
  startFrame: number;
  durationInFrames: number;
}

export const Scene3 = ({ scene, startFrame, durationInFrames }: SceneProps) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  const zoom = interpolate(relativeFrame, [0, 40], [1.2, 1], {
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
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        {scene.title}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          transform: `scale(${zoom})`,
        }}
      >
        {scene.items.map((item: string, index: number) => {
          const cardDelay = index * 10;
          const cardOpacity = interpolate(
            relativeFrame,
            [cardDelay, cardDelay + 20],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={index}
              style={{
                backgroundColor: "#2d2d2d",
                padding: 30,
                borderRadius: 16,
                textAlign: "center",
                opacity: cardOpacity,
              }}
            >
              <p
                style={{
                  fontSize: 24,
                  color: scene.textColor,
                  fontFamily: "sans-serif",
                }}
              >
                {item}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

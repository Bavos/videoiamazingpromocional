import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface SceneProps {
  scene: any;
  startFrame: number;
  durationInFrames: number;
}

export const Scene4 = ({ scene, startFrame, durationInFrames }: SceneProps) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: scene.backgroundColor,
        padding: 60,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontSize: 48,
          color: scene.accentColor,
          marginBottom: 60,
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        {scene.title}
      </h2>
      <div>
        {scene.bullets.map((bullet: string, index: number) => {
          const bulletDelay = index * 20;
          const bulletOpacity = interpolate(
            relativeFrame,
            [bulletDelay, bulletDelay + 15],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          const bulletSlide = interpolate(
            relativeFrame,
            [bulletDelay, bulletDelay + 15],
            [100, 0],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={index}
              style={{
                opacity: bulletOpacity,
                transform: `translateX(${bulletSlide}px)`,
                marginBottom: 30,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: scene.accentColor,
                  borderRadius: 12,
                  marginRight: 20,
                }}
              />
              <p
                style={{
                  fontSize: 28,
                  color: scene.textColor,
                  fontFamily: "sans-serif",
                }}
              >
                {bullet}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

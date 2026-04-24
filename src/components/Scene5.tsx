import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface SceneProps {
  scene: any;
  startFrame: number;
  durationInFrames: number;
}

export const Scene5 = ({ scene, startFrame, durationInFrames }: SceneProps) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  const opacity = interpolate(relativeFrame, [0, 30, durationInFrames - 30, durationInFrames], [1, 1, 0, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulseScale = interpolate(relativeFrame, [0, 30, 60], [1, 1.05, 1], {
    extrapolateRight: "clamp",
    loop: true,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: scene.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <h1
        style={{
          fontSize: 64,
          fontWeight: "bold",
          color: scene.accentColor,
          marginBottom: 20,
          fontFamily: "sans-serif",
        }}
      >
        {scene.title}
      </h1>
      <p
        style={{
          fontSize: 28,
          color: scene.textColor,
          marginBottom: 40,
          fontFamily: "sans-serif",
        }}
      >
        {scene.cta}
      </p>
      <div
        style={{
          transform: `scale(${pulseScale})`,
          padding: "20px 40px",
          backgroundColor: scene.accentColor,
          borderRadius: 50,
        }}
      >
        <p
          style={{
            fontSize: 32,
            color: "#ffffff",
            fontWeight: "bold",
            fontFamily: "sans-serif",
          }}
        >
          {scene.subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};

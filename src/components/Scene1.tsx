import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface SceneProps {
  scene: any;
  startFrame: number;
  durationInFrames: number;
}

export const Scene1 = ({ scene, startFrame, durationInFrames }: SceneProps) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  const opacity = interpolate(relativeFrame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = interpolate(relativeFrame, [0, 30], [0.8, 1], {
    extrapolateRight: "clamp",
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
          fontSize: 72,
          fontWeight: "bold",
          color: scene.accentColor,
          transform: `scale(${titleScale})`,
          marginBottom: 20,
          fontFamily: "sans-serif",
        }}
      >
        {scene.title}
      </h1>
      <p
        style={{
          fontSize: 32,
          color: scene.textColor,
          textAlign: "center",
          maxWidth: "80%",
          fontFamily: "sans-serif",
        }}
      >
        {scene.subtitle}
      </p>
    </AbsoluteFill>
  );
};

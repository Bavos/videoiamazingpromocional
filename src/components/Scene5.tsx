import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface SceneProps {
  scene: any;
  startFrame: number;
  durationInFrames: number;
}

export const Scene5 = ({ scene, startFrame }: SceneProps) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  const opacity = interpolate(relativeFrame, [0, 30, 230, 270], [0, 1, 1, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
        opacity: opacity,
      }}
    >
      <h1
        style={{
          fontSize: 64,
          fontWeight: "bold",
          color: "#8b5cf6",
          marginBottom: 30,
        }}
      >
        {scene.title}
      </h1>

      <div
        style={{
          backgroundColor: "#8b5cf6",
          padding: "15px 40px",
          borderRadius: 50,
          marginBottom: 40,
        }}
      >
        <p
          style={{
            fontSize: 24,
            color: "#ffffff",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          {scene.cta}
        </p>
      </div>

      <p
        style={{
          fontSize: 28,
          color: "#94a3b8",
        }}
      >
        {scene.subtitle}
      </p>
    </AbsoluteFill>
  );
};

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Scene1 = ({ scene, startFrame }: any) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;
  const opacity = interpolate(relativeFrame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: 90,
            fontWeight: "bold",
            background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontFamily: "sans-serif",
          }}
        >
          IAmazing
        </h1>
        <p
          style={{
            fontSize: 32,
            color: "#cbd5e1",
            marginTop: 20,
            fontFamily: "sans-serif",
          }}
        >
          Inteligência Artificial Aplicada ao Seu Crescimento
        </p>
      </div>
    </AbsoluteFill>
  );
};

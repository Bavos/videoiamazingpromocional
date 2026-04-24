import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

interface SceneProps {
  scene: any;
  startFrame: number;
}

export const Scene1 = ({ scene, startFrame }: SceneProps) => {
  const frame = useCurrentFrame() - startFrame;
  const { title, subtitle, backgroundColor, textColor, accentColor } = scene.data;
  const fadeIn = scene.fadeInDuration || 20;

  const opacity = interpolate(frame, [0, fadeIn], [0, 1], { extrapolateRight: "clamp" });
  const fadeOutStart = scene.durationInFrames - (scene.fadeOutDuration || 20);
  const opacityOut = interpolate(frame, [fadeOutStart, scene.durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  const finalOpacity = Math.min(opacity, opacityOut);

  return (
    <AbsoluteFill style={{ backgroundColor, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: textColor, fontSize: 80, margin: 0, opacity: finalOpacity }}>{title}</h1>
        <h2 style={{ color: accentColor, fontSize: 40, marginTop: 20, opacity: finalOpacity }}>{subtitle}</h2>
      </div>
    </AbsoluteFill>
  );
};

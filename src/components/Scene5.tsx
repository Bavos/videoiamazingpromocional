import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

interface SceneProps {
  scene: any;
  startFrame: number;
}

export const Scene5 = ({ scene, startFrame }: SceneProps) => {
  const frame = useCurrentFrame() - startFrame;
  const { title, subtitle, callToAction, backgroundColor, textColor, accentColor } = scene.data;

  const fadeIn = scene.fadeInDuration || 20;
  const fadeOutStart = scene.durationInFrames - (scene.fadeOutDuration || 30);
  const fadeOut = interpolate(frame, [fadeOutStart, scene.durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const fadeInVal = interpolate(frame, [0, fadeIn], [0, 1], { extrapolateRight: "clamp" });
  const opacity = Math.min(fadeInVal, fadeOut);

  return (
    <AbsoluteFill style={{ backgroundColor, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ color: textColor, fontSize: 80, margin: 0, opacity }}>{title}</h1>
      <h2 style={{ color: accentColor, fontSize: 44, marginTop: 20, opacity }}>{subtitle}</h2>
      <p style={{ color: textColor, fontSize: 32, marginTop: 60, opacity }}>{callToAction}</p>
    </AbsoluteFill>
  );
};

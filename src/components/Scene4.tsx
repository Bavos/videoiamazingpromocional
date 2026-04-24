import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

interface SceneProps {
  scene: any;
  startFrame: number;
}

export const Scene4 = ({ scene, startFrame }: SceneProps) => {
  const frame = useCurrentFrame() - startFrame;
  const { title, backgroundColor, titleColor, bulletColor, textColor, bulletAppearDelay, bullets } = scene.data;

  const fadeIn = scene.fadeInDuration || 20;
  const fadeOutStart = scene.durationInFrames - (scene.fadeOutDuration || 20);
  const fadeOut = interpolate(frame, [fadeOutStart, scene.durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const fadeInVal = interpolate(frame, [0, fadeIn], [0, 1], { extrapolateRight: "clamp" });
  const opacity = Math.min(fadeInVal, fadeOut);

  return (
    <AbsoluteFill style={{ backgroundColor, display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 120 }}>
      <h1 style={{ color: titleColor, fontSize: 56, marginBottom: 60, opacity }}>{title}</h1>
      {bullets.map((b: any, i: number) => {
        const start = i * bulletAppearDelay;
        const bulletOpacity = interpolate(frame, [start, start + 15], [0, 1], { extrapolateRight: "clamp" });
        const slideX = interpolate(frame, [start, start + 15], [50, 0], { extrapolateRight: "clamp" });
        return (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", marginBottom: 40, opacity: bulletOpacity * opacity, transform: `translateX(${slideX}px)` }}>
            <div style={{ width: 14, height: 14, backgroundColor: bulletColor, borderRadius: "50%", marginRight: 20, marginTop: 8, flexShrink: 0 }} />
            <div>
              <h2 style={{ color: bulletColor, fontSize: 34, margin: 0, marginBottom: 8 }}>{b.title}</h2>
              <p style={{ color: textColor, fontSize: 26, margin: 0, maxWidth: 1200 }}>{b.description}</p>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

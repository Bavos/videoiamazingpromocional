import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

interface SceneProps {
  scene: any;
  startFrame: number;
}

export const Scene2 = ({ scene, startFrame }: SceneProps) => {
  const frame = useCurrentFrame() - startFrame;
  const { title, backgroundColor, titleColor, items, itemColor, textColor, slideStaggerFrames, slideDuration } = scene.data;

  const fadeIn = scene.fadeInDuration || 20;
  const fadeOutStart = scene.durationInFrames - (scene.fadeOutDuration || 20);
  const fadeOut = interpolate(frame, [fadeOutStart, scene.durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const fadeInVal = interpolate(frame, [0, fadeIn], [0, 1], { extrapolateRight: "clamp" });
  const opacity = Math.min(fadeInVal, fadeOut);

  return (
    <AbsoluteFill style={{ backgroundColor, display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 120 }}>
      <h1 style={{ color: titleColor, fontSize: 60, marginBottom: 60, opacity }}>{title}</h1>
      {items.map((item: { text: string }, i: number) => {
        const itemStart = i * (slideStaggerFrames + slideDuration);
        const slideX = interpolate(frame, [itemStart, itemStart + slideDuration], [1920, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
        const itemOpacity = interpolate(frame, [itemStart, itemStart + 10], [0, 1], { extrapolateRight: "clamp" });
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 30, opacity: itemOpacity * opacity }}>
            <div style={{ width: 12, height: 12, backgroundColor: itemColor, borderRadius: "50%", marginRight: 20, flexShrink: 0 }} />
            <span style={{ color: textColor, fontSize: 36, transform: `translateX(${slideX}px)` }}>{item.text}</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

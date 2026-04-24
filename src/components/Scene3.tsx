import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

interface SceneProps {
  scene: any;
  startFrame: number;
}

export const Scene3 = ({ scene, startFrame }: SceneProps) => {
  const frame = useCurrentFrame() - startFrame;
  const { title, backgroundColor, titleColor, name, nameColor, qualifications, textColor, zoomDuration } = scene.data;

  const fadeIn = scene.fadeInDuration || 20;
  const fadeOutStart = scene.durationInFrames - (scene.fadeOutDuration || 20);
  const fadeOut = interpolate(frame, [fadeOutStart, scene.durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const fadeInVal = interpolate(frame, [0, fadeIn], [0, 1], { extrapolateRight: "clamp" });
  const opacity = Math.min(fadeInVal, fadeOut);

  const zoom = interpolate(frame, [0, zoomDuration], [1.2, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h2 style={{ color: titleColor, fontSize: 48, marginBottom: 30, opacity }}>{title}</h2>
      <div style={{ transform: `scale(${zoom})`, opacity }}>
        <h1 style={{ color: nameColor, fontSize: 72, marginBottom: 40 }}>{name}</h1>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {qualifications.map((q: string, i: number) => (
            <li key={i} style={{ color: textColor, fontSize: 32, marginBottom: 15 }}>
              {q}
            </li>
          ))}
        </ul>
      </div>
    </AbsoluteFill>
  );
};

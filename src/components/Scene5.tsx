import { AbsoluteFill, interpolate, useCurrentFrame, spring } from "remotion";

interface SceneProps {
  scene: any;
  startFrame: number;
  durationInFrames: number;
}

export const Scene5 = ({ scene, startFrame, durationInFrames }: SceneProps) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  // Animações mais elegantes
  const titleOpacity = interpolate(relativeFrame, [0, 20], [0, 1]);
  const titleScale = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 12, mass: 0.5 },
  });

  const ctaScale = spring({
    frame: relativeFrame - 15,
    fps: 30,
    config: { damping: 10 },
  });

  const urlOpacity = interpolate(relativeFrame, [30, 50], [0, 1]);

  // Cor roxa/azul da IAmazing (baseado no site)
  const brandColor = "#8b5cf6"; // Roxo da marca
  const darkBg = "#0f172a"; // Fundo escuro profissional

  return (
    <AbsoluteFill
      style={{
        backgroundColor: darkBg,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Linha decorativa superior */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: `linear-gradient(90deg, ${brandColor}, #06b6d4, ${brandColor})`,
        }}
      />

      {/* Título principal */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: "bold",
          fontFamily: "sans-serif",
          background: `linear-gradient(135deg, ${brandColor}, #a855f7)`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          marginBottom: 30,
        }}
      >
        {scene.title}
      </h1>

      {/* CTA - Botão estilizado */}
      <div
        style={{
          backgroundColor: brandColor,
          padding: "20px 50px",
          borderRadius: 60,
          transform: `scale(${ctaScale})`,
          boxShadow: "0 10px 40px rgba(139, 92, 246, 0.3)",
          marginBottom: 50,
        }}
      >
        <p
          style={{
            fontSize: 28,
            color: "#ffffff",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            margin: 0,
          }}
        >
          {scene.cta}
        </p>
      </div>

      {/* URL do site */}
      <p
        style={{
          fontSize: 32,
          color: "#94a3b8",
          fontFamily: "monospace",
          opacity: urlOpacity,
          letterSpacing: 1,
        }}
      >
        {scene.subtitle}
      </p>

      {/* Linha decorativa inferior */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${brandColor}, transparent)`,
        }}
      />
    </AbsoluteFill>
  );
};
      </div>
    </AbsoluteFill>
  );
};

import { Composition } from "remotion";
import { Scene1 } from "./components/Scene1";
import { Scene2 } from "./components/Scene2";
import { Scene3 } from "./components/Scene3";
import { Scene4 } from "./components/Scene4";
import { Scene5 } from "./components/Scene5";
import sceneData from "../data/sceneData.json";

interface SceneProps {
  sceneData: typeof sceneData;
}

// Componente Video refatorado: ele recebe a prop sceneData e contem toda a logica de cenas E o Audio
const Video = ({ sceneData }: SceneProps) => {
  // Importe Audio e useCurrentFrame aqui dentro, se precisar
  const { Audio } = require("remotion"); // Ou importe no topo: import { Audio } from "remotion";
  
  let currentFrameOffset = 0;

  const getSceneComponent = (scene: any) => {
    switch (scene.type) {
      case "opening":
        return Scene1;
      case "content":
        return Scene2;
      case "highlight":
        return Scene3;
      case "bullets":
        return Scene4;
      case "closing":
        return Scene5;
      default:
        return Scene1;
    }
  };

  return (
    <>
      {/* Audio agora esta dentro do componente que representa a composicao */}
      {sceneData.audioSrc && (
        <Audio src={sceneData.audioSrc} volume={sceneData.audioVolume} />
      )}
      <div style={{ flex: 1, backgroundColor: "#000" }}>
        {sceneData.scenes.map((scene, index) => {
          const Component = getSceneComponent(scene);
          const startFrame = currentFrameOffset;
          currentFrameOffset += scene.duration;

          return (
            <Component
              key={scene.id}
              scene={scene}
              startFrame={startFrame}
              durationInFrames={scene.duration}
            />
          );
        })}
      </div>
    </>
  );
};

// Componente Root que registra a composicao
export const VideoRoot = () => {
  const totalDuration = sceneData.scenes.reduce((acc, scene) => acc + scene.duration, 0);

  return (
    <Composition
      id="IAmazingVideo"
      component={Video} // A referencia correta para o componente de video
      durationInFrames={totalDuration}
      fps={sceneData.fps}
      width={1920}
      height={1080}
      defaultProps={{ sceneData }}
    />
  );
};

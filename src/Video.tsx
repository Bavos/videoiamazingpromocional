import { Composition } from "remotion";
import { Scene1 } from "./components/Scene1";
import { Scene2 } from "./components/Scene2";
import { Scene3 } from "./components/Scene3";
import { Scene4 } from "./components/Scene4";
import { Scene5 } from "./components/Scene5";

// Importacao direta do JSON
import sceneData from "../data/sceneData.json";

interface SceneProps {
  sceneData: any;
}

const Video = ({ sceneData }: SceneProps) => {
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

  if (!sceneData || !sceneData.scenes) {
    return (
      <div style={{ backgroundColor: "black", color: "white", padding: 20 }}>
        Error: sceneData not loaded
      </div>
    );
  }

  return (
    <div style={{ flex: 1, backgroundColor: "#000" }}>
      {sceneData.scenes.map((scene: any, index: number) => {
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
  );
};

export const VideoRoot = () => {
  if (!sceneData || !sceneData.scenes) {
    console.error("sceneData is invalid:", sceneData);
    return null;
  }

  const totalDuration = sceneData.scenes.reduce((acc, scene) => acc + scene.duration, 0);

  return (
    <Composition
      id="IAmazingVideo"
      component={Video}
      durationInFrames={totalDuration}
      fps={sceneData.fps || 30}
      width={1920}
      height={1080}
      defaultProps={{ sceneData }}
    />
  );
};

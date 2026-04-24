import { Composition } from "remotion";
import sceneData from "../data/sceneData.json";
import { Scene1 } from "./components/Scene1";
import { Scene2 } from "./components/Scene2";
import { Scene3 } from "./components/Scene3";
import { Scene4 } from "./components/Scene4";
import { Scene5 } from "./components/Scene5";

const scenes = sceneData.scenes;

const totalDuration = scenes.reduce(
  (acc, scene) => acc + scene.durationInFrames,
  0
);

const FullVideo = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {scenes.map((scene, index) => {
        let startFrame = 0;
        for (let i = 0; i < index; i++) {
          startFrame += scenes[i].durationInFrames;
        }
        const props = { scene, startFrame };
        switch (scene.type) {
          case "opening":
            return <Scene1 key={scene.id} {...props} />;
          case "services":
            return <Scene2 key={scene.id} {...props} />;
          case "highlight":
            return <Scene3 key={scene.id} {...props} />;
          case "bullets":
            return <Scene4 key={scene.id} {...props} />;
          case "closing":
            return <Scene5 key={scene.id} {...props} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export const Video = () => {
  return (
    <Composition
      id="iamazing"
      component={FullVideo}
      durationInFrames={totalDuration}
      fps={sceneData.fps}
      width={sceneData.width}
      height={sceneData.height}
    />
  );
};

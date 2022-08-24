import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  ArcRotateCamera,
} from "@babylonjs/core";
export class BabylonScene {
  scene: Scene;
  engine: Engine;
  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);

    this.scene = this.CreateScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new ArcRotateCamera(
      "camera",
      0,
      0,
      10,
      new Vector3(0, 0, 0),
      this.scene
    );
    camera.setPosition(new Vector3(0, 0, 20));
    camera.attachControl();
    const light = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      this.scene
    );
    light.intensity = 0.5;
    //3D Object
    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10 },
      this.scene
    );
    const sphereball = MeshBuilder.CreateSphere(
      "sphereball",
      { diameter: 1 },
      this.scene
    );
    sphereball.position = new Vector3(0, 1, 0);
    return scene;
  }
}

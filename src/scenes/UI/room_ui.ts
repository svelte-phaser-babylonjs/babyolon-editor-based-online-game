import { Scene } from "@babylonjs/core";
import UI from "./ui";

/**
 * This represents a script that is attached to a node in the editor.
 * Available nodes are:
 *      - Meshes
 *      - Lights
 *      - Cameras
 *      - Transform nodes
 * 
 * You can extend the desired class according to the node type.
 * Example:
 *      export default class MyMesh extends Mesh {
 *          public onUpdate(): void {
 *              this.rotation.y += 0.04;
 *          }
 *      }
 * The function "onInitialize" is called immediately after the constructor is called.
 * The functions "onStart" and "onUpdate" are called automatically.
 */
export default class RoomUI extends UI {
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    constructor(scene: Scene, layer: number) {
        super("room", scene, layer);

        this.initialze();
    }

    protected async initialze(): Promise<void> {
        await super.initialze();

        this.setupControls();
    }

    private setupControls() {
        this.getControl("StartGameButton").onPointerClickObservable.add(() => {
            this.emit('start-game');
        });
    }
}

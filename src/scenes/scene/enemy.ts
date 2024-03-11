import { Camera, Mesh, SceneLoader, Vector3 } from "@babylonjs/core";
import { Node } from "@babylonjs/core/node";

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
export default class Enemy extends Node {

    private mesh: Mesh;
    private target: Camera | Mesh;
    private direction: Vector3;
    private life: number = 100;
    private speed: number = 0.03;
    private canAttack: boolean;

    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    public constructor() { }

    public async initialize(position: Vector3): Promise<Enemy> {
        const loadedAsset = await SceneLoader.ImportMeshAsync(null, "./assets/meshes/enemy/", "Human.glb", this._scene);
        this.mesh = loadedAsset.meshes[0] as Mesh;
        this.mesh.position = position;
        this.mesh.checkCollisions = true;

        return this;
    }

    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        // ...
    }

    /**
     * Called on the node has been fully initialized and is ready.
     */
    public onInitialized(): void {
        // ...
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        // ...
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // ...
    }

    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    public onStop(): void {
        // ...
    }
}

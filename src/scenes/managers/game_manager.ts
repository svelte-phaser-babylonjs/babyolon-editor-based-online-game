import { Scene, Vector3 } from "@babylonjs/core";
import { Node } from "@babylonjs/core/node";
import Player from "../scene/player";
import Enemy from "../scene/enemy";

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
export default class GameManager extends Node {

    // GameManager Components
    private static instance: GameManager = null;
    private localPlayer: Player = null;
    private enemies: Map<string, Enemy> = null;

    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        this.enemies = new Map<string, Enemy>();
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

    public static get Instance(): GameManager {
        if (!GameManager.instance) {
            const inst = new GameManager();
            GameManager.instance = inst;
            return inst;
        }

        return GameManager.instance;
    }

    public async InitializeLocalGame() {
        const p = new Player();
        const e = new Enemy();

        await p.initialize(true)
        await e.initialize(new Vector3(-9, 2, 8));
    }
}

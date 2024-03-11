import { ArcRotateCamera, Camera, Vector3 } from "@babylonjs/core";
import { Node } from "@babylonjs/core/node";
import GeneralUI from "../UI/general_ui";

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
export default class UIManager extends Node {

    private _camera: Camera;
    private _uiLayer: number = 2;

    private _generalUI: GeneralUI;


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
        this.initializeUICamera();
        this.loadUI();
    }

    private initializeUICamera() {
        this._camera = new ArcRotateCamera("ui-cam", 0, 0.8, 100, Vector3.Zero(), this._scene);
        this._camera.layerMask = this._uiLayer;

        this._scene.activeCameras = [this._scene.activeCamera, this._camera];
    }

    private loadUI() {
        this.loadGeneralUI();
    }

    private loadGeneralUI() {
        this._generalUI = new GeneralUI(this._scene, this._uiLayer);
    }
}

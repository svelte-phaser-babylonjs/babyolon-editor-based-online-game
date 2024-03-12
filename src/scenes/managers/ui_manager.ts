import { ArcRotateCamera, Camera, Vector3 } from "@babylonjs/core";
import { Node } from "@babylonjs/core/node";
import GeneralUI from "../UI/general_ui";
import RoomUI from "../UI/room_ui";
import { delay } from "../../helpers";
import GameManager from "./game_manager";

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

    private camera: Camera;
    private layer: number = 2;

    private generalUI: GeneralUI;
    private roomUI: RoomUI;

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

    public onUpdate(): void {
    }

    private initializeUICamera() {
        this.camera = new ArcRotateCamera("ui-cam", 0, 0.8, 100, Vector3.Zero(), this._scene);
        this.camera.layerMask = this.layer;

        this._scene.activeCameras = [this._scene.activeCamera, this.camera];
    }

    private loadUI() {
        this.loadGeneralUI();
        this.loadRoomUI();
    }

    private loadGeneralUI() {
        this.generalUI = new GeneralUI(this._scene, this.layer);
        this.generalUI.addListener('create-join-room', this.callCreateJoinRoom);
    }

    private async loadRoomUI() {
        this.roomUI = new RoomUI(this._scene, this.layer);
        this.roomUI.addListener('start-game', this.callStartGame);

        while (!this.roomUI.loaded()) {
            await delay(100);
        }

        this.roomUI.setVisible(false);
    }

    private async callCreateJoinRoom() {
        this.generalUI.setVisible(false);
        this.roomUI.setVisible(true);
    }

    private async callStartGame() {
        this.roomUI.setVisible(false);

        this._scene.activeCamera = this._scene.getCameraByName("PlayerCamera");

        this.camera.dispose();

        GameManager.Instance.InitializeLocalGame(this._scene);
    }
}

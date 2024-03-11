import { Node } from "@babylonjs/core/node";
import MainMenuUI from "../UI/main_menu_ui";
import { Game } from "../..";

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
export default class MenuManager extends Node {

    private mainMenuUI: MainMenuUI;

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
        this.loadUI();
    }

    private loadUI() {
        this.mainMenuUI = new MainMenuUI(this._scene, this._scene.activeCamera.layerMask);

        this.mainMenuUI.addListener("load-multiplayer-game", this.callMultiplayerGame);
    }

    private async callMultiplayerGame() {
        if ("game" in window) {
            (window.game as Game).loadScene("scene");
        }
    }
}

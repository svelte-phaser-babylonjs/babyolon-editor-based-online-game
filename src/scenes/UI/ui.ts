import { Scene, Texture } from "@babylonjs/core";
import { AdvancedDynamicTexture, Control } from "@babylonjs/gui";
import EventEmitter = require("events");

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
export default class UI extends EventEmitter {

    protected scene: Scene;

    // UI Componts
    protected name: string;
    protected layer: number;
    protected texture: AdvancedDynamicTexture;
    protected root: Control | null = null;

    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor(name: string, scene: Scene, layer: number) {
        super();

        this.name = name;
        this.scene = scene;
        this.layer = layer;
    }

    protected async initialze() {
        this.texture = await this.loadGUI(this.name);
    }

    protected async loadGUI(name: string): Promise<AdvancedDynamicTexture> {
        try {
            let texture = AdvancedDynamicTexture.CreateFullscreenUI(`${name}-UI`, true, this.scene, Texture.TRILINEAR_SAMPLINGMODE, true);

            texture.layer.layerMask = this.layer;

            let path = `./assets/gui/${name}.gui`;

            await texture.parseFromURLAsync(path);

            this.root = texture.getControlByName('Root');

            return texture;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    public loaded(): boolean {
        return this.root !== null;
    }

    public getControl(name: string) {
        return this.texture.getControlByName(name);
    }

    public setVisible(visible: boolean) {
        if (!this.root) {
            console.warn(`no root defined in '${this.name}' gui`);
            return;
        };

        this.root.isVisible = visible;
    }
}

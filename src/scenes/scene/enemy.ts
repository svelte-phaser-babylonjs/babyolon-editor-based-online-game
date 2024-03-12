import { Camera, Mesh, Scene, SceneLoader, Vector3 } from "@babylonjs/core";
import { Node } from "@babylonjs/core/node";
import { delay } from "../../helpers";

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
    private life: number = 100;
    private speed: number = 0.03;
    private canAttack: boolean;

    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    public constructor() { }

    public async initialize(position: Vector3, scene: Scene) {
        this._scene = scene;
        const loadedAsset = SceneLoader.ImportMeshAsync(null, "./assets/meshes/enemy/", "Human.glb", this._scene);

        loadedAsset.then(asset => {
            this.mesh = asset.meshes[0] as Mesh;
            this.mesh.position = position;
            this.mesh.scaling = new Vector3(0.7, 0.7, 0.7);
            this.mesh.checkCollisions = true;

            if (asset.animationGroups && asset.animationGroups[0]) {
                asset.animationGroups[0].stop();
            }

            const walkAnim = asset.animationGroups[2];
            if (walkAnim) {
                walkAnim.start(true, 1.5, walkAnim.from, walkAnim.to, false);
            }
        });

        return this;
    }

    public updateMe() {
        if (!this.mesh || !this.life || this.life <= 0) return;
        this.determineTarget();
        this.updatePosition();
        this.updateRotation();
    }

    private determineTarget() {
        let distance = 1000;

        const checkTarget = (meshOrCam: any) => {
            const rawDir = meshOrCam.position.subtract(this.mesh.position);

            if (distance > rawDir.length()) {
                distance = rawDir.length();
                this.target = meshOrCam;
            }
        };

        this._scene.getCamerasByTags("player", checkTarget);
        this._scene.getMeshesByTags("player", checkTarget);
    }

    private updatePosition() {
        if (!this.target) return;

        const rawDir = this.target.position.subtract(this.mesh.position);
        const distance = rawDir.length();

        if (distance > 2) {
            const direction = rawDir.normalize().scaleInPlace(this.speed);
            this.mesh.moveWithCollisions(new Vector3(direction.x, 0, direction.z));
        }
    }

    private updateRotation() {
        if (!this.target) return;

        this.mesh.lookAt(this.target.position);
    }
}

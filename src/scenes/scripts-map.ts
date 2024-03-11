import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap {
	"src/scenes/managers/menu_manager.ts": ScriptMap;
	"src/scenes/scene/camera.ts": ScriptMap;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/managers/menu_manager.ts": require("./managers/menu_manager"),
	"src/scenes/scene/camera.ts": require("./scene/camera"),
}

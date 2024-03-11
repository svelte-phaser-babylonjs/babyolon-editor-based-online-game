import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap {
	"src/scenes/managers/menu_manager.ts": ScriptMap;
	"src/scenes/scene/camera.ts": ScriptMap;
	"src/scenes/UI/main_menu_ui.ts": ScriptMap;
	"src/scenes/UI/ui.ts": ScriptMap;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/managers/menu_manager.ts": require("./managers/menu_manager"),
	"src/scenes/scene/camera.ts": require("./scene/camera"),
	"src/scenes/UI/main_menu_ui.ts": require("./UI/main_menu_ui"),
	"src/scenes/UI/ui.ts": require("./UI/ui"),
}

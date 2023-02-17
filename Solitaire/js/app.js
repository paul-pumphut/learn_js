import { Game } from "./game.js";

window.onload = init;

function init() {
	// console.log('init app');
	Game.inst.initialize();
}
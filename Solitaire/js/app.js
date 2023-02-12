import { Game } from "./game.js";

window.onload = init;

function init() {
	console.log('init app');
	const game = new Game();
	game.start();
}
import { GameObject } from "./game_object.js";

export class Holder extends GameObject {


	#pile;
	#bg;

	constructor(initObj = null) {
		super();
		// console.log('Holder::ctor');

		this.#pile = [];

		this.view = document.createElement('div');
		this.view.classList.add('placeholder');


		if (initObj && initObj.showBg) {

			this.#bg = document.createElement('div');
			this.#bg.classList.add('bg');
			// this.#bg.classList.add('candidate');
			this.view.appendChild(this.#bg);
		}

		if (initObj && initObj.symbol) {

			const content = document.createElement('div');
			content.innerText = initObj.symbol;
			content.classList.add('content');
			this.view.appendChild(content);
		}

		document.body.appendChild(this.view);
	}

	addCards(cards) {
		if (Array.isArray(cards)) {
			this.pile.push(...cards);
		}
		else {
			this.pile.push(cards);
		}
	}

	getTopCard() {
		return this.#pile[this.#pile.length - 1];
	}

	get pile() {
		return this.#pile;
	}


}
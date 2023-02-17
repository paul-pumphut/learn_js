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

	highlightAsCandidate() {
		this.#bg.classList.add('candidate');
	}

	removeHighlight() {
		this.#bg.classList.remove('candidate');
	}

	addCards(cards) {
		if (Array.isArray(cards)) {
			for (let i = 0; i < cards.length; i++) {
				this.#pile.push(cards[i]);
				cards[i].holder = this;
			}
		}
		else {
			this.#pile.push(cards);
			cards.holder = this;
		}
	}

	removeCards(cards) {
		let list = null;
		if (Array.isArray(cards))
			list = cards;
		else
			list = [cards];

		for (let i = 0; i < list.length; i++) {
			const idx = this.#pile.indexOf(list[i]);
			if (idx != -1) {
				list[i].holder = null;
				this.#pile.splice(idx, 1);
			}
		}
	}

	openTopCard() {
		if (this.#pile.length == 0) return;
		this.#pile[this.#pile.length - 1].open();
	}

	getTopCard() {
		return this.#pile[this.#pile.length - 1];
	}

	isTopCard(card) {
		const topCard = this.#pile[this.#pile.length - 1];
		return card == topCard;
	}

	get pile() {
		return this.#pile;
	}


}
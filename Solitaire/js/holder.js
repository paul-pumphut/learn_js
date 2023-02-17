import { GameObject } from "./game_object.js";
import { Game } from "./game.js";

export class Holder extends GameObject {

	#isDeck;
	#isDiscard;
	#isAcePile;
	#pile;
	#bg;

	constructor(initObj = null) {
		super();
		// console.log('Holder::ctor');

		if (initObj && initObj.isDeck)
			this.#isDeck = true;

		if (initObj && initObj.isDiscard)
			this.#isDiscard = true;

		if (initObj && initObj.isAcePile)
			this.#isAcePile = true;

		this.#pile = [];

		this.view = document.createElement('div');
		this.view.classList.add('placeholder');

		if (this.#isDeck)
			this.view.addEventListener('click', (e) => this.onDeckClick(e));

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

	onDeckClick(e) {
		if (this.#pile.length > 0)
			return;

		if (Game.inst.discard.pile.length == 0)
			return;

		const discardPile = Game.inst.discard.pile;
		let i = discardPile.length;
		while (i--) {
			discardPile[i].moveCardToDeck();
		}
	}

	highlightAsCandidate() {
		this.#bg.classList.add('candidate');
	}

	removeHighlight() {
		this.#bg.classList.remove('candidate');
	}

	addCards(cards) {
		if (!cards) return;
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
		if (!cards) return;
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

	getSequenceFrom(card) {
		const idx = this.#pile.indexOf(card);
		const s = [];
		for (let i = idx + 1; i < this.#pile.length; i++) {
			s.push(this.#pile[i]);
		}
		return s;
	}

	getCardsNum() {
		return this.#pile.length;
	}

	getCardIndex(card) {
		return this.#pile.indexOf(card);
	}

	get pile() {
		return this.#pile;
	}

	get isDeck() {
		return this.#isDeck;
	}

	get isDiscard() {
		return this.#isDiscard;
	}

	get isAcePile() {
		return this.#isAcePile;
	}

}
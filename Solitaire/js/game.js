import { AppData } from "./app_data.js";
import { Card } from "./card.js";
import { Holder } from "./holder.js";

export class Game {

	static #inst;

	#deck;
	#discard;
	#lz;
	#stacks;

	#lzCandidates;

	constructor(seal) {
		if (!(seal instanceof SingletonSeal))
			throw new Error('Game cannot be instantiated!');
	}

	static get inst() {
		if (!Game.#inst)
			this.#inst = new Game(new SingletonSeal);
		return Game.#inst;
	}

	initialize() {
		console.log('Game::initialize');
		this.#deck = null;
		this.#discard = null;
		this.#lz = [];
		this.#stacks = [];

		this.#init();
		this.#start();
	}

	#init() {

		this.#deck = new Holder();
		this.#deck.x = AppData.FIELD_MARGIN;
		this.#deck.y = AppData.FIELD_MARGIN;

		this.#discard = new Holder({ showBg: true });
		this.#discard.x = this.#deck.x + this.#deck.width + AppData.PLACEHOLDERS_GAP;
		this.#discard.y = AppData.FIELD_MARGIN;

		for (let i = 0; i < AppData.LZ_NUMS; i++) {
			const aceHolder = new Holder({ showBg: true, symbol: 'A' });
			this.#lz.push(aceHolder);
		}

		for (let i = 0; i < AppData.COLUMN_NUMS; i++) {
			const stack = new Holder({ showBg: true, symbol: '+' });
			this.#stacks.push(stack);
		}

		window.addEventListener('resize', (e) => this.#resize(e));

		this.#resize();
	}

	#resize() {
		// console.log('window resize:', this);

		AppData.WINDOW_WIDTH = Math.max(AppData.WINDOW_MIN_WIDTH, window.innerWidth);
		// layout A-placeholders
		for (let i = 0; i < AppData.LZ_NUMS; i++) {
			const p = this.#lz[i];
			p.y = AppData.FIELD_MARGIN;
			p.x = AppData.WINDOW_WIDTH - AppData.FIELD_MARGIN - p.width * (i + 1) - AppData.PLACEHOLDERS_GAP * i;
		}

		// layout S-placeholders
		var gap = Math.min(Math.max(AppData.WINDOW_WIDTH - AppData.WINDOW_MIN_WIDTH, 0) / (AppData.COLUMN_NUMS - 1) + 15, 50);

		const filledSpace = AppData.CARD_SIZE.width * AppData.COLUMN_NUMS + gap * (AppData.COLUMN_NUMS - 1);
		const margin = (AppData.WINDOW_WIDTH - filledSpace) / 2;
		for (let i = 0; i < AppData.COLUMN_NUMS; i++) {
			const p = this.#stacks[i];
			p.x = margin + p.width * i + gap * i;
			p.y = AppData.FIELD_MARGIN + AppData.CARD_SIZE.height + AppData.PLACEHOLDERS_GAP * 2;
		}

		// TODO: resize for cards + flying cards
	}

	#start() {
		console.log('Game::start');
		this.#generateCards();
		// this.#shuffleCards();
		this.zsortCards();
		this.#drawCards();
	}

	#generateCards() {
		console.log('generateCards');
		const suits = [Card.SPADES, Card.CLUBS, Card.DIAMONDS, Card.HEARTS];
		for (let i = 0; i < suits.length; i++) {
			for (let t = 1; t <= 13; t++) {
				const card = new Card(suits[i], t);
				this.#deck.addCards(card);
				card.holder = this.#deck;
			}
		}
	}

	#shuffleCards() {
		for (let i = 0; i < this.#deck.pile.length * 2; i++) {
			const i0 = ~~(Math.random() * this.#deck.pile.length);
			const i1 = ~~(Math.random() * this.#deck.pile.length);
			[this.#deck.pile[i1], this.#deck.pile[i0]] = [this.#deck.pile[i0], this.#deck.pile[i1]];
		}
	}

	#drawCards() {
		console.log('placeCardsTo#deck');
		let shift = -10;
		for (let i = 0; i < this.#deck.pile.length; i++) {
			const card = this.#deck.pile[i];
			card.close();
			card.x = this.#deck.x + shift;
			card.y = this.#deck.y + shift;
			shift += 0.5;
		}

		let counter = this.#deck.pile.length;
		let delay = 0;
		let depth = -100;

		for (let i = 0; i < 7; i++) {
			for (let t = i; t < 7; t++) {
				const card = this.#deck.pile[--counter];
				this.#stacks[t].addCards(card);
				card.holder = this.#stacks[t];
				// delay += 0.051;
				delay += 0.001;
				depth++;
				const $depth = depth;
				const $isColumnEnd = t == i;
				const g = gsap.to(card,
					{
						x: this.#stacks[t].x, y: this.#stacks[t].y + AppData.COLUMN_GAP * i,
						duration: 0.5,
						delay: delay,
						onUpdate: () => { if (g.totalProgress() > 0.3) card.z = $depth; if (g.totalProgress() > 0.5 && $isColumnEnd) card.open(); },
						onComplete: () => { console.log(card.code, $depth) }
					});
			}
		}
		console.dir(this.#stacks);
	}

	zsortCards() {
		// sort #deck
		for (let i = 0; i < this.#deck.pile.length; i++) {
			const card = this.#deck.pile[i];
			card.z = i;
		}

		// sort pile

		// sort aces piles

		// sort #stacks
		for (let i = 0; i < this.#stacks.length; i++) {
			for (let t = 0; t < this.#stacks[i].pile.length; t++) {
				this.#stacks[i].pile[t].z = i * AppData.COLUMN_NUMS + t;
			}
		}
	}


	calculateCandidates(card) {
		this.#lzCandidates = [];
		// ask ace-holders
		for (let i = 0; i < this.#lz.length; i++) {
			const topCard = this.#lz[i].getTopCard();
		}

		// ask #stacks
	}

	acceptOrRejectCard(card) {
		card.returnCardBack();
	}
}


class SingletonSeal {

}
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

	#winPopup;

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
		// console.log('Game::initialize');

		this.#winPopup = document.querySelector('.win');
		this.#winPopup.parentElement.removeChild(this.#winPopup);

		this.#deck = null;
		this.#discard = null;
		this.#lz = [];
		this.#stacks = [];

		this.#init();
		this.#start();
	}

	#showGameWin() {
		this.#winPopup.innerHTML = '<h1>Вы победили!<br>Пасьянс сложился!</h1>'
		document.body.appendChild(this.#winPopup);
	}

	#init() {

		this.#deck = new Holder({ isDeck: true, symbol: '+' });
		this.#deck.x = AppData.FIELD_MARGIN;
		this.#deck.y = AppData.FIELD_MARGIN;

		this.#discard = new Holder({ isDiscard: true, showBg: true });
		this.#discard.x = this.#deck.x + this.#deck.width + AppData.PLACEHOLDERS_GAP;
		this.#discard.y = AppData.FIELD_MARGIN;

		for (let i = 0; i < AppData.LZ_NUMS; i++) {
			const aceHolder = new Holder({ isAcePile: true, showBg: true, symbol: 'A' });
			this.#lz.push(aceHolder);
		}

		for (let i = 0; i < AppData.COLUMN_NUMS; i++) {
			const stack = new Holder({ showBg: true, symbol: 'K' });
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

			for (let t = 0; t < this.#lz[i].pile.length; t++) {
				const card = this.#lz[i].pile[t];
				card.x = p.x;
				card.y = p.y;
			}
		}

		// layout S-placeholders
		var gap = Math.min(Math.max(AppData.WINDOW_WIDTH - AppData.WINDOW_MIN_WIDTH, 0) / (AppData.COLUMN_NUMS - 1) + 15, 50);

		const filledSpace = AppData.CARD_SIZE.width * AppData.COLUMN_NUMS + gap * (AppData.COLUMN_NUMS - 1);
		const margin = (AppData.WINDOW_WIDTH - filledSpace) / 2;
		for (let i = 0; i < AppData.COLUMN_NUMS; i++) {
			const p = this.#stacks[i];
			p.x = margin + p.width * i + gap * i;
			p.y = AppData.FIELD_MARGIN + AppData.CARD_SIZE.height + AppData.PLACEHOLDERS_GAP * 2;

			for (let t = 0; t < this.#stacks[i].pile.length; t++) {
				const card = this.#stacks[i].pile[t];
				card.x = p.x;
				card.y = p.y + AppData.COLUMN_GAP * t;
			}

		}



	}

	#start() {
		// console.log('Game::start');
		this.#generateCards();
		this.#shuffleCards();
		this.zsortCards();
		this.#drawCards();
	}

	#generateCards() {
		// console.log('generateCards');
		const suits = [Card.SPADES, Card.CLUBS, Card.DIAMONDS, Card.HEARTS];
		// const suits = [Card.SPADES, Card.HEARTS];
		for (let i = 0; i < suits.length; i++) {
			for (let t = 1; t <= 13; t++) {
				// for (let t = 1; t <= 4; t++) {
				const card = new Card(suits[i], t);
				this.#deck.addCards(card);
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
		// console.log('placeCardsTo#deck');
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
				// for (let i = 0; i < 3; i++) {
				// for (let t = i; t < 3; t++) {
				const card = this.#deck.pile[--counter];
				this.#deck.removeCards(card);
				this.#stacks[t].addCards(card);
				delay += 0.081;
				// delay += 0.001;
				depth++;
				const $depth = depth;
				const $isColumnEnd = t == i;
				const g = gsap.to(card,
					{
						x: this.#stacks[t].x, y: this.#stacks[t].y + AppData.COLUMN_GAP * i,
						duration: 0.5,
						delay: delay,
						onUpdate: () => { if (g.totalProgress() > 0.3) card.z = $depth; if (g.totalProgress() > 0.5 && $isColumnEnd) card.open(); },
						onComplete: () => {
							//console.log(card.code, $depth) 
						}
					});
			}
		}
		// console.dir(this.#stacks);
	}

	zsortCards() {
		// sort #deck
		for (let i = 0; i < this.#deck.pile.length; i++) {
			const card = this.#deck.pile[i];
			card.z = i;
		}

		// sort discard
		for (let i = 0; i < this.#discard.pile.length; i++) {
			const card = this.#discard.pile[i];
			card.z = i;
		}


		// sort aces piles
		for (let i = 0; i < this.#lz.length; i++) {
			for (let t = 0; t < this.#lz[i].pile.length; t++) {
				this.#lz[i].pile[t].z = i * this.#lz.length + t;
			}
		}

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

		if (!card.sequence) {
			// card with sequence cannot be placed on LZ
			for (let i = 0; i < this.#lz.length; i++) {
				let topCard = this.#lz[i].getTopCard();
				// console.log(topCard);
				if (!topCard && card.value == 1 || topCard && card.possibleCollectTo(topCard))
					this.#lzCandidates.push(this.#lz[i]);
			}
		}

		// ask #stacks
		for (let i = 0; i < this.#stacks.length; i++) {
			let topCard = this.#stacks[i].getTopCard();
			if (topCard && card.possibleLayDown(topCard)) {
				this.#lzCandidates.push(topCard);
			}
			else
				if (!topCard && card.value == 13) {
					this.#lzCandidates.push(this.#stacks[i]);
				}
		}

		// highlight
		for (let i = 0; i < this.#lzCandidates.length; i++) {
			this.#lzCandidates[i].highlightAsCandidate();
		}
	}

	acceptOrRejectCard(card) {
		// console.log('card POS:', card.x, card.y);
		// check card distance to candidate
		let zone = null;
		for (let i = 0; i < this.#lzCandidates.length; i++) {
			const candidate = this.#lzCandidates[i];
			const dx = candidate.x - card.x;
			const dy = candidate.y - card.y;
			if (Math.sqrt(dx * dx + dy * dy) < 80) {
				zone = candidate;
				break;
			}
		}

		if (zone) {
			let holder = null;
			if (zone instanceof Card)
				holder = zone.holder;
			else
				holder = zone;

			let currentHolder = card.holder;
			currentHolder.removeCards(card);
			currentHolder.removeCards(card.sequence);
			currentHolder.openTopCard();
			holder.addCards(card);
			holder.addCards(card.sequence);

		}
		card.returnCardToLZ();

		// remove highlight
		for (let i = 0; i < this.#lzCandidates.length; i++) {
			this.#lzCandidates[i].removeHighlight();
		}

		this.#checkGameEnd();

	}

	#checkGameEnd() {
		// console.log('--- END:', this.#deck.pile.length, this.#discard.pile.length, this.#stacks.reduce((acc, value) => value.pile.length + acc, 0))
		if (
			this.#deck.pile.length == 0 &&
			this.#discard.pile.length == 0 &&
			this.#stacks.reduce((acc, value) => value.pile.length + acc, 0) == 0
		) {
			this.#showGameWin();
		}
	}

	get deck() {
		return this.#deck;
	}

	get discard() {
		return this.#discard;
	}
}


class SingletonSeal {

}
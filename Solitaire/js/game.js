import { AppData } from "./app_data.js";
import { Card } from "./card.js";
import { Placeholder } from "./placeholder.js";

export class Game {

	constructor() {
		console.log('Game::ctor');

		this.placeholderDeck = null;
		this.placeholderPile = null;
		this.placeholderAces = [];
		this.placeholderStacks = [];
		this.stacks = [];
		this.deck = [];

		this.init();
	}


	init() {
		this.placeholderDeck = new Placeholder();
		this.placeholderDeck.x = AppData.FIELD_MARGIN;
		this.placeholderDeck.y = AppData.FIELD_MARGIN;

		this.placeholderPile = new Placeholder({ showBg: true });
		this.placeholderPile.x = this.placeholderDeck.x + this.placeholderDeck.width + AppData.PLACEHOLDERS_GAP;
		this.placeholderPile.y = AppData.FIELD_MARGIN;

		for (let i = 0; i < AppData.LZ_NUMS; i++) {
			const placeholderA = new Placeholder({ symbol: 'A' });
			this.placeholderAces.push(placeholderA);
		}

		for (let i = 0; i < AppData.COLUMN_NUMS; i++) {
			const placeholderStack = new Placeholder({ symbol: '+' });
			this.placeholderStacks.push(placeholderStack);
		}

		window.addEventListener('resize', (e) => this.resize(e));

		this.resize();
	}

	resize() {
		// console.log('window resize:', this);

		AppData.WINDOW_WIDTH = Math.max(AppData.WINDOW_MIN_WIDTH, window.innerWidth);
		// layout A-placeholders
		for (let i = 0; i < AppData.LZ_NUMS; i++) {
			const p = this.placeholderAces[i];
			p.y = AppData.FIELD_MARGIN;
			p.x = AppData.WINDOW_WIDTH - AppData.FIELD_MARGIN - p.width * (i + 1) - AppData.PLACEHOLDERS_GAP * i;
		}

		// layout S-placeholders
		var gap = Math.min(Math.max(AppData.WINDOW_WIDTH - AppData.WINDOW_MIN_WIDTH, 0) / (AppData.COLUMN_NUMS - 1) + 15, 50);

		const filledSpace = AppData.CARD_SIZE.width * AppData.COLUMN_NUMS + gap * (AppData.COLUMN_NUMS - 1);
		const margin = (AppData.WINDOW_WIDTH - filledSpace) / 2;
		for (let i = 0; i < AppData.COLUMN_NUMS; i++) {
			const p = this.placeholderStacks[i];
			p.x = margin + p.width * i + gap * i;
			p.y = AppData.FIELD_MARGIN + AppData.CARD_SIZE.height + AppData.PLACEHOLDERS_GAP * 2;
		}

		// TODO: resize for cards + flying cards
	}

	start() {
		console.log('Game::start');
		// this.debugCard();
		this.generateCards();
		this.placeCardsToDeck();
	}

	debugCard() {
		let card = new Card(Card.SPADES, 1);
		card.x += 10;
		card.y += 10;
		card = new Card(Card.SPADES, 2);
		card.x += 30;
		card.y += 30;
		card.z = 2;
		card = new Card(Card.SPADES, 3);
		card.x += 50;
		card.y += 50;
	}

	generateCards() {
		console.log('generateCards');
		const suits = [Card.SPADES, Card.CLUBS, Card.DIAMONDS, Card.HEARTS];
		// create
		for (let i = 0; i < suits.length; i++) {
			for (let t = 1; t <= 13; t++) {
				const card = new Card(suits[i], t);
				this.deck.push(card);
			}
		}

		// shuffle
		for (let i = 0; i < this.deck.length * 2; i++) {
			const i0 = ~~(Math.random() * this.deck.length);
			const i1 = ~~(Math.random() * this.deck.length);
			[this.deck[i1], this.deck[i0]] = [this.deck[i0], this.deck[i1]];
		}

		// zet correct z-order
		for (let i = 0; i < this.deck.length; i++) {
			const card = this.deck[i];
			card.z = i;
		}
	}

	placeCardsToDeck() {
		console.log('placeCardsToDeck');
		let shift = -10;
		for (let i = 0; i < this.deck.length; i++) {
			const card = this.deck[i];
			card.close();
			card.x = this.placeholderDeck.x + shift;
			card.y = this.placeholderDeck.y + shift;
			shift += 0.5;
		}

		this.stacks = new Array(AppData.COLUMN_NUMS).fill([]);
		let counter = this.deck.length;
		for (let i = 6; i >= 0; i--) {
			for (let t = 0; t < i + 1; t++) {
				const card = this.deck[--counter];
				card.open();
				this.stacks[i][t] = card;
				// gsap.to(card, { x: this.placeholderStacks[i].x, y: this.placeholderStacks[i].y + AppData.COLUMN_GAP * t, duration: 0.5 });
				card.x = this.placeholderStacks[i].x;
				card.y = this.placeholderStacks[i].y + AppData.COLUMN_GAP * t;
				card.z = t;
			}
		}

		// const card = this.deck[51];
		// gsap.to(card, { x: 600, y: 200, duration: 0.5 });
	}
}
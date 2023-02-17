import { AppData } from "./app_data.js";
import { Game } from "./game.js";
import { GameObject } from "./game_object.js";

export class Card extends GameObject {

	static SPADES = '♠';
	static CLUBS = '♣';
	static HEARTS = '♥';
	static DIAMONDS = '♦';

	#holder;
	#suit;
	#value;

	#isMD;

	constructor(suit, value) {
		super();
		// console.log('Card::ctor');
		this.#suit = suit;
		this.#value = value;

		this.view = document.createElement('div');
		this.view.classList.add('card');

		// this.view.classList.add('candidate');

		this.face = document.createElement('div');
		this.face.classList.add('face');

		this.face.classList.add(this.isRed ? 'cardred' : 'cardblack');

		this.face.innerHTML = `<div class="tl-corner">
								${this.code}
							</div>
							<div class="center_under">
								${this.#suit}
							</div>
							<div class="center ${this.#value == 10 ? 'center10' : 'center1'}">
								${this.name}
							</div>
							<div class="br-corner ${this.#value == 10 ? 'br-corner10' : 'br-corner1'}">
								${this.code}
							</div>`;

		this.back = document.createElement('div');
		this.back.classList.add('back');

		this.view.appendChild(this.face);
		this.view.appendChild(this.back);
		document.body.appendChild(this.view);

		this.x = 0;
		this.y = 0;

		this.startMovePos = { x: 0, y: 0 };

		this.$mm = null;
		this.$dmu = null;

		this.isOpened = false;

		// this.open();
		this.close();

		this.view.addEventListener('mouseup', (e) => this.onMU(e));
		this.view.addEventListener('mousedown', (e) => this.onMD(e));
	}

	onMD(e) {
		if (!this.possibleToInteractWith())
			return;

		if (this.isCardInDeck()) {
			this.moveCardToDiscard();
			return;
		}

		this.#isMD = true;

		this.z = 1000;
		const dx = e.clientX - this.x;
		const dy = e.clientY - this.y;
		this.startMovePos.x = dx;
		this.startMovePos.y = dy;
		this.$mm = (e) => this.onMM(e);
		this.$dmu = (e) => this.onMU(e);
		document.addEventListener('mousemove', this.$mm);
		document.addEventListener('mouseup', this.$dmu);

		Game.inst.calculateCandidates(this);
	}

	onMM(e) {
		let posx = e.clientX - this.startMovePos.x;
		let posy = e.clientY - this.startMovePos.y;
		this.x = posx;
		this.y = posy;
	}

	onMU(e) {
		if (!this.#isMD) return;

		this.#isMD = false;

		document.removeEventListener('mousemove', this.$mm);
		document.removeEventListener('mouseup', this.$dmu);
		Game.inst.acceptOrRejectCard(this);
	}

	possibleToInteractWith() {
		if (!this.isOpened) {
			if (this.isCardInDeck()) {
				return true;
			}
			return false;
		}

		if (!this.#holder.isTopCard(this))
			return false;

		return true;
	}

	isCardInDeck() {
		return this.#holder.isDeck;
	}

	open() {
		this.isOpened = true;
		this.face.style.display = 'block';
		this.back.style.display = 'none';
	}

	close() {
		this.isOpened = false;
		this.face.style.display = 'none';
		this.back.style.display = 'block';
	}

	highlightAsCandidate() {
		this.view.classList.add('candidate');
	}

	removeHighlight() {
		this.view.classList.remove('candidate');
	}


	returnCardToLZ() {
		// console.log("returnCardToLZ:", this.#holder.isDiscard);
		// console.dir(this.#holder);
		if (this.#holder.isDiscard || this.#holder.isAcePile) {
			gsap.to(this,
				{
					x: this.#holder.x, y: this.#holder.y,
					duration: 0.25,
					onComplete: () => Game.inst.zsortCards()
				});
		}
		else {
			gsap.to(this,
				{
					x: this.#holder.x, y: this.#holder.y + AppData.COLUMN_GAP * (this.#holder.pile.length - 1),
					duration: 0.25,
					onComplete: () => Game.inst.zsortCards()
				});
		}
	}

	moveCardToDiscard() {
		this.#holder.removeCards(this);
		Game.inst.discard.addCards(this);
		const g = gsap.to(this,
			{
				x: this.#holder.x, y: this.#holder.y,
				duration: 0.25,
				onUpdate: () => { if (g.totalProgress() > 0.5) this.z = this.#holder.getCardsNum(); this.open(); },
				onComplete: () => Game.inst.zsortCards()
			});
	}

	//------------------------- checks -------------------------
	possibleCollectTo(card) {
		console.log(this.#suit, card.suit, this.#value, card.value)
		return this.#suit == card.suit && this.#value == card.value + 1;
	}

	possibleLayDown(card) {
		return this.isOpened && card.isOpened && (this.isRed && !card.isRed || !this.isRed && card.isRed) && this.#value == card.value - 1;
	}

	//--------------------------------------- g/s -------------------------------------------------
	get isRed() {
		return this.#suit == Card.HEARTS || this.#suit == Card.DIAMONDS;
	}

	get value() {
		return this.#value;
	}

	get suit() {
		return this.#suit;
	}

	get name() {
		switch (this.#value) {
			case 1:
				return 'A';
			case 11:
				return 'J';
			case 12:
				return 'Q';
			case 13:
				return 'K';
			default:
				return `${this.#value}`;
		}
	}

	get code() {
		return this.#suit + this.name;
	}

	set holder(value) {
		this.#holder = value;
	}

	get holder() {
		return this.#holder;
	}

}
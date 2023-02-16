import { GameObject } from "./game_object.js";

export class Card extends GameObject {

	static SPADES = '♠';
	static CLUBS = '♣';
	static HEARTS = '♥';
	static DIAMONDS = '♦';

	constructor(suit, value) {
		super();
		// console.log('Card::ctor');
		this.suit = suit;
		this.value = value;

		this.view = document.createElement('div');
		this.view.classList.add('card');

		this.face = document.createElement('div');
		this.face.classList.add('face');

		this.face.classList.add(this.isRed() ? 'cardred' : 'cardblack');

		this.face.innerHTML = `<div class="tl-corner">
								${this.code}
							</div>
							<div class="center_under">
								${this.suit}
							</div>
							<div class="center ${this.value == 10 ? 'center10' : 'center1'}">
								${this.name}
							</div>
							<div class="br-corner ${this.value == 10 ? 'br-corner10' : 'br-corner1'}">
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
		this.mm = null;

		this.isOpened = false;

		// this.open();
		this.close();

		this.view.addEventListener('mouseup', (e) => this.onMU(e));
		this.view.addEventListener('mousedown', (e) => this.onMD(e));
	}

	onMD(e) {
		const dx = e.clientX - this.x;
		const dy = e.clientY - this.y;
		this.startMovePos.x = dx;
		this.startMovePos.y = dy;
		this.mm = (e) => this.onMM(e);
		document.addEventListener('mousemove', this.mm);
	}

	onMM(e) {
		let posx = e.clientX - this.startMovePos.x;
		let posy = e.clientY - this.startMovePos.y;
		this.x = posx;
		this.y = posy;
	}

	onMU(e) {
		document.removeEventListener('mousemove', this.mm);
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

	isRed() {
		return this.suit == Card.HEARTS || this.suit == Card.DIAMONDS;
	}

	get name() {
		switch (this.value) {
			case 1:
				return 'A';
			case 11:
				return 'J';
			case 12:
				return 'Q';
			case 13:
				return 'K';
			default:
				return `${this.value}`;
		}
	}

	get code() {
		return this.suit + this.name;
	}

}
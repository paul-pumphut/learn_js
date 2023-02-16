import { AppData } from "./app_data.js";
import { GameObject } from "./game_object.js";
import { HolderModel } from "./holder_model.js";

export class Holder extends GameObject {


	#model;

	constructor(initObj = null) {
		super();
		// console.log('Holder::ctor');

		this.#model = new HolderModel();

		this.view = document.createElement('div');
		this.view.classList.add('placeholder');

		if (initObj && initObj.showBg) {

			const bg = document.createElement('div');
			bg.classList.add('bg');
			this.view.appendChild(bg);
		}

		if (initObj && initObj.symbol) {

			const content = document.createElement('div');
			content.innerText = initObj.symbol;
			content.classList.add('content');
			this.view.appendChild(content);
		}

		document.body.appendChild(this.view);
	}


	get pile() {
		return this.#model.pile;
	}


}
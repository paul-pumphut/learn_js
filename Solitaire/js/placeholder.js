import { AppData } from "./app_data.js";
import { GameObject } from "./game_object.js";

export class Placeholder extends GameObject {
	constructor(initObj = null) {
		super();
		// console.log('Placeholder::ctor');

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


}
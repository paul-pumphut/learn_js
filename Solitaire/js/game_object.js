import { AppData } from "./app_data.js";

export class GameObject {

	get x() {
		return parseInt(this.view.style.left);
	}

	set x(value) {
		this.view.style.left = value + 'px';
	}

	get y() {
		return parseInt(this.view.style.top);
	}

	set y(value) {
		this.view.style.top = value + 'px';
	}

	set z(value) {
		this.view.style.zIndex = value;
	}

	get z() {
		return this.view.style.zIndex;
	}

	get width() {
		return AppData.CARD_SIZE.width;
	}

	get height() {
		return AppData.CARD_SIZE.height;
	}
}
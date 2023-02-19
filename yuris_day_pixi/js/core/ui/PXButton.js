import { PXDisplayObject } from "./PXDisplayObject.js";
import { AlignUtil } from "../util/align_util.js";

export class PXButton extends PXDisplayObject {

	constructor(initObj) {
		super(initObj);
		this._isOver = false;
		this._overFilter = new PIXI.ColorMatrixFilter();
		this._overFilter.brightness(1.1);
	}

	createChildren() {
		if (!this._initObj.normalState)
			throw new Error('No normal state for button was defined');

		this._normalState = new PIXI.Sprite(this._initObj.normalState);
		this.addChild(this._normalState);

		this._tfLabel = new PIXI.Text(this._initObj.label ?? '', {
			fontFamily: this._initObj.style.font ?? "Arial",
			fontSize: this._initObj.style.size ?? 10,
			fontWeight: this._initObj.style.weight ?? 'normal',
			align: 'center',
			fill: this._initObj.style.color ?? 0xff0000
		});
		this.addChild(this._tfLabel);
		AlignUtil.center(this._normalState, this._tfLabel);

		AlignUtil.centerPivot(this);

		this.interactive = true;
		this.cursor = 'pointer';

		this.on('pointerover', this.onOver);
		this.on('pointerout', this.onOut);
		this.on('pointerup', this._initObj.click);


	}

	onOver(e) {
		if (this._isOver)
			return;
		this._isOver = true;
		this.scale.x = 1.05;
		this.scale.y = 1.05;
		this.filters = [this._overFilter];
	}

	onOut(e) {
		if (!this._isOver)
			return;
		this._isOver = false;
		this.scale.x = 1.0;
		this.scale.y = 1.0;
		this.filters = null;

	}

	get width() {
		return this._normalState.width ?? 0;
	}

	get height() {
		return this._normalState.height ?? 0;
	}
}
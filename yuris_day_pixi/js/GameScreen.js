import { AC } from "./app_const.js";
import { PXDisplayObject } from "./core/ui/PXDisplayObject.js";
import { AlignUtil } from "./core/util/align_util.js";

export class GameScreen extends PXDisplayObject {


	constructor(initObj) {
		super(initObj);
	}

	createChildren() {

		this._bg = new PIXI.Sprite(AC.TXXC[AC.txxGameMenuBg]);
		this.addChild(this._bg);
		AlignUtil.fit(AC.app.view, this._bg);


		this._map = new PIXI.Sprite(this._initObj.mapTexture);
		this.addChild(this._map);
		this._map.x = 100;
		this._map.y = 100;


		this.interactive = true;
		this
			.on('pointerdown', (e) => this.onPointerDown(e))
			.on('pointerup', (e) => this.onPointerUp(e))
			.on('pointerupoutside', (e) => this.onPointerUp(e))
			.on('pointermove', (e) => this.onPointerMove(e))
			.on('wheel', (e) => this.onPointerWheel(e))

	}

	onPointerDown(e) {
		// console.log('pointerdown:', e.client);
		this.pointerdata = e.client;
		this._startMDoffset = this._map.toLocal(e.client);
	}

	onPointerUp(e) {
		// console.log('pointerup:', e.client);
		this.pointerdata = null;
		this._startMDoffset = null;
	}

	onPointerMove(e) {
		if (!this.pointerdata)
			return;
		this._map.x = this.pointerdata.x - this._startMDoffset.x * this.mapScale;
		this._map.y = this.pointerdata.y - this._startMDoffset.y * this.mapScale;
		// AC.app.ticker.add(() => { AC.app.ticker.stop(); setTimeout(() => { AC.app.ticker.start() }, 5); }, -300);
	}

	onPointerWheel(e) {
		// console.log('WH!', e.deltaY);
		const deltaScale = e.deltaY / 10000;
		this.mapScale = this.mapScale + deltaScale;
	}

	get mapScale() {
		return this._map.scale.x;
	}

	set mapScale(value) {
		this._map.scale.x = value;
		this._map.scale.y = value;

	}
}
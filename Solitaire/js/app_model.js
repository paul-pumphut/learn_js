export class AppModel {

	static #inst;

	constructor(seal) {
		if (!(seal instanceof SingletonSeal))
			throw new Error('AppModel cannot be instantiated!');
	}

	static get inst() {
		if (!AppModel.#inst)
			this.#inst = new AppModel(new SingletonSeal);
		return AppModel.#inst;
	}

	initialize() {
		console.log('AppModel::initialize');
	}
}

class SingletonSeal {

}
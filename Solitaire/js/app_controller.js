export class AppController {

	static #inst;

	constructor(seal) {
		if (!(seal instanceof SingletonSeal))
			throw new Error('AppController cannot be instantiated!');
	}

	static get inst() {
		if (!AppController.#inst)
			this.#inst = new AppController(new SingletonSeal);
		return AppController.#inst;
	}

	initialize() {
		console.log('AppController::initialize');
	}
}

class SingletonSeal {

}
export class SingletonA {

	static #inst;

	constructor(seal) {
		if (!(seal instanceof SingletonSeal))
			throw new Error('SingletonA cannot be instantiated!');
	}

	static get inst() {
		if (!SingletonA.#inst)
			this.#inst = new SingletonA(new SingletonSeal);
		return SingletonA.#inst;
	}

	initialize() {
		console.log('SingletonA::initialize');
	}
}

class SingletonSeal {

}
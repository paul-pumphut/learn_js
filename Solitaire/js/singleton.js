export class Singleton {

	static #inst;

	constructor() {
		if (Singleton.#inst) throw new Error('Singleton cannot be instantiated!');
		Singleton.#inst = this;
		return { valueOf: () => null };
	}

	static get inst() {
		if (!Singleton.#inst)
			new Singleton();
		return Singleton.#inst;
	}

	initialize() {
		console.log('Singleton::initialize');
	}
}
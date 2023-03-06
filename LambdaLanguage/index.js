class InputStream {

	constructor(input) {
		this.input = input;
		this.cursor = 0;
		this.line = 1;
		this.column = 0;
	}

	err(msg) {
		throw new Error(`${msg} [ in Ln:${this.line} Col:${this.column}]`);
	}

	peek() {
		return this.input.charAt(this.cursor);
	}

	eof() {
		return this.peek() == '';
	}

	next() {
		const ch = this.input.charAt(this.cursor++);
		if (ch == '\n') {
			this.line++;
			this.column = 0;
		}
		else
			this.column++;
		return ch;
	}

}

class TokenStream {

	static #keywords = ' if then else lambda true false λ';

	constructor(input) {
		this.current = null;
	}

	err(msg) {
		return input.err(msg);
	}

	peek() {
		return this.current ?? (this.current = this.#readNext());
	}

	eof() {
		return this.peek() == null;
	}

	next() {
		const token = this.current;
		this.current = null;
		return token ?? this.#readNext();
	}

	#readNext() {

	}






}



const data = `
	sum = lambda(a, b) {
		a + b;
  	};
  	print(sum(1, 2));
`;

const tokenizer = new TokenStream(new InputStream(data));
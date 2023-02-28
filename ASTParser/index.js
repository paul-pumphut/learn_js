class Tokenizer {

	static #ops = ['+', '-', '/', '*'];

	constructor() {

	}


	build(str) {
		const tokens = [];
		str = str.trim();
		let token = '';
		for (let i = 0; i < str.length; i++) {
			token += str[i];
			token = token.trim();
			const peek = str[i + 1];
			if (this.isNum(token) && !this.isNum(peek)) {
				tokens.push({ type: 'NUM', value: token });
				token = '';
			}
			if (this.isOp(token) && !this.isOp(peek)) {
				tokens.push({ type: 'OP', value: token });
				token = '';
			}
			if (token == '(' || token == ')') {
				tokens.push({ type: token == '(' ? 'LPAR' : 'RPAR', value: token });
				token = '';
			}
			if (token == ';' || token == '\n') {
				tokens.push({ type: 'EOL' });
			}
			if (i == str.length - 1) {
				tokens.push({ type: 'EOF' });
			}
		}

		return tokens;

	}

	isNum(value) {
		return !isNaN(parseFloat(value));
	}

	isOp(value) {
		return Tokenizer.#ops.includes(value);
	}
}



const str = '1 + 2 - (3+4)';


const asts = new Tokenizer().build(str);


console.log(asts);



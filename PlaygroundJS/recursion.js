console.log('========== Hello Node! =============');


// math power calculation by recursion
/*
function pow(n, m) {

	if (n == 0)
		return 0;
	if (m == 1)
		return n;
	if (m == 0)
		return 1;

	return n * pow(n, m - 1);
}


// const result = pow(0, 20);
// const result = pow(100, 0);
// const result = pow(2, 3);
// const result = pow(2, 64);

console.log(result);
*/

// calculate salary sim for all employee
/*
let company = {
	sales: [{
		name: 'John',
		salary: 1000
	}, {
		name: 'Alice',
		salary: 600
	}],

	development: {
		sites: [{
			name: 'Peter',
			salary: 2000
		}, {
			name: 'Alex',
			salary: 1800
		}],

		internals: [{
			name: 'Jack',
			salary: 1300
		}]
	}
};

function calcSalary(obj) {
	if (obj.salary) {
		return obj.salary;
	}
	else {
		let summ = 0;
		for (let o of Object.values(obj)) {
			summ += calcSalary(o);
		}
		return summ;
	}
}

const result = calcSalary(company);
console.log(result);
*/

// calculate sum
/*
function calcSum(n) {
	if (n == 1)
		return 1;
	return n + calcSum(n - 1);
}

const result = calcSum(100);
console.log(result);
*/
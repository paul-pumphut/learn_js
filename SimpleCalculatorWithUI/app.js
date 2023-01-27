'use strict'

const filterSequence = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'Backspace'];

let firstField;
let secondField;
let resultField;
let cmbOperation;
let calcButton;

const op = (a, b, opCode) => {
	switch (opCode) {
		case '+': return a + b;
		case '-': return a - b;
		case '*': return a * b;
		case '/': return a / b;
	}
};

function init() {
	console.log('init');

	firstField = document.getElementById('firstField');
	secondField = document.getElementById('secondField');
	resultField = document.getElementById('resultField');
	cmbOperation = document.getElementById('cmbOperation');
	calcButton = document.querySelector('.calculator__inputs button');

	firstField.addEventListener('focus', onInputFocus);
	secondField.addEventListener('focus', onInputFocus);
	firstField.addEventListener('keydown', filterOnlyNumbers);
	secondField.addEventListener('keydown', filterOnlyNumbers);

	calcButton.addEventListener('click', calculate);

	firstField.value = 0;
	secondField.value = 0;
	resultField.value = 0;
}

function onInputFocus(e) {
	console.log(e);
	e.target.setSelectionRange(0, 10);
}

function filterOnlyNumbers(e) {
	console.log(e.key);
	if (
		!filterSequence.includes(e.key) || // не пропускаем кроме заданных в массиве
		e.target.value.indexOf('.') != -1 && e.key == '.' // проверяем что еще не была введена точка
	) {
		e.preventDefault();
		return;
	}
}

function calculate() {
	resultField.value = op(+firstField.value, +secondField.value, cmbOperation.value);
}


window.onload = init;
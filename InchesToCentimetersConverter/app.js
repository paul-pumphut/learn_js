let field1;
let field2;
let focusedField;
let isInchesFirst = true;



function init() {
	console.log("init");
	field1 = document.querySelector('.field1');
	field2 = document.querySelector('.field2');
	field1.addEventListener('focus', onFieldFocused);
	field2.addEventListener('focus', onFieldFocused);
	field1.addEventListener('input', onFieldChange);
	field2.addEventListener('input', onFieldChange);
}

function onSwapClick() {
	console.log("swap!");
	isInchesFirst = !isInchesFirst;
	updateFields();
}

function updateFields() {
	if (isInchesFirst) {
		field1.placeholder = 'Inches';
		field2.placeholder = 'Centimeters';
	}
	else {
		field1.placeholder = 'Centimeters';
		field2.placeholder = 'Inches';
	}
	field1.value = '';
	field2.value = ''
}

function onFieldFocused(e) {
	console.log("FF:", e.currentTarget);
	focusedField = e.currentTarget;
}

function onFieldChange(e) {
	console.log("FC", e.currentTarget);
	if (e.currentTarget == focusedField) {
		if (isInchesFirst && e.currentTarget == field1) {
			field2.value = +field1.value * 2.54;
		}
		if (!isInchesFirst && e.currentTarget == field2) {
			field1.value = +field2.value * 2.54;
		}

		if (isInchesFirst && e.currentTarget == field2) {
			field1.value = (+field2.value / 2.54).toFixed(4);
		}
		if (!isInchesFirst && e.currentTarget == field1) {
			field2.value = (+field1.value / 2.54).toFixed(4);
		}

	}
}



window.onload = init;
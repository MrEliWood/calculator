var output = document.querySelector('#output');
var keys = document.querySelectorAll('button');

var currentNumber = '0';
var equation = '';

function updateDisplay() {
	output.textContent = currentNumber;
}

function clear() {
	currentNumber = '0';
	equation = '';
	updateDisplay();
}

function calculate() {
	equation += currentNumber;

	var total = eval(equation);

	if (isNaN(total)) {
		output.textContent = 'ERROR';
		currentNumber = '0';
		equation = '';
		return;
	}

	currentNumber = total;
	updateDisplay();

	currentNumber = '0';
	equation = '';
}

function handleAction(action) {
	if (action === 'ac') {
		clear();
		return;
	}

	if (action === '=') {
		calculate();
		return;
	}

	equation += currentNumber + action;
	currentNumber = '0';
}

function handleDecimal() {
	if (currentNumber.includes('.')) {
		return;
	}

	currentNumber += '.';
	updateDisplay();
}

function handleNumberClick(keyClicked) {
	if (currentNumber === '0') {
		currentNumber = '';
	}

	currentNumber += keyClicked;
	updateDisplay();
}

function handleKeyClick(event) {
	var action = event.target.dataset.action;
	var keyClicked = event.target.id;

	if (action) {
		handleAction(action);
		return;
	}

	if (keyClicked === '.') {
		handleDecimal();
		return;
	}

	handleNumberClick(keyClicked);
}

function listenForKeyClicks() {
	for (var index = 0; index < keys.length; index++) {
		var key = keys[index];

		key.addEventListener('click', handleKeyClick);
	}
}

listenForKeyClicks();

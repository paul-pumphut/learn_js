
let btnAddTask;
let taskInput;
let tasksContainer;


function init() {
	tasksContainer = document.querySelector('.wrapper ul');


	btnAddTask = document.querySelector('.add_task');
	btnAddTask.addEventListener('click', onAddTaskClick);

	taskInput = document.querySelector('.wrapper input');
	taskInput.addEventListener('focus', onTaskInputFocus);
	taskInput.addEventListener('blur', onTaskInputBlur);
}

function onTaskInputFocus(e) {
	console.log('focusd');
	taskInput.addEventListener('keyup', onTaskInputKU);
}

function onTaskInputBlur(e) {
	console.log('bluerd');
	taskInput.removeEventListener('keyup', onTaskInputKU);
}

function onTaskInputKU(e) {
	if (e.key == 'Enter') {
		e.preventDefault();
		document.activeElement.blur();
		addTask(taskInput.value);
	}
}

function onAddTaskClick(e) {
	taskInput.value = '';
	taskInput.style.borderWidth = '3px';
	taskInput.style.height = '50px';
	taskInput.focus();
}

function addTask(value) {
	console.log('add task:', value);
	taskInput.style.borderWidth = '0px';
	taskInput.style.height = '0px';

	const elem = document.createElement('li');
	elem.innerHTML = `${value}`;
	tasksContainer.appendChild(elem);

	const btn = document.createElement('button');
	btn.innerHTML = `<img src="./icons8-trash-can.svg">`;
	btn.classList.add('trash_btn');
	elem.appendChild(btn);
	btn.addEventListener('click', removeTask);
}

function removeTask(e) {
	const btn = e.target.parentNode;
	btn.removeEventListener('click', removeTask);
	tasksContainer.removeChild(btn.parentNode);
}


window.onload = init;
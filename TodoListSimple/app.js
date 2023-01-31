
let btnAddTask;
let taskInput;
let tasksContainer;
let tasks;


function init() {

	tasksContainer = document.querySelector('.wrapper ul');

	btnAddTask = document.querySelector('.add_task');
	btnAddTask.addEventListener('click', onAddTaskClick);

	taskInput = document.querySelector('.wrapper input');
	taskInput.addEventListener('focus', onTaskInputFocus);
	taskInput.addEventListener('blur', onTaskInputBlur);

	restoreSavedTasks();

}

function restoreSavedTasks() {
	tasks = localStorage.getItem('pp_todo') ?? '[]';
	tasks = JSON.parse(tasks);
	tasks.forEach(t => addTask(t, false));
}

function onTaskInputFocus(e) {
	taskInput.addEventListener('keyup', onTaskInputKU);
}

function onTaskInputBlur(e) {
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

function addTask(value, saveTask = true) {
	console.log('add task:', value);

	if (saveTask) {
		tasks.push(value);
		localStorage.setItem('pp_todo', JSON.stringify(tasks));
	}

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
	const li = btn.parentNode;
	tasks = tasks.filter(todo => todo != li.innerText);
	localStorage.setItem('pp_todo', JSON.stringify(tasks));
	btn.removeEventListener('click', removeTask);
	tasksContainer.removeChild(li);
}


window.onload = init;
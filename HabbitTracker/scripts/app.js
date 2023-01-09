'use strict'


const HABBIT_KEY = 'HABBIT_KEY';
let habbits = [];
let globalActiveHabbitId;

const page = {
	menu: document.querySelector('.menu__list'),
	header: {
		h1: document.querySelector('.h1'),
		progressPercent: document.querySelector('.progress__percent'),
		progressCoverBar: document.querySelector('.progress__cover-bar'),
	},
	content: {
		daysContainer: document.querySelector('.days'),
		nextDay: document.querySelector('.habbit__day'),
	},
	popup: {
		cover: document.querySelector('.cover'),
		iconField: document.querySelector('.popup__form input[name="icon"]'),
	}

};


function loadData() {
	const habbitsString = localStorage.getItem(HABBIT_KEY);
	const habbitArray = JSON.parse(habbitsString);
	if (Array.isArray(habbitArray))
		habbits = habbitArray;
}

function saveData() {
	localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits));
}

function renderHead(activeHabbit) {
	page.header.h1.innerText = activeHabbit.name;
	const progress = Math.min(activeHabbit.days.length / activeHabbit.target * 100, 100);
	page.header.progressPercent.innerText = progress.toFixed(0) + '%';
	page.header.progressCoverBar.style.width = progress.toFixed(0) + '%';
}

function renderMenu(activeHabbit) {
	for (const habbit of habbits) {
		let element = document.querySelector(`[menu-habbit-id="${habbit.id}"]`);
		if (!element) {
			element = document.createElement('button');
			element.addEventListener('click', () => rerender(habbit.id));
			element.setAttribute('menu-habbit-id', habbit.id);
			element.classList.add('menu__item');
			element.innerHTML = `<img src="./images/${habbit.icon}.svg" alt="${habbit.name}">`;
			page.menu.appendChild(element);
		}
		if (activeHabbit.id === habbit.id) {
			element.classList.add('menu__item_active');
		}
		else {
			element.classList.remove('menu__item_active');
		}
	}
}

function renderContent(activeHabbit) {
	page.content.daysContainer.innerHTML = '';
	for (const index in activeHabbit.days) {
		const element = document.createElement('div');
		element.classList.add('habbit');
		element.innerHTML = `<div class="habbit__day">День ${+index + 1}</div>
						<div class="habbit__comment">${activeHabbit.days[index].comment}</div>
						<button class="habbit__delete" onclick="deleteDay(${index})">
							<img src="./images/delete.svg" alt="Удалить день ${+index + 1}">
						</button>`
		page.content.daysContainer.appendChild(element);
	}
	page.content.nextDay.innerHTML = `День ${activeHabbit.days.length + 1}`;
}

function rerender(activeHabbitId) {
	globalActiveHabbitId = activeHabbitId;
	const activeHabbit = habbits.find(habbit => habbit.id === activeHabbitId);
	if (!activeHabbit)
		return;

	document.location.replace(document.location.pathname + "#" + globalActiveHabbitId);

	renderHead(activeHabbit);
	renderMenu(activeHabbit);
	renderContent(activeHabbit);
}

function addHabbit(event) {
	event.preventDefault();
	const data = validateAndGetFormData(event.target, ['name', 'icon', 'target']);
	if (!data) {
		return;
	}
	const maxId = habbits.reduce((acc, habbit) => acc > habbit.id ? acc : habbit.id, 0);
	habbits.push({
		id: maxId + 1,
		name: data.name,
		target: data.target,
		icon: data.icon,
		days: []
	});
	resetForm(event.target, ['name', 'target']);
	togglePopup();
	saveData();
	rerender(maxId + 1);
}

function resetForm(form, fields) {
	for (const field of fields) {
		form[field].value = '';
	}
}

function validateAndGetFormData(form, fields) {
	const formData = new FormData(form);
	const res = {};
	for (const field of fields) {
		const fieldValue = formData.get(field);
		form[field].classList.remove('error');
		if (!fieldValue) {
			form[field].classList.add('error');
		}
		res[field] = fieldValue;
	}
	let isValid = true;
	for (const field of fields) {
		if (!res[field]) {
			isValid = false;
		}
	}
	if (!isValid) {
		return;
	}
	return res;
}


function addDay(event) {
	event.preventDefault();
	const data = validateAndGetFormData(event.target, ['comment']);
	if (!data) {
		return;
	}
	habbits = habbits.map(habbit => {
		if (habbit.id === globalActiveHabbitId) {
			return {
				...habbit,
				days: habbit.days.concat([{ comment: data.comment }])
			}
		}
		return habbit;
	});
	resetForm(event.target, ['comment']);
	rerender(globalActiveHabbitId);
	saveData();
}

function deleteDay(index) {
	habbits = habbits.map(habbit => {
		if (habbit.id == globalActiveHabbitId) {
			habbit.days.splice(index, 1);
			return {
				...habbit,
				days: habbit.days
			}
		}
		return habbit;
	});
	rerender(globalActiveHabbitId);
	saveData();

}


function togglePopup() {
	if (page.popup.cover.classList.contains('cover_hidden'))
		page.popup.cover.classList.remove('cover_hidden');
	else
		page.popup.cover.classList.add('cover_hidden');
}


function setIcon(context, icon) {
	page.popup.iconField.value = icon;
	const activeIcon = document.querySelector('.icon.icon_active');
	activeIcon.classList.remove('icon_active');
	context.classList.add('icon_active');
}


(() => {
	loadData();
	const hashId = document.location.hash.replace('#', '');
	const urlHabbitId = habbits.find(habbit => habbit.id == hashId);
	if (urlHabbitId)
		rerender(urlHabbitId.id)
	else
		rerender(habbits[0].id);
})();

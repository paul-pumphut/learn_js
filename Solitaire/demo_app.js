const init = () => {
	console.log('init');

	const canvas = document.querySelector('.canvas');
	const card = document.querySelector('.card');
	card.style.left = '200px';
	card.style.top = '200px';


	const CARD_SIZE = { width: 130, height: 200 };
	const startMovePos = { x: 0, y: 0 };

	const onResize = (e) => {
		console.log('resize')
	}

	window.addEventListener('resize', onResize);


	const onMD = (e) => {
		console.log("MD:", e);
		startMovePos.x = e.offsetX;
		startMovePos.y = e.offsetY;
		document.addEventListener('mousemove', onMM);
		document.addEventListener('mouseup', onMU);
		console.dir(document);
		console.dir(window);
	}

	const onMU = (e) => {
		console.log("MU:", e);
		document.removeEventListener('mousemove', onMM);
		document.removeEventListener('mouseup', onMU);
	}

	const onMM = (e) => {
		let newPosX = e.clientX - startMovePos.x;
		let newPosY = e.clientY - startMovePos.y;
		if (newPosX < 0)
			newPosX = 0;
		if (newPosY < 0)
			newPosY = 0;
		if (newPosX + CARD_SIZE.width > window.innerWidth)
			newPosX = window.innerWidth - CARD_SIZE.width;
		if (newPosY + CARD_SIZE.height > window.innerHeight)
			newPosY = window.innerHeight - CARD_SIZE.height;

		card.style.left = newPosX + 'px';
		card.style.top = newPosY + 'px';

	}

	card.addEventListener('mousedown', onMD);
	card.addEventListener('mouseup', onMU);

}

window.onload = init;
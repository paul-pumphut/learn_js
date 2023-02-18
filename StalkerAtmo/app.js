const musicList = [
	'music/ambient1.mp3',
	'music/ambient2.mp3',
	'music/ambient3.mp3',
	'music/ambient4.mp3',
	'music/ambient17.mp3',
	'music/ambient_c.mp3',
	'music/ambient_w.mp3',
	// 'music/argo.mp3',
	// 'music/pil.mp3',
]

const soundList = [
	'sound/crickets_1.ogg',
	'sound/crickets_2.ogg',
	'sound/crickets_3.ogg',
	'sound/crow1.ogg',
	'sound/crow2.ogg',
	'sound/crow3.ogg',
	'sound/owl_1.ogg',
	'sound/owl_2.ogg',
	'sound/owl_3.ogg',
	// 'sound/rnd_bird1.ogg',
	// 'sound/rnd_bird2.ogg',
	// 'sound/rnd_bird3.ogg',
	// 'sound/rnd_bird4.ogg',
	'sound/rnd_boar.ogg',
	'sound/rnd_boar1.ogg',
	'sound/rnd_boar2.ogg',
	'sound/rnd_boar3.ogg',
	'sound/rnd_cat1.ogg',
	'sound/rnd_cat2.ogg',
	'sound/rnd_dark0.ogg',
	'sound/rnd_dark1.ogg',
	'sound/rnd_dark2.ogg',
	'sound/rnd_dark3.ogg',
	'sound/rnd_dark4.ogg',
	'sound/rnd_dark5.ogg',
	'sound/rnd_dark6.ogg',
	'sound/rnd_dark7.ogg',
	'sound/rnd_dark8.ogg',
	'sound/rnd_dark9.ogg',
	'sound/rnd_dark10.ogg',
	'sound/rnd_dark.ogg',
	'sound/rnd_dark.ogg',
	'sound/rnd_darkwind1.ogg',
	'sound/rnd_darkwind2.ogg',
	'sound/rnd_darkwind3.ogg',
	'sound/rnd_darkwind4.ogg',
	'sound/rnd_darkwind5.ogg',
	'sound/rnd_darkwind6.ogg',
	'sound/rnd_dog.ogg',
	'sound/rnd_dog1.ogg',
	'sound/rnd_dog2.ogg',
	'sound/rnd_dog3.ogg',
	'sound/rnd_drone1.ogg',
	'sound/rnd_drone2.ogg',
	'sound/rnd_fly.ogg',
	'sound/rnd_fly1.ogg',
	'sound/rnd_fly2.ogg',
	'sound/rnd_fly3.ogg',
	'sound/rnd_helicopter.ogg',
	'sound/rnd_horror.ogg',
	'sound/rnd_horror1.ogg',
	'sound/rnd_howling_1.ogg',
	'sound/rnd_howling_2.ogg',
	'sound/rnd_krik1.ogg',
	'sound/rnd_krik2.ogg',
	'sound/rnd_krik3.ogg',
	'sound/rnd_krik4.ogg',
	'sound/rnd_krik5.ogg',
	'sound/rnd_krik6.ogg',
	'sound/rnd_krik7.ogg',
	'sound/rnd_krik8.ogg',
	'sound/rnd_krik9.ogg',
	'sound/rnd_moan.ogg',
	'sound/rnd_moan1.ogg',
	'sound/rnd_moan2.ogg',
	'sound/rnd_moan3.ogg',
	'sound/rnd_moan4.ogg',
	'sound/rnd_moan5.ogg',
	'sound/rnd_moan6.ogg',
	'sound/rnd_obval.ogg',
	'sound/rnd_pdog.ogg',
	'sound/rnd_pdog1.ogg',
	'sound/rnd_pdog2.ogg',
	'sound/rnd_pdog3.ogg',
	'sound/rnd_rock1.ogg',
	'sound/rnd_rock2.ogg',
	'sound/rnd_rock3.ogg',
	'sound/rnd_rock4.ogg',
	'sound/rnd_shooting_1.ogg',
	'sound/rnd_shooting_2.ogg',
	'sound/rnd_shooting_3.ogg',
	'sound/rnd_shooting_4.ogg',
	'sound/rnd_shooting_5.ogg',
	'sound/rnd_shooting_6.ogg',
	'sound/rnd_shooting_7.ogg',
	'sound/rnd_shooting_8.ogg',
	'sound/rnd_shooting_9.ogg',
	'sound/rnd_shooting_10.ogg',
	'sound/rnd_swamp.ogg',
	'sound/rnd_wind_1.ogg',
	'sound/rnd_wind_2.ogg',
	'sound/rnd_wind_3.ogg',
	'sound/rnd_wind_tree.ogg',
	'sound/rnd_wolfhowl01.ogg',
	'sound/rnd_wolfhowl02.ogg',
]

const GLOBAL_VOLUME = 0.3;

let currentMusic = null;

const generateMusic = (immediately = false) => {

	const MUSIC_GENERATION_DELAY = 40;
	const MUSIC_PROBABILITY = 0.2;

	console.log('---generateMusic--- ');
	if (immediately || Math.random() < MUSIC_PROBABILITY) {
		const s = musicList[~~(Math.random() * musicList.length)];
		const snd = sounds[s];
		console.log('	music:', s);
		if (snd == currentMusic) {
			console.log('	...continue to play current music');
			setTimeout(generateMusic, MUSIC_GENERATION_DELAY * 1000);
			return;
		}

		if (currentMusic) {
			currentMusic.fadeOut(30);
			currentMusic.loop = false;
			const $currentMusic = currentMusic;
			setTimeout(() => {
				$currentMusic.pause();
			}, 30 * 1000);
		}
		snd.loop = true;
		// snd.volume = 0.3 * GLOBAL_VOLUME;
		snd.volume = 0;
		snd.playFrom(Math.random() * (snd.buffer.duration * 0.5))
		snd.fade(0.3 * GLOBAL_VOLUME, 30);
		currentMusic = snd;
	}

	setTimeout(generateMusic, MUSIC_GENERATION_DELAY * 1000);
}

const generateSound = () => {
	const SOUND_GENERATION_DELAY = 3;
	const SOUND_PROBABILITY = 0.2;

	// console.log('---generateSound---');

	if (Math.random() < SOUND_PROBABILITY) {
		const s = soundList[~~(Math.random() * soundList.length)];
		// const s = soundList[1];
		// console.log('	new sound:', s);
		const snd = sounds[s];
		snd.volume = (Math.random() * 0.5 + 0.05) * GLOBAL_VOLUME;
		snd.pan = Math.sign(Math.random() - 0.5) * (Math.random() * 0.5 + 0.5);
		snd.play();
	}

	setTimeout(generateSound, SOUND_GENERATION_DELAY * 1000);
}


const initSoundPlayer = () => {
	console.log('initSoundPlayer');



	document.querySelector('button').style.display = 'none';
	const p = document.querySelector('p');
	p.style.display = 'block';

	const audioCtx = new AudioContext();
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}

	console.log('init');

	sounds.load(musicList.concat(soundList));
	// sounds.load(soundList);

	sounds.onProgress = function (progress, res) {
		console.log('loading progress: ' + progress.toFixed(1) + '%');
		p.innerText = 'загрузка...' + progress.toFixed(1) + '%';
	};

	sounds.whenLoaded = () => {
		p.style.display = 'none';
		document.querySelector('.spectr').style.display = 'block';
		generateMusic(true);
		generateSound();
	};
}

const init = () => {
	console.log('init');
	document.querySelector('p').style.display = 'none';
	document.querySelector('.spectr').style.display = 'none';
}


window.onload = init;
import { AlignUtil } from "./core/util/align_util.js";
import { PXButton } from "./core/ui/PXButton.js";
import { GameScreen } from "./GameScreen.js";
import { AC } from "./app_const.js";


///////////////////// variables //////////////////////////
AC.init();

let app;

let spriteMenuGameTitle1;
let spriteMenuGameTitle2;
let spriteMenuGameBg;
let loadingText;

let btnStartGame;
let btnRulesGame;
let btnHistoryGame;

let gameScreen;


////////////////////  INIT & START /////////////////////////
gsap.registerPlugin(PixiPlugin);
window.onload = () => initApp();


//--------------------------------------- methods ------------------------------------------
function initApp() {
	console.log(`%c ${AC.GAME_NAME} v.${AC.VERSION}`, 'background: black; color: #00ff00; font-weight:normal;font-size:10px');

	app = new PIXI.Application({
		width: 600,
		height: 800,
		backgroundColor: 0x2f2f2f,
		antialias: false,
		transparent: false,
		resolution: 1
	});
	document.body.appendChild(app.view);

	AC.app = app;

	startAssetsLoading();
}

function startAssetsLoading() {

	loadingText = new PIXI.Text('', {
		fontFamily: 'Arial',
		fontSize: 16,
		fontWeight: 'bold',
		fill: 0xa30303,
		align: 'center',
	});
	app.stage.addChild(loadingText);

	function updateLoadingText(text) {
		loadingText.text = text;
		AlignUtil.center(app.view, loadingText, { x: 0, y: 100 });
	}

	updateLoadingText('загрузка начальных ассетов...');

	PIXI.Assets.load([AC.txxGameTitle1, AC.txxGameTitle2],
		progress => console.log("loading loader assets:", progress))
		.then(result => {
			spriteMenuGameTitle1 = new PIXI.Sprite(AC.TXXC[AC.txxGameTitle1]);
			app.stage.addChild(spriteMenuGameTitle1);

			spriteMenuGameTitle2 = new PIXI.Sprite(AC.TXXC[AC.txxGameTitle2]);
			app.stage.addChild(spriteMenuGameTitle2);

			AlignUtil.center(app.view, spriteMenuGameTitle1, { y: -100 });
			AlignUtil.center(app.view, spriteMenuGameTitle2);
			AlignUtil.centerPivot(spriteMenuGameTitle1);
			gsap.to(spriteMenuGameTitle1, { pixi: { scale: 1.1 }, duration: 1, yoyo: true, repeat: -1 });
		})
		.then(result => {
			updateLoadingText('загрузка шрифтов...');
			PIXI.Assets.addBundle(
				'fonts',
				{
					'RuslanDisplay': './fonts/RuslanDisplay.ttf'
				}
			);
			return PIXI.Assets.loadBundle('fonts',
				progress => console.log("loading fonts:", progress));
		})
		.then(result => {
			updateLoadingText('загрузка атласов...');
			return PIXI.Assets.load([
				AC.BASE_IMAGES_PATH + 'common.png',
				AC.BASE_IMAGES_PATH + 'common.json'],
				progress => console.log("loading common atlas:", progress));
		})
		.then(result => {
			updateLoadingText('загрузка карты...');
			return PIXI.Assets.load([
				AC.txxGameMenuBg,
				AC.txxMap,
				AC.txxMapLegend],
				progress => console.log("loading map assets:", progress));
		})
		.then(result => {
			loadingText.removeFromParent();
			gsap.killTweensOf([spriteMenuGameTitle1]);
			return showMenuScreen();
		});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
function showMenuScreen() {

	// startGame();
	// return;

	spriteMenuGameBg = new PIXI.Sprite(AC.TXXC[AC.txxGameMenuBg]);
	app.stage.addChildAt(spriteMenuGameBg, 0);
	AlignUtil.fit(app.view, spriteMenuGameBg);

	gsap.to(spriteMenuGameTitle1, { y: spriteMenuGameTitle1.y - 100, duration: 1 });
	gsap.to(spriteMenuGameTitle2, { y: spriteMenuGameTitle2.y - 100, duration: 1 });


	const startOffsetY = 20;

	btnStartGame = new PXButton({
		click: startGame,
		normalState: AC.TXXC['mainmenu_button.png'],
		label: "СТАРТ",
		style: {
			font: "RuslanDisplay",
			size: 40,
			color: 0x551111,
		}
	});
	app.stage.addChild(btnStartGame);
	AlignUtil.center(app.view, btnStartGame, { y: startOffsetY });
	btnStartGame.alpha = 0;
	gsap.to(btnStartGame, { y: btnStartGame.y - 10, alpha: 1, duration: 1 });

	btnRulesGame = new PXButton({
		click: startGame,
		normalState: AC.TXXC['mainmenu_button.png'],
		label: "ПРАВИЛА",
		style: {
			font: "RuslanDisplay",
			size: 40,
			color: 0x551111,
		}
	});
	app.stage.addChild(btnRulesGame);
	AlignUtil.center(app.view, btnRulesGame, { y: startOffsetY + 100 });
	btnRulesGame.alpha = 0;
	gsap.to(btnRulesGame, { y: btnRulesGame.y - 10, alpha: 1, duration: 1, delay: 0.15 });

	btnHistoryGame = new PXButton({
		click: startGame,
		normalState: AC.TXXC['mainmenu_button.png'],
		label: "ИСТОРИЯ ИГРЫ",
		style: {
			font: "RuslanDisplay",
			size: 28,
			color: 0x551111,
		}
	});
	app.stage.addChild(btnHistoryGame);
	AlignUtil.center(app.view, btnHistoryGame, { y: startOffsetY + 200 });
	btnHistoryGame.alpha = 0;
	gsap.to(btnHistoryGame, { y: btnHistoryGame.y - 10, alpha: 1, duration: 1, delay: 0.15 + 0.15 });

}

function hideMenuScreen() {
	btnStartGame.visible = false;
	btnRulesGame.visible = false;
	btnHistoryGame.visible = false;

	spriteMenuGameTitle1.visible = false;
	spriteMenuGameTitle2.visible = false;
	spriteMenuGameBg.visible = false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

function startGame() {
	console.log('=== START GAME ===');
	hideMenuScreen();
	gameScreen = new GameScreen({
		mapTexture: AC.TXXC[AC.txxMap],
		mapLegend: AC.TXXC[AC.txxMapLegend]
	});
	app.stage.addChild(gameScreen);
}





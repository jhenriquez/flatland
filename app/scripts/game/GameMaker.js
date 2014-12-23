define(['game/GameStorage', 'game/Game'], function (storage, Game) {
	function GameMaker(storage) {

		function validateCanvasElement (canvas) {
			if (!canvas || canvas.tagName !== 'CANVAS') {
				throw new Error('Invalid canvas element provided.');
			}
		}

		this.getCurrentPlayer = function () {
			return storage.getCurrentPlayer();
		};

		this.getScore = function () {
			return storage.getScore();
		};

		this.createGame = function (settings) {
			settings = settings || {};
			validateCanvasElement(settings.canvas);

			var game = {
				canvas: settings.canvas,
				width: settings.width || 0,
				height: settings.height || 0
			};

			return new Game(game);
		};
	}

	GameMaker.prototype = Object.create(GameMaker.prototype);
	GameMaker.constructor = GameMaker;

	return new GameMaker(storage);
});
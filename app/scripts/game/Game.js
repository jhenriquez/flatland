define([
	'game/GameStorage',
	'game/Block'], function (storage, Block) {

	function Game(opts) {
		var internalState = {};

		var gameDefaults = {
			pause: false,
			score: 0,
			settings: {
				speed: 10,
			}
		};

		var snake = {
			body: [],
			direction: 0
		};

		var step = function () {
		};

		this.setDirection = function (direction) {
		};

		this.changeSpeed = function (speed) {
		};

		this.environmentChanged = function (newEnvironment) {
			internalState.canvas.width = newEnvironment.width;
			internalState.canvas.height = newEnvironment.height;
		};

		(function () {
			var tmp = _.extend(gameDefaults,opts);
			internalState.canvas = tmp.canvas;
			internalState.canvas.width = tmp.width;
			internalState.canvas.height = tmp.height;
		})();
	}

	Game.prototype = Object.create(Game.prototype);
	Game.constructor = Game;

	return Game;
});
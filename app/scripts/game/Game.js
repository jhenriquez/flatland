define([
	'game/GameStorage',
	'game/Block'], function (storage, Block) {

	function Game(opts) {
		var internalState = {};

		var step = function () {
		};

		this.getCanvas = function () {
			return internalState.canvas;
		};

		this.getDirection = function () {
			return internalState.snake.direction;
		};

		this.setDirection = function (direction) {
			internalState.snake.direction = direction;
		};

		this.getSpeed = function (speed) {
			return internalState.speed;
		};

		this.pauseToggle = function () {
			internalState.pause = !internalState.pause;
		};

		this.isPaused = function () {
			return internalState.pause;
		};

		this.environmentChanged = function (newEnvironment) {
			internalState.canvas.width = newEnvironment.width;
			internalState.canvas.height = newEnvironment.height;
		};

		(function () {
			internalState = _.extend({
				pause: false,
				score: 0,
				speed: 10,
				snake: {
					body: [],
					direction: 0
				}
			});
			internalState.canvas = opts.canvas;
			internalState.canvas.width = opts.width || 0;
			internalState.canvas.height = opts.height || 0;
		})();
	}

	Game.prototype = Object.create(Game.prototype);
	Game.constructor = Game;

	return Game;
});
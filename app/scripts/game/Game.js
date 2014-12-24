define(['game/GameStorage'], function (storage) {

	function Game(opts) {
		var internalState = {};
		var x = 0, y = 0;
		var context;

		var animate = function () {
			context.clearRect(x-15,y,15,15);

			if (x >= internalState.canvas.width) {
				x = 0;
			}

			context.fillRect(x,y,15,15);

			x += 15;

			setTimeout(function () { 
				if (!internalState.pause) {
					requestAnimationFrame(animate);
				}
			}, 800);
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

		this.start = function () {
			requestAnimationFrame(animate);
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
			context = internalState.canvas.getContext('2d');
		})();
	}

	Game.prototype = Object.create(Game.prototype);
	Game.constructor = Game;

	return Game;
});
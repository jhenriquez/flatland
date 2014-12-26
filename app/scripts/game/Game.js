define(['game/GameStorage', 'game/Block'], function (storage, Block) {

	function Game(opts) {
		var state = {};
		var context;

		var createHead = function () {
			var currentHead = state.snake.getHead();
			var newHead = new Block(currentHead.x, currentHead.y, currentHead.size, currentHead.context);

			switch(state.snake.direction){
				case 0: // left
					newHead.x -= state.metrics.size;
					break;
				case 1: // up
					newHead.y -= state.metrics.size;
					break;
				case 2: // right
					newHead.x += state.metrics.size;
					break;
				case 3: // down
					newHead.y += state.metrics.size;
					break;
			}
			return newHead;
		};

		var animate = function () {
			state.snake.body.push(createHead());
			state.snake.getHead().draw();
			
			// Handle Collisions or Food

			state.snake.body.shift().clear();

			setTimeout(function () { 
				if (!state.pause) {
					requestAnimationFrame(animate);
				} // else Handle Pause.
			}, 500);
		};

		this.getCanvas = function () {
			return state.canvas;
		};

		this.getDirection = function () {
			return state.snake.direction;
		};

		this.setDirection = function (direction) {
			if (direction >= 0 && direction <= 3) {
				state.snake.direction = direction;
			}
		};

		this.getSpeed = function (speed) {
			return state.metrics.speed;
		};

		this.pauseToggle = function () {
			state.pause = !state.pause;
		};

		this.isPaused = function () {
			return state.pause;
		};

		this.environmentChanged = function (newEnvironment) {
			state.canvas.width = newEnvironment.width;
			state.canvas.height = newEnvironment.height;
		};

		this.start = function () {
			this.setDirection(2);

			for(var i = 0; i < 3; i++) {
				var block = state.snake.body.length === 0 ? 
						new Block(0,0,state.metrics.size,context) :
						new Block(state.snake.body[0].x-state.metrics.size,state.snake.body[0].y-state.metrics.size,state.metrics.size,context);
				state.snake.body.unshift(block);
			}

			requestAnimationFrame(animate);
		};

		(function () {
			state = {
				pause: false,
				score: 0,
				metrics: {
					size: 15,
					speed: 10
				},
				snake: {
					body: [],
					direction: 0,
					getHead: function () {
						return this.body[this.body.length-1];
					}
				}
			};
			state.canvas = opts.canvas;
			state.canvas.width = opts.width || 0;
			state.canvas.height = opts.height || 0;
			context = state.canvas.getContext('2d');
		})();
	}

	Game.prototype = Object.create(Game.prototype);
	Game.constructor = Game;

	return Game;
});
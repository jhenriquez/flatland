define(['game/GameStorage', 'game/Block'], function (storage, Block) {
	function Game(opts) {
		var state = {
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
		state.canvas.width = adjustedSize(opts.width);
		state.canvas.height = adjustedSize(opts.height);

		var context = state.canvas.getContext('2d');

		function adjustedSize (messure) {
			messure = messure || 0;
			messure -= messure % state.metrics.size;
			return messure;
		}

		function createHead () {
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
		}

		function animate () {
			state.snake.body.push(createHead());
			state.snake.getHead().draw();
			
			// Handle Collisions or Food

			state.snake.body.shift().clear();

			setTimeout(function () { 
				if (state.pause) {
					// Handle Pause
				} else {
					requestAnimationFrame(animate);
				}
			}, state.metrics.speed * 30);
		}

		this.getCanvas = function () {
			return state.canvas;
		};

		this.getDirection = function () {
			return state.snake.direction;
		};

		this.setDirection = function (direction) {
			var opposedDirection = { 0:2, 1:3, 2:0, 3:1 };
			if (/[0123]/.test(direction) && direction != opposedDirection[state.snake.direction]) {
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
			state.canvas.width = adjustedSize(newEnvironment.width);
			state.canvas.height = adjustedSize(newEnvironment.height);
		};

		this.start = function () {
			state.snake.direction = 2;

			state.snake.body = Array.apply(null, new Array(3)).map(function () {
				return new Block(0,0,state.metrics.size, context);
			}).map(function (v, i) {
				v.x = v.x - state.metrics.size;
				return v;
			});

			state.snake.body.reverse();

			requestAnimationFrame(animate);
		};
	}

	Game.prototype = Object.create(Game.prototype);
	Game.constructor = Game;

	return Game;
});
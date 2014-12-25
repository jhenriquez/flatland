define(['game/GameStorage'], function (storage) {

	function Game(opts) {
		var internalState = {};
		var x = 0, y = 0;
		var context;
		var pBlock;
		var block = {
				x: 0,
				y: 0,
				size: 15,

				clear: function () {
					context.clearRect(this.x,this.y,this.size,this.size);
				},

				draw: function () {
					context.fillRect(this.x,this.y,this.size,this.size);
				}
			};

		var animate = function () {
			if(pBlock) {
				pBlock.clear();
			}

			if (block.x  >= internalState.canvas.width) {
				block.x = 0;
			} else if (block.x < 0) {
				block.x = internalState.canvas.width;
			}

			if (block.y  >= internalState.canvas.height) {
				block.y = 0;
			} else if (block.y < 0) {
				internal.snake.direction = 1;
			}

			block.draw();
			pBlock = _.clone(block);

			switch(internalState.snake.direction){
				case 0: // left
					block.x -= block.size;
					break;
				case 1: // up
					block.y -= block.size;
					break;
				case 2: // right
					block.x += block.size;
					break;
				case 3: // down
					block.y += block.size;
					break;
			}

			setTimeout(function () { 
				if (!internalState.pause) {
					requestAnimationFrame(animate);
				}
			}, 500);
		};

		this.getCanvas = function () {
			return internalState.canvas;
		};

		this.getDirection = function () {
			return internalState.snake.direction;
		};

		this.setDirection = function (direction) {
			console.log(direction);
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
			this.setDirection(2);
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
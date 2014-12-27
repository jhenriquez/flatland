define(['game/GameStorage', 'game/Block'], function (storage, Block) {
	function Game(opts) {
		var state = {
			pause: false,
			score: 0,
			metrics: {
				size: 10,
				speed: 10
			},
			food: [],
			snake: {
				body: [],
				direction: 0,
				directionCache: 0
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
			var h = _.last(state.snake.body);
			var newHead = new Block(h.x, h.y, h.size, h.context);

			switch(state.snake.direction){
				case 0: 
					newHead.x -= state.metrics.size;
					break;
				case 1: 
					newHead.y -= state.metrics.size;
					break;
				case 2: 
					newHead.x += state.metrics.size;
					break;
				case 3: 
					newHead.y += state.metrics.size;
					break;
			}
			return newHead;
		}

		function within (n, s, e) {
			return n >= s && n <= e;
		}

		function collides(h) {
			return _.where(state.snake.body, {x: h.x, y: h.y}).length > 1 || 
					(h.x < 0 || h.x > state.canvas.width) || (h.y < 0 || h.y > state.canvas.height);
		}

		function checkfood(h) {
			return _.where(state.food, {x: h.x, y: h.y}).shift();
		}

		function generateRandomPieceOfFood() {
			var x, y, all = _.union(state.food, state.snake.body);
			do {
				x = _.random(state.canvas.width-state.metrics.size);
				y = _.random(state.canvas.height-state.metrics.size);
				x -= x % state.metrics.size;
				y -= y % state.metrics.size;
			} while(_.where(all, {x: x, y: y}).length > 0);

			return new Block(x, y, state.metrics.size, context);
		}

		function animate () {
			var head = createHead();
			state.snake.body.push(head);
			head.draw();
			state.snake.directionCache = state.snake.direction;

			if (collides(head)) {
				state.pause = true;
			}

			var food = checkfood(head);

			if (food) {
				state.food = _.without(state.food, food);
				state.food.push(generateRandomPieceOfFood().draw());
				state.metrics.speed--;
			} else {
				state.snake.body.shift().clear();
			}

			setTimeout(function () { 
				if (state.pause) {
					// Handle Pause
				} else {
					requestAnimationFrame(animate);
				}
			}, state.metrics.speed * 15);
		}

		this.getCanvas = function () {
			return state.canvas;
		};

		this.getDirection = function () {
			return state.snake.direction;
		};

		this.setDirection = function (direction) {
			var opposedDirection = { 0:2, 1:3, 2:0, 3:1 };
			if (/[0123]/.test(direction) && direction != opposedDirection[state.snake.directionCache]) {
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

			_.times(5, function () {
				state.food.push(generateRandomPieceOfFood().draw());
			});

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
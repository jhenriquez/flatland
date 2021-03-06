define(['game/GameStorage', 'game/Block'], function (storage, Block) {
	function Game(opts) {
		var state;
		var context;
		var onGameOverCallback;
		var onScoreCallback;
		var animationFrame;

		function setInitialState() {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
				animationFrame = undefined;
			}
			state = {
				pause: false,
				over: false,
				score: 0,
				metrics: {
					size: 10,
					speed: 200
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
			context = state.canvas.getContext('2d');
		}

		setInitialState();

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

		function collides(h) {
			return _.where(state.snake.body, {x: h.x, y: h.y}).length > 1 || 
					(h.x < 0 || h.x > state.canvas.width) || (h.y < 0 || h.y > state.canvas.height);
		}

		function checkfood(h) {
			return _.where(state.food, {x: h.x, y: h.y}).shift();
		}

		function generateRandomPieceOfFood(food) {
			var x, y, all = _.union(state.food, state.snake.body);
			do {
				x = _.random(state.canvas.width-state.metrics.size);
				y = _.random(state.canvas.height-state.metrics.size);
				x -= x % state.metrics.size;
				y -= y % state.metrics.size;
			} while(_.where(all, {x: x, y: y}).length > 0);

			if (food) {
				food.x = x;
				food.y = y;
				return food;
			} else {
				return new Block(x, y, state.metrics.size, context);
			}
		}

		function score() {
			state.score += 10;
			storage.setScore(state.score);
			if (onScoreCallback) { onScoreCallback(state.score); }
		}

		function gameOver(notify) {
			state.over = true;
			var scores = storage.getHighScores();
			var minScore = _.min(scores, function (hs) { return hs.score; }).score || 0;
			var isHighScore = state.score > minScore;
			if (isHighScore) {
				storage.saveHighScore(storage.getCurrentPlayer(), state.score);
			}
			if (onGameOverCallback && notify) { onGameOverCallback({ highScore: isHighScore }); }
		}

		function animate () {
			if (!state.pause) {
				var head = createHead();
				state.snake.body.push(head);
				head.draw();
				state.snake.directionCache = state.snake.direction;

				if (collides(head)) {
					return gameOver(true);
				}

				var food = checkfood(head);

				if (food) {
					state.food = _.without(state.food, food);
					state.food.push(generateRandomPieceOfFood().draw());
					state.metrics.speed -= state.metrics.speed > 150 ? 5 : 0;
					score();
				} else {
					state.snake.body.shift().clear();
				}

			} else {
				_.each(state.snake.body, function (b) {
					b.clear();
				});

				setTimeout(function () {
					_.each(state.snake.body, function (b) {
						b.draw();
					});
				}, 500);
			}

			setTimeout(function () {
				if (!state.over) {
					animationFrame = requestAnimationFrame(animate);
				}
			}, state.metrics.speed);
		}

		this.getCanvas = function () {
			return state.canvas;
		};

		this.getDirection = function () {
			return state.snake.direction;
		};

		this.setDirection = function (direction) {
			var opposedDirection = { 0:2, 1:3, 2:0, 3:1 };
			direction = Math.abs(direction);
			if (/^[0123]$/.test(direction) && direction != opposedDirection[state.snake.directionCache]) {
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
			opts.width = newEnvironment.width;
			opts.height = newEnvironment.height;

			_.each(state.food, function (food) {
				generateRandomPieceOfFood(food).draw();
			});
		};

		this.start = function () {
			setInitialState();
			state.snake.direction = 2;
			storage.setScore(0);
			onScoreCallback(0);

			state.snake.body = Array.apply(null, new Array(3)).map(function () {
				return new Block(0,0,state.metrics.size, context);
			}).map(function (v, i) {
				v.x = v.x - state.metrics.size;
				return v;
			});

			state.snake.body.reverse();

			_.times(5, function () {
				state.food.push(generateRandomPieceOfFood().draw());
			});

			if (!animationFrame) {
				animationFrame = requestAnimationFrame(animate);
			}
		};

		this.restart = function () {
			var self = this;
			gameOver(false);
			setTimeout(function () {
				self.start();
			}, 1500);
		};

		this.onScore = function (f) {
			if (f && typeof f === 'function') {
				onScoreCallback = f;
			}
		};

		this.onGameOver = function (f) {
			if (f && typeof f === 'function') {
				onGameOverCallback = f;
			}
		};
	}

	Game.prototype = Object.create(Game.prototype);
	Game.constructor = Game;

	return Game;
});
requirejs(['../rjsConfig',], function () {
	requirejs(['game/GameMaker'], function (gameMaster) {
		function initializeCanvasContainer() {
			$('#canvas-container').height((70 / 100) * $(window).height());
		}

		function updateStats() {
			$('#player').html(gameMaster.getCurrentPlayer());
			$('#score').html(gameMaster.getScore());
		}

		$(window).resize(initializeCanvasContainer);

		$(window).resize(function () {
			game.environmentChanged({
				width: $('#canvas-container').width(),
				height: $('#canvas-container').height()
			});
		});

		$(window).keydown(function (e) {
			if (e.which === 32) {
				game.pauseToggle();
			}

			game.setDirection(e.which-37);
		});

		$('#left').click(function (e) {
			game.setDirection(0);
		});

		$('#right').click(function (e) {
			game.setDirection(2);
		});

		$('#up').click(function (e) {
			game.setDirection(1);
		});

		$('#down').click(function (e) {
			game.setDirection(3);
		});

		initializeCanvasContainer();
		updateStats();

		var game = gameMaster.createGame({
			canvas: document.getElementById('canvas'),
			width: $('#canvas-container').width(),
			height: $('#canvas-container').height()
		});

		game.onGameOver(function (stats) {
			var highScore;
			if (stats.highScore) {
				highScore = "You scored: " + $('#score').html() + "!";
			} else {
				highScore = '';
			}

			$('#HighScore').html(highScore);

			$('.modal').modal({
				backdrop: 'static',
				keyboard: false
			});
		});

		game.onScore(function (score) {
			$('#score').html(score);
		});

		$('#playAgain').click(function (e) {
			updateStats();
			game.start();
		});

		game.start();
	});
});

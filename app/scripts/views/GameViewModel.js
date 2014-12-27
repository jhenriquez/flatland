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
			game.setDirection(e.which-37);
		});

		initializeCanvasContainer();
		updateStats();

		var game = gameMaster.createGame({
			canvas: document.getElementById('canvas'),
			width: $('#canvas-container').width(),
			height: $('#canvas-container').height()
		});

		game.onGameOver(function () {
			$('.modal').modal({
				backdrop: 'static',
				keyboard: false
			});
		});

		game.onScore(function (score) {
			$('#score').html(score);
		});

		game.start();
	});
});
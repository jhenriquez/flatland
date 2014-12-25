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
			if (/3[7-9]|40/.test(e.which)) {
				e.preventDefault();
				game.setDirection(e.which-37);
			}
		});

		initializeCanvasContainer();
		updateStats();

		var game = gameMaster.createGame({
			canvas: document.getElementById('canvas'),
			width: $('#canvas-container').width(),
			height: $('#canvas-container').height()
		});

		game.start();
	});
});
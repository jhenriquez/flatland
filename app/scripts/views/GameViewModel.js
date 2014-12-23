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

		initializeCanvasContainer();
		updateStats();

		var game = gameMaster.createGame({
			canvas: document.getElementById('canvas'),
			width: $('#canvas-container').width(),
			height: $('#canvas-container').height()
		});;
	});
});
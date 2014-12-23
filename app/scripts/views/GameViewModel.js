requirejs(['../rjsConfig',], function () {
	requirejs(['_', 'game/GameMaker'], function (_, gameMaster) {
		var canvas = document.getElementById('canvas');

		function initializeCanvasContainer() {
			$('#canvas-container').height((70 / 100) * $(window).height());
		}

		function initializeCanvas(e) {
			canvas.width =  $('#canvas-container').width();
			canvas.height = $('#canvas-container').height();
		}

		function updateStats() {
			var playe = gameMaster.getCurrentPlayer();
			var score = gameMaster.getScore();
			$('#player').html(gameMaster.getCurrentPlayer());
			$('#score').html(gameMaster.getScore());
		}

		$(window).resize(initializeCanvasContainer);
		$(window).resize(initializeCanvas);

		initializeCanvasContainer();
		initializeCanvas();
		updateStats();
	});
});
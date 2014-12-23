requirejs(['../rjsConfig',], function () {
	requirejs(['_', 'game/GameMaker'], function (gameMaster) {
		var canvas = document.getElementById('canvas');

		function InitializeCanvasContainer() {
			$('#canvas-container').height((70 / 100) * $(window).height());
		}

		function InitializeCanvas(e) {
			canvas.width =  $('#canvas-container').width();
			canvas.height = $('#canvas-container').height();
		}

		$(window).resize(InitializeCanvasContainer);
		$(window).resize(InitializeCanvas);

		InitializeCanvasContainer();
		InitializeCanvas();
	});
});
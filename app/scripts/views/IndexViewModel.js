requirejs(['../rjsConfig',], function () {
	requirejs(['game/GameStorage'], function (storage) {

		function onSubmit (e) {
			if (!$('input[for="name"]').val()) {
				e.preventDefault();
				$('#name-form-group').addClass('has-error');
			} else {
				storage.setCurrentPlayer($('input[for="name"]').val());
			}
		}

		$('form').submit(onSubmit);
		$('.btn').click(onSubmit);

		var highScores = storage.getHighScores();

		if (highScores.length === 0) {
			return;
		}

		highScores.sort(function (a,b) { return b.score - a.score; });		

		$('#score-board').append('<h3>High Scores</h3>');

		_.each(highScores, function (hs) {
			var alert =   '<div class="alert alert-success" role="alert">'
						+ hs.player
						+ '<span class="badge pull-right">'+ hs.score +'</span>'
						+ '</div>'
			$('#score-board').append(alert);
		});
	});
});
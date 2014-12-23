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
	});
});
requirejs(['../rjsConfig',], function () {
	requirejs(['game/GameStorage'], function (storage) {
		function IndexViewModel(storage) {			
			this.getName = function () {
				return $('input[for="name"]').val();
			}

			this.setName = function (name) {
				if(name) {
					$('input[for="name"]').val(name);	
				}
			}

			this.onSubmit = function (e) {
				e.preventDefault();  
				if (!this.getName()) {
					$('#name-form-group').addClass('has-error');
				} else {
					storage.setCurrentPlayer(this.getName());
				}
			}.bind(this);

			$('form').submit(this.onSubmit);
			$('.btn').click(this.onSubmit);
		}

		window.IndexViewModel = new IndexViewModel(storage);
		return window.IndexViewModel;
	});
});
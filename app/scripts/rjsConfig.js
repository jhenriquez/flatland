requirejs.config({
	baseUrl: './scripts',
	paths: {
	  '_': 'vendors/underscore-min',
	  '$': 'vendors/jquery.min',
	  'bootstrap': 'vendors/bootstrap.min'
	}
});

requirejs(['$'], function () {
	requirejs(['bootstrap']);
});
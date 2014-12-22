var express = require('express'),
	swig    = require('swig'),
	app     = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app');

app.get('/index', function (rq, rs) {
	rs.render('index');
});

app.get('/game', function (rq, rs) {
	rs.render('game');
});

app.use(express.static(__dirname + '/app'));

app.listen(8080);

console.log('Listening on:', '8080');
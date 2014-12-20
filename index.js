var express = require('express'),
	swig    = require('swig'),
	app     = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/app'));

app.listen(8080);

console.log('Listening on:', '8080');
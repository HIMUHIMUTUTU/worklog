/**
 * Module dependencies.
 */

var express = require('express');
//var bodyParser = require('body-parser');
//var routes = require('./routes');
var analysis = require('./routes/analysis');
var http = require('http');
var path = require('path');

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.basicAuth('id', 'pass'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded and application/json
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())

	// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}

//app.get('/', routes.index);
app.get('/analysis', analysis.view);

server = http.createServer(app);
server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});


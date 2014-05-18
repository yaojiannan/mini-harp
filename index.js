var connect = require('connect');
var serve = require('serve-static');
var makeJade = require('./lib/processor/jade.js');
var makeLess = require('./lib/processor/less.js');

module.exports = function(dir){
	var app = connect();
	app.use(function(request, response, next){
		var url = request.url;

		if (url == "/current-time"){
			response.end((new Date()).toISOString());
		} else {
			next();
		}
	});
	app.use(serve(dir));
	app.use(makeJade(dir));
	app.use(makeLess(dir));
	return app;
}
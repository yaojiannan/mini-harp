var connect = require('connect');
var serve = require('serve-static');
var makeJade = require('./lib/processor/jade.js');
var makeLess = require('./lib/processor/less.js');
var path = require('path');

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
    app.use(function(request,response,next) {
	    var extname = path.extname(request.url);
	    if ( extname == '.jade' || extname == '.less' ) {
	      response.statusCode = 404;
	      response.end();
	    }
	    else {
	      next();
	    }
	});
	
    app.use(function(request,response,next) {
		if (request.url == "/") {
			request.url = "/index.html";
		}
		next();
	});
	
	app.use(serve(dir));
	app.use(makeJade(dir));
	app.use(makeLess(dir));

	return app;
}
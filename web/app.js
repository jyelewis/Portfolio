
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require(__dirname + '/routes')
  , admin = require(__dirname + '/routes/admin.js')
  , resize = require(__dirname + '/resize.js')
  , http = require('http')
  , path = require('path')
  , expressLayouts = require('express-ejs-layouts');
  
var app = express();

var port = process.argv[2] || 8888;



resize.all();

app.configure(function(){
	app.set('port', port);
	app.set('env', 'production');
	app.set('views', __dirname + '/views');
	app.set('forms', __dirname + '/forms')
	app.set('view engine', 'ejs');
	app.set('layout', 'layout');
//	app.use(function(req, res, next){ process.stdout.write('.'); next(); });
	app.use(express.favicon());
//	app.use(express.logger('dev'));
	app.use('/projectImages', express.static(path.join(__dirname, '/../Projects')));
	app.use('/r', express.static(path.join(__dirname, '/public')));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('***blowfishsecret**'));
	app.use(express.session());
	app.use(expressLayouts)
	app.use(app.router);
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.homepage);
app.get('/about', routes.about);
app.get('/references', routes.ref);
app.get('/contact', routes.contact);
app.get('/project/:projectTitle', routes.project);
app.get('/admin', admin.index);

app.get('/sitemap.xml', function(req, res){
    res.sendfile(__dirname + '/sitemap.xml');
});

app.all('*', routes.err404)


//for the vhost server to access
if (!module.parent) {
    http.createServer(app).listen(app.get('port'), function(){
		console.log("Portfolio server listening on port " + app.get('port'));
	});
} else {
    exports.host = app;
}

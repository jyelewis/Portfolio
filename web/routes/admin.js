var layout = 'layout';	
var sqlite3 = require('sqlite3');
var db = require("../database.js");
var async = require('async');

exports.index = function(req, res){
	pageRender(req, res, 'admin', {
		pageTitle: 'Admin page',
		form: res.renderForm('test')
	});
}

var getLayout = function getLayout(req){
	if(req.query.isAjax === '1') {
		layout = 'ajax';
	} else {
		layout = 'layout';
	}
}

function pageRender(req, res, page, vars) {
	var projects = [];
	async.parallel({
		projects: function(callback){ db.all("SELECT * FROM projects", callback) },
		websites: function(callback){ db.all("SELECT title, url FROM websites", callback) }
	}, function(err, results){
		vars.projects = results.projects;
		vars.websites = results.websites;
		vars.layout = layout;
		res.render(page, vars);
	});
	getLayout(req);// the code above is in a call back so this will still run first
}
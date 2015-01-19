var project = require('../project.js');
var layout = 'layout';	
var sqlite3 = require('sqlite3');
var db = require("../database.js");
var async = require('async');

exports.homepage = function(req, res){
	/*pageRender(req, res, 'homepage', {
		pageTitle: 'Home'
	});*/
	res.redirect('/about');
};

exports.project = function(req, res){
	project.exists(req.params.projectTitle, function(exists){
		if (exists)
		{
			var proInfo = project.information(req.params.projectTitle, function(proInfo){
				pageRender(req, res, 'project', {
					pageTitle: proInfo.title,
					project: proInfo
				});
			});
		} else {
			exports.err404(req, res);
		}
	});
};

exports.about = function(req, res){
	pageRender(req, res, 'about', {
		pageTitle: 'About'
	})
}

exports.contact = function(req, res){
	pageRender(req, res, 'contact', {
		pageTitle: 'Contact'
	})
}

exports.ref = function(req, res){
	pageRender(req, res, 'ref', {
		pageTitle: 'References'
	})
}

exports.err404 = function(req, res){
	pageRender(req, res, '404', {
		pageTitle: 'Page not found'
	})
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
		projects: function(callback){ db.all("SELECT * FROM tbl_portfolio_projects ORDER BY title", callback) },
		websites: function(callback){ db.all("SELECT title, url FROM tbl_portfolio_websites", callback) }
	}, function(err, results){
		vars.projects = results.projects;
		vars.websites = results.websites;
		vars.layout = layout;
		res.render(page, vars);
	});
	getLayout(req);
	
}
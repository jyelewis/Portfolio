var async = require('async');
var db = require("./database.js");
var fs = require('fs');
//var emitter = require('events').EventEmitter;

exports.information = projectInformation;
exports.exists = projectExists;

function projectInformation(projectTitle, fnCallback)
{
	async.auto({
		projectMain: function(callback){
			db.get("SELECT id, title, content, specs FROM tbl_portfolio_projects WHERE title = ?", projectTitle, callback);
		},
		projectSpecs: ['projectMain', function(callback, values){
			var specs = [];
			if (values.projectMain.specs){
				values.projectMain.specs.split("\n").forEach(function(specRow){
					specs.push({
						 key  : specRow.split(":")[0].trim()
						,value: specRow.split(":")[1].trim()
					});
				});
				callback(null, specs);
			} else {
				callback(null, [])
			}
		}],
		textSplit: ['projectMain', function(callback, values){
			splitTextBr(values.projectMain.content, callback);
		}],
		images: function(callback){
			var imageCount = 0;
			fs.readdir(__dirname + '/../Projects/' + projectTitle + '/', function(err, images1){
				var images = [];
				if(err) {
					callback(false, { showImages: false, images: [] });
				} else {
					images1 = images1.filter(function(image){ return image.substr(0, 1) !== '.' && image.substr(0, 6) !== 'small-';  });
					images1.forEach(function(image){
						imageCount++;
						images.push({active: '', small: 'small-'+image, large: image});
					});
					images[1].active = ' active';
					callback(null, {images: images, showImages: (imageCount >= 3)});
				}
			});
		}
	}, function(err, results){
		if(err) { throw err; }
		fnCallback({
			title: results.projectMain.title,
			images: results.images,
			text1: results.textSplit.p1,
			text2: results.textSplit.p2,
			specs: results.projectSpecs
		});
	});
}

function projectExists(projectTitle, callback){
	db.get("SELECT * FROM tbl_portfolio_projects WHERE title = $title", { $title: projectTitle}, function(err, row){
		if (err){ throw Error(err) }
		if(typeof row == 'undefined')
		{
			callback(false);
		} else {
			callback(true);
		}
	});
}


function splitText(text, callback){
	var halfCount = text.length/2;
	text = text.split(' ');
	var charCount = 0;
	var text1 = new Array();
	var text2 = new Array();
	text.forEach(function(word){
		charCount += word.length + 1;
		if (charCount <= halfCount)
		{
			text1.push(word);
		} else {
			text2.push(word);
		}
	});
	
	var text1 = text1.join(' ');
	var text2 = text2.join(' ');
	process.nextTick(function(){ 
		callback(null, { p1: text1, p2: text2 })
	});
}

function splitTextBr(text, callback){
	text = text.split('<p>');
	var halfCount = text.length/2 + 1;
	var paraCount = 0;
	var text1 = new Array();
	var text2 = new Array();
	text2.push(' ');
	text.forEach(function(para){
		paraCount++;
		if (paraCount <= halfCount)
		{
			text1.push(para);
		} else {
			text2.push(para);
		}
	});
	
	var text1 = text1.join('<p>');
	var text2 = text2.join('<p>');
	process.nextTick(function(){ 
		callback(null, { p1: text1, p2: text2 })
	});
}
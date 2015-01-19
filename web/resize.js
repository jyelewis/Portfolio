var fs = require('fs');
var im = require('imagemagick');

exports.all = function(){
	fs.readdir(__dirname + '/../Projects', function(err, res){
		res.forEach(function(dir){
			if (!fs.statSync(__dirname + '/../Projects/' + dir).isFile()) {
				(function(dir){
					process.nextTick(function(){ resizeProject(__dirname + '/../Projects/' + dir + '/'); });
				})(dir)
			}
		});
	});
}

function resizeProject(path) {
	fs.readdir(path, function(err, res){
		res.forEach(function(image){
			if (image.substr(0, 1) !== '.' && image.substr(0, 6) !== 'small-') {
				im.convert([path + image, '-resize', '435x278', path + 'small-' + image ], 
				function(err, stdout){
					if (err) throw err;
				});
			}
		});
	});
}
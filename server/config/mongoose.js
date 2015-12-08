var mongoose = require('mongoose');

var fs = require('fs');

// var keys = require(__dirname + '/keez.js');

// mongoose.connect('mongodb://localhost/Housesit');
// mongoose.connect(keys.remote_db);

mongoose.connect(process.env.MONGOLAB_URI);


var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') > 0){
		require(models_path + '/' + file);
	}
})
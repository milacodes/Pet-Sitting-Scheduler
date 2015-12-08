var mongoose = require('mongoose');

var fs = require('fs');

var keys = require(__dirname + '/key.js');

// mongoose.connect('mongodb://localhost/Housesit');
mongoose.connect(keys.remote_db);

var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') > 0){
		require(models_path + '/' + file);
	}
})
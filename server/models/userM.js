var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: { type: String, trim: true, required: true },
	username: { type: String, trim: true, required: true },
	email: { type: String, trim: true, required: true },
	password: { type: String, trim: true, required: true },
	address: {
		addy1: { type: String, trim: true, required: true },
		addy2: { type: String, trim: true },
		city: { type: String, trim: true, required: true },
		state: { type: String, trim: true, required: true },
		zip: { type: Number, trim: true, required: true }
	},
	
	animals:[{name: String, species: String}],

	created_at: {type: Date, default: Date.now },

	updated_at: {type: Date, default: Date.now }
});

var ApptSchema = new mongoose.Schema({
	username: { type: String, trim: true },
	start: { type: String, trim: true },
	end: { type: String, trim: true },
	info: { type: String, trim: true },

	created_at: {type: Date, default: Date.now },

	updated_at: {type: Date, default: Date.now }

})

var AdminSchema = new mongoose.Schema({
	username: { type: String, trim: true },
	password: { type: String, trim: true },
	created_at: {type: Date, default: Date.now },
	updated_at: {type: Date, default: Date.now }
})

var EventSchema = new mongoose.Schema({
	title: { type: String, trim: true },
	start: { type: String, trim: true },
	end: { type: String, trim: true }
})


mongoose.model('user', UserSchema);
mongoose.model('appointment', ApptSchema);
mongoose.model('admin', AdminSchema);
mongoose.model('event', EventSchema);



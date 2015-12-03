var mongoose = require('mongoose');
var User = mongoose.model('user');
var Appointment = mongoose.model('appointment');
var Admin = mongoose.model('admin');
var Event = mongoose.model('event');

module.exports = (function(){

	return {
		// All console.logs appear in TERMINAL!!
		index: function(req,res){
			console.log('ServCntrl - Appts - Index');
			Appointment.find({}, function(err, results){
				if(err){
					res.json(err);
					console.log(err);
				}
				else{
					res.json(results);
				}
			})
		},


		adlog: function(req,res){
			console.log('ServCntrl - Admin - adlog');
			Admin.findOne({
				username: req.body.username,
				password: req.body.password
				}, {password:0, created_at:0, updated_at:0}, function(err, admin){
				if(admin){
					console.log(admin);
					req.session.user_id = admin._id;
					req.session.username = admin.username;

					req.session.save(function(err){
						console.log("ADMIN SAVE: ", req.session)
						res.json(admin);
					});
				}

				else{
					if(err){
						res.json(err);
						console.log(err);
					}
					else{
						res.json(false);
					}
				}
			})
		},


		login: function(req,res){
			console.log('ServCntrl - Users - login', req.body);
			// console.log('username - ', req.body.username);
			User.findOne({
				username: req.body.username,
				password: req.body.password
				}, {password:0, created_at:0, updated_at:0}, function(err, user){

					if (user){
						console.log(user);
						req.session.user_id = user._id;
						req.session.username = user.username;

						sesh = req.session;
						console.log("SESSION", sesh, "@@@@@");

						req.session.save(function(err){
							console.log("USER SAVE: ", req.session)
							res.json(user);
						});
					}
					else{
						if(err){
							res.json(err);
							console.log(err);
						}
						else{
							res.json(false);
						}
					}
			})
		},

		authenticate: function(req, res){

			console.log('Authenticate ** ServCntrl');
			console.log('Authenticate - ', req.session, " 56565656");

			if(req.session.user_id){
				return res.json(true);
			}
			return res.json(false);
		},

		
		add: function(req,res){
			console.log('ServCntrl - Users - Add ', req.body.animals);
			var newuser = new User(req.body);
			newuser.save(function(err, newreg){
				if(err){
					console.log(err);
				}
				else{
					res.json(newreg);
				}
			})
		},


		sendRequest: function(req,res){
			console.log('SrvCntrl - Appts - Request', req.body);
			var newappt = new Appointment;
			newappt.username = req.body.client;
			newappt.start = req.body.start;
			newappt.end = req.body.end;
			newappt.info = req.body.info;
			console.log(newappt);

			newappt.save(function(err){
				if(err){
					console.log(err)
				}
				else{
					res.json({status:true});
				}
			})
		},

		addEvent: function(req,res){
			console.log('ServCntrl - Event - Add: ', req.body);
			var newevent = new Event(req.body);
			newevent.title = req.body.username+"'s house";
			console.log("@newEvent@ ",newevent);

			newevent.save(function(err){
				if(err){
					console.log(err);
				}
				else{
					res.json({status:true});
				}
			})
		},

		grab: function(req,res){
			console.log('ServCntrl - Events - GrabAll');
			Event.find({}, function(err, results){
				if(err){
					res.json(err);
					console.log(err);
				}
				else{
					res.json(results);
				}
			})
		},


		destroyAppt: function(req,res){
			console.log('ServCntrl - Appts - Destroy');
			Appointment.remove({_id:req.params.id}, function(err){
				if(err){
					console.log(err);
				}
				else{
					console.log("appt deleted");
					res.json({status:true});
				}
			});
		},

		logout: function(req,res){
			console.log('ServCntrl - Users - logout');
		}


		// show: function(req,res){
		// 	console.log('ServCntrl - Users - Show')
		// },


		// edit: function(req,res){
		// 	console.log('ServCntrl - Users - Edit')
		// },


		// update: function(req,res){
		// 	console.log('ServCntrl - Users - Update')
		// },


		// create: function(req,res){
		// 	console.log('ServCntrl - Users - Create')
		// },



	}
})();
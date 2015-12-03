
var users = require('./../controllers/usersSC.js');
var appointments = require('./../controllers/usersSC.js');
var admins = require('./../controllers/usersSC.js');
var events = require('./../controllers/usersSC.js');


module.exports = function(app){

	//displays all appointments on admin view page
	app.get('/appointments', function(req,res){
		console.log('routes - .getAppts');
		appointments.index(req,res);
	})

	//adds accepted appointment to events collection
	app.post('/event', function(req,res){
		console.log('routes - addEvent');
		events.addEvent(req,res);
	})

	//log in admin
	app.post('/adminlogin', function(req,res){
		console.log('routes - admin login ', req.body);
		admins.adlog(req,res);
	})

	//log in user
	app.post('/users/login', function(req,res){
		console.log('routes - verify', req.body);
		users.login(req,res);
	})

	//authenticates user
	app.get('/authenticate', function(req,res){
		console.log('routes - authenticating...', req.session);

		users.authenticate(req,res);
		
	})

	//log out user or admin
	app.get('/logout', function(req,res){
		console.log('routes - logout', req.session.user_id);
		users.logout(req,res);
	})

	//appointment request
	app.post('/appointment', function(req,res){
		console.log('routes - request appt', req.body);
		appointments.sendRequest(req,res);
	})

	// Removes one appointment
	app.delete('/appointments/:id/', function(req,res){
		console.log('routes - delete appt ', req.params);
		appointments.destroyAppt(req,res);
	})

	app.get('/events', function(req,res){
		console.log('routes - grabEvents');
		events.grab(req,res);
	})


	// app.get('/', function(req,res){
	// 	console.log('routes - render index page');
	// 	res.render('index');
	// })

	//displays form to add new user
	// app.get('users/new', function(req,res){
	// 	console.log('routes - .custNew');
	// 	users.create(req,res);
	// })

	
	//registers new user
	app.post('/users', function(req,res){
		console.log('routes - .add');
		users.add(req,res);
	})
		
	//display info about one particular user
	app.get('users/:id', function(req,res){
		console.log('routes - .getById');
		users.show(req,res);
	})
	
	//displays edit form for one particular user
	// app.get('/users/edit/:id', function(req,res){
	// 	console.log('routes - edit form');
	// 	users.edit(req,res);
	// })

	//processes edit form
	// app.patch('/users/:id/', function(req,res){
	// 	console.log('routes - gonna process edits');
	// 	users.update(req,res);
	// })


	

	

}
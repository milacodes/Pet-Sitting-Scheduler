sitapp.controller('authController', function($scope, $location, userFactory, appointmentFactory){
	console.log('Auth Controller loaded');


//make sure there's a user logged in
    userFactory.auth();

})
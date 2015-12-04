var sitapp = angular.module("sitapp", ['ngRoute']);

sitapp.config(function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl: '/partials/splash.html'
	})

	.when('/home', {
		controller: 'authController',
		templateUrl: '/partials/home.html'
	})

	.when('/rates', {
		controller: 'authController',
		templateUrl: '/partials/rates.html'
	})

	.when('/calendar', {
		controller: 'calendarsController',
		templateUrl: '/partials/calendar.html'
	})

	.when('/request', {
		controller: 'datetimesController',
		templateUrl: '/partials/request.html'
	})

	.when('/cancel', {
		controller: 'authController',
		templateUrl: '/partials/cancel.html'
	})

	.when('/admin', {
		templateUrl: '/partials/adlog.html'
	})

	.when('/adview', {
		controller: 'calendarsController',
		templateUrl: '/partials/adminview.html'
	})

	.when('/register', {
		templateUrl: '/partials/register.html'
	})

	.otherwise({
		redirectTo: '/'
	})
})
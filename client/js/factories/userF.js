sitapp.factory('userFactory', function($http, $location){
	console.log('User Factory Loaded');
	var loggedIn;
	var adminIn;

	return {

		getAppts: function(callback){
			console.log('factory - getAppts');

			$http.get('/appointments').success(function(output){
				callback(output);
			});
		},

		addUser: function(newuserdata, callback){
			console.log('fact - addUser ', newuserdata);

			$http.post('/users', newuserdata).success(function(newreg){
				callback(newreg);
			});
		},

		logout: function(callback){
			console.log("fact-logout");
			$http.get('/logout').success(function(response){
				callback(response);
			});
		},

		adminlogin: function(adloginfo, callback){
			console.log('factory - adminlogin ', adloginfo);
			$http.post('/adminlogin', adloginfo).success(function(response){
				console.log("factback from SC");
				if(response){
					adminIn = response
					console.log(adminIn);
					callback(response);
				}
				else{
					callback({error:"Username and/or Password do not match. Please try again."});
				}
			})
		},


		//log in user. set session
		verify: function(loginfo, callback){
			console.log('factory - verify', loginfo);
			// callback();
			$http.post('/users/login', loginfo).success(function(response){
				if(response){
					loggedIn = response;
					console.log(loggedIn);
					
					callback(response);
				}
				else{
					callback({error:"Username and/or Password do not match. Please try again."});
				}
			});
		},

		auth: function(){
			console.log("auth here");
			console.log(loggedIn);
			
				$http.get('/authenticate').success(function(response){
					if(!response){
						console.log("NOPE");
						$location.path('/');
					}
				})
		},


		

		// removeUser: function(id, callback){
		// 	console.log(id + " in factory");
		// 	$http.delete('/users/'+id).success(function(response){
		// 		callback(response);
		// 	});
		// },

		updateUser: function(id, callback){
			console.log(id + " ready to update in factory");
			$http.patch('/users/'+id).success(function(response){
				callback(response);
			});
		}
	}
})
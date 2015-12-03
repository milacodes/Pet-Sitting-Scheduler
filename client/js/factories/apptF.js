sitapp.factory('appointmentFactory', function($http, $location){
	console.log('Appt Factory Loaded');

	return {

		sendRequest: function(fullappt, callback){
			console.log('fullappt', fullappt);

			$http.post('/appointment', fullappt).success(function(response){
				callback(response);
			});
		},

		dateNo: function(appt, callback){
			console.log("aF dateNo - ", appt);
			$http.delete('/appointments/'+appt._id).success(function(result){
				callback(result);
			});
		},

		dateYes: function(appt, callback){
			console.log("aF dateYes - ", appt);
			$http.post('/event', appt).success(function(response){
				callback(response);
			})
		},

		grabEvents: function(callback){
			console.log('aF - grabEvents');
			$http.get('/events').success(function(output){

				for (var i = 0; i<output.length; i++){
					
					// console.log(output[i].start);
					output[i].start = new Date(output[i].start);
					// console.log(output[i].start);
					output[i].end = new Date(output[i].end);
				}

				console.log("new ",output);
				callback(output);
			});
		},

	}
})
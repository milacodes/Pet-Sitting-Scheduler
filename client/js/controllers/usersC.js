sitapp.controller('usersController', function($scope, $location, userFactory, appointmentFactory){
	console.log('User Controller loaded');
	$scope.users = [];
	$scope.animals = [];
	$scope.animal = {};
	$scope.appts = [];
	$scope.error = [];




// ***************** User Login/Logout ****************

	//login User. set session
	$scope.verify = function(loginfo){
		console.log("users Controller - ", loginfo);

		if(loginfo){
			userFactory.verify(loginfo, function(user){
				console.log('verify back from factory - ', user);
				if(user.error){
					return $scope.error = user.error;
					$location.path('/');
				}
				else{
					$scope.username = user.username;
					console.log($scope.username);
					$location.path('/home');
				}
			})
		}
	}


	//logout
	$scope.logout = function(){
		console.log("logout function");
		userFactory.logout(function(){
			console.log("back from logout");
		})

		$scope.username = "";
		$scope.adusername = "";
		$location.path('/');

		// window.location.href = "http://milaspetsittingshop.herokuapp.com/";
		

	}





// ****************** Registration *******************
	$scope.addUser = function(newUser){
		console.log("addUser, scope.animals", $scope.animals);
		console.log("addUser, newUser", newUser);
		newUser.animals = $scope.animals;
		console.log("addUser, scope.newUser",newUser);
		userFactory.addUser(newUser, function(data){
			console.log("data", data);
			if(data){
				userFactory.verify(data, function(user){
					console.log('verify back from factory - ', user);
					if(user.error){
						return $scope.error = user.error;
						$location.path('/');
					}
					else{
						$scope.username = user.username;
						console.log($scope.username);
						$location.path('/home');
					}
				})
				
			}
		});
	}

	$scope.addAnimal = function(animal){
		console.log("addAnimal - $scope.animal", $scope.animal)
		$scope.animals.push($scope.animal);

		$scope.animal = {};
		console.log("addAnimal - $scope.animals", $scope.animals)
	}




// ******************** Admin Login *********************
	$scope.adminlogin = function(adloginfo){
		console.log("users Controller - ", adloginfo);

		if(adloginfo){
			userFactory.adminlogin(adloginfo, function(admin){
				console.log('adlogin back from factory - ', admin);
				if(admin.error){
					return $scope.aderror = admin.error;
					$location.path('/admin');
				}
				else{
					$scope.adusername = admin.username;
					console.log($scope.adusername);
					getAppts();
					$location.path('/adview');
				}
				
			})
		}

	}




// ****************** Appointments ************************
	

	//get all pending appointments function
	var getAppts = function(){
		console.log('cont - getAppts');

		userFactory.getAppts(function(backdata){
			console.log('back with getAppt data - ', backdata);
			$scope.appts = backdata;
		});
	}
	getAppts();

	
	//User appt request
	$scope.datetimeerror = [];

	$scope.sendRequest = function(apptinfo){
		$scope.reqsuccess = [];

		console.log('requestform');
		console.log("Appt info, ",apptinfo);

		allotedTimes = [
            '08:00', '09:00', '10:00', '11:00',
            '12:00', '13:00', '14:00', '15:00',
            '16:00', '17:00', '18:00', '19:00',
            '20:00', '21:00'
            ];
        var SatObj = {};
        var EatObj = {};

		startdate = apptinfo.start;
		sday = startdate.slice(0,10);
		stime=startdate.slice(11,16);
		console.log("start day: ",sday);
		console.log("start time: ",stime);

		enddate = apptinfo.end;
		eday = enddate.slice(0,10);
		etime = enddate.slice(11,16);
		console.log("end day: ",eday);
		console.log("end time: ",etime);

		sd = new Date(sday);
		// console.log(sd);
		sutc = sd.getTime();
		console.log(sutc);

		ed = new Date(eday);
		// console.log(ed);
		eutc = ed.getTime();
		console.log(eutc);

		if(eutc<=sutc){
			return $scope.datetimeerror = "The end date must be after the start date!";
		}

		for (var i = 0; i< allotedTimes.length; i++){
			if (stime == allotedTimes[i]){
				console.log(stime, allotedTimes[i]);
				SatObj["very"] = "in there";
				console.log("SatObj: ", SatObj);
			}
			if (etime == allotedTimes[i]){
				EatObj["you"] = "did it";
				console.log("EatObj: ", EatObj);
			}
		}

		if(jQuery.isEmptyObject(SatObj) || jQuery.isEmptyObject(EatObj)){
			console.log("no start time match");
			return $scope.datetimeerror = "Don't forget your start and end times!";
		}
		else{
			console.log("we've got ourselves a start match.");
			fullappt = {
				client: $scope.username,
				start: apptinfo.start,
				end: apptinfo.end,
				info: apptinfo.info
			}
			console.log(fullappt);

			appointmentFactory.sendRequest(fullappt, function(data){
				console.log(data);
				$scope.reqsuccess = "Your request has been sent! You'll be notified soon!";
				$location.path('/home');
			});
		}
	}

    $scope.eventSources = [$scope.events];

	var loadCalendar = function(){
        console.log("loading calendar");
        $('#calendar').fullCalendar({
            header: {
                        left:   'prev',
                        center: 'title',
                        right:  'next'
                    },
            events: $scope.events
        });
    }


	//admin accept appt request
	$scope.dateYes = function(appt){
		console.log(appt);

		//adds appt dates to event db to be displayed on calendar
		appointmentFactory.dateYes(appt, function(data){
			console.log("back from aF dateYes");

			//removes date from appt request table
			appointmentFactory.dateNo(appt, function(data){
				console.log("back from aF dateNo ", data);

				//grabs all appt requests to load updated table
				getAppts();

				//grabs approves events from event db, puts into scope.events
				appointmentFactory.grabEvents(function(output){
            		console.log('back w/ grabEvents data - ', output);
            		$scope.events = output;
            		console.log($scope.events);
            		//loads calendar with updated events
            		loadCalendar();
					$location.path('/adview');
        		});
			})
		})
	}


	//admin reject appt request
	$scope.dateNo = function(appt){
		console.log(appt);
		appointmentFactory.dateNo(appt, function(data){
			console.log("back from aF dateNo ", data);
			getAppts();
			$location.path('/adview');
		})
	}























})
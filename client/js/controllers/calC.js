sitapp.controller('calendarsController', function($scope, $location, userFactory, appointmentFactory){
	console.log('Calendar Controller loaded');


    userFactory.auth();

	// ****************** FullCalendar ********************

	var date = new Date();
	var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    
    var grabEvents = function(){
        console.log("calC - getEvents");

        appointmentFactory.grabEvents(function(output){
            console.log('back w/ grabEvents data - ', output);
            $scope.events = output;
            console.log($scope.events);
            loadCalendar();
        });
    }
    grabEvents();

    var loadCalendar = function(){
        console.log("loading calendar");
        $('#calendar').fullCalendar({
            header: {
                        left:   'prev',
                        center: 'title',
                        right:  'next'
                    },
            events: $scope.events
            // $('#calendar').fullCalendar('clientEvents');
        });
    }


    $scope.eventSources = [$scope.events];

})
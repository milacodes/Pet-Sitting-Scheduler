sitapp.service('calendarService', function(appointmentFactory){

	this.grabEvents = function(){
		
	}

	this.loadCalendar = function(){
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
}

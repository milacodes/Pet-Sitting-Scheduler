sitapp.controller('datetimesController', function($scope, $location, userFactory, appointmentFactory){
	console.log('DateTimes Controller loaded');


    userFactory.auth();
    
	// ****************** DateTimePicker ********************
    var loadDatePickers = function(){
        $('#datetimepicker_start').datetimepicker({
            inline:true,
            minDate:'-1970/01/01',
            allowTimes:[
            '08:00', '09:00', '10:00', '11:00',
            '12:00', '13:00', '14:00', '15:00',
            '16:00', '17:00', '18:00', '19:00',
            '20:00', '21:00'
            ]
        });
        $('#datetimepicker_end').datetimepicker({
            inline:true,
            minDate:'+1970/01/02',
            allowTimes:[
            '08:00', '09:00', '10:00', '11:00',
            '12:00', '13:00', '14:00', '15:00',
            '16:00', '17:00', '18:00', '19:00',
            '20:00', '21:00'
            ]
        });
    }
    loadDatePickers();

})
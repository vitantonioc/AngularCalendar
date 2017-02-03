/**
 * calendarDemoApp - 0.9.0
 */
var calendarDemoApp = angular.module('calendarDemoApp', ['ui.calendar', 'ui.bootstrap'])

  
  .factory('itemsFactory', function ($http) {
        return {
            getData: function () {
                return $http({
                    method: 'GET',
                    //url: 'date.json'
                  url: 'public/calendar/date.json'
                });
            }
        }
    })

.controller('CalendarCtrl', 
   function($scope, $compile, $timeout, $interval, $http, itemsFactory, uiCalendarConfig) {  
      
     $scope.items = {
            data: [],
            urlSync: false
        };
        $scope.events = '';

        $scope.loadData = function () { 
      itemsFactory.getData().then(function (responseData) {           
            $scope.items.data = responseData.data;            
       $scope.events = $scope.items.data;
      })
        };

         $scope.loadData();
    $scope.eventSource = {
            url: "",
            className: '',           // an option!
            currentTimezone: '' // an option!
    };
   
   $scope.events2 =     
    [
      {
        "title": "events",
        "start": 318339659000
      }
    ];
     
    $scope.changeLang = function() {
      if($scope.changeTo === 'Hungarian'){
        $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
        $scope.changeTo= 'English';
      } else {
        $scope.uiConfig.calendar.dayNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
        $scope.uiConfig.calendar.dayNamesShort = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
        $scope.changeTo = 'Hungarian';
      }
    };
    /* event sources array*/   
 callAtInterval();
  $interval(callAtInterval, 100);
function callAtInterval() {
   $scope.$watch('$scope.events', function (newValue, oldValue, scope) {
     $scope.changeView = function(view,calendar) {
      
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalendar = function(calendar) {
      $timeout(function() {
      
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
      });
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {

        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': false});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 650,
        dayNamesShort: ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'],
        monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        dayNames : ['Domingo','Lunes', 'Martes', 'Miercoles','Jueves','Viernes','Sabado'],
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        editable: false,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

     if($scope.events != ''){
      $scope.eventSources = [$scope.events, $scope.eventSource];
    }else{
       $scope.eventSources = [$scope.events2, $scope.eventSource];
    }



   }, true);



} 

     $(document).ready(function() {
       console.info('Calendario cargado....');
        $('.calendar').fullCalendar({
          editable: false,
            locale: 'es',
            dayNames: ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'],
            isRTL: true
        });
         $('.modal').modal();


    });

});
/* EOF */

(function() {
    'use strict';

    angular
        .module('earthquake')
        .controller('EarthquakesController', EarthquakesController);

    EarthquakesController.$inject = ['$scope', '$state', 'EarthquakeFactory'];


    function EarthquakesController($scope, $state, EarthquakeFactory) {
        var self = this;

        $scope.getPastHour = getPastHour;
        $scope.getPastDay = getPastDay;
        $scope.getPastWeek = getPastWeek;
        $scope.getPastMonth = getPastMonth;

        $scope.hasLoadedData = false;
        $scope.loadGraph = true;
        $scope.earthquakeData = undefined;

        var data = EarthquakeFactory.getEarthquakesPastHour();
        data.then(function(result) {
           // display data when avaliable
           $scope.status = result.data.metadata.status;
           $scope.title = result.data.metadata.title;
           $scope.count = result.data.metadata.count;

           $scope.earthquakes = result.data.features;
           $scope.url = result.data.metadata.url;

           $scope.hasLoadedData = true;
           $scope.loadGraph = true;
        });

        function getPastHour(){
            $scope.hasLoadedData = false;
            data = EarthquakeFactory.getEarthquakesPastHour();
            data.then(function(result) {
               // display data when avaliable
               $scope.status = result.data.metadata.status;
               $scope.title = result.data.metadata.title;
               $scope.count = result.data.metadata.count;

               $scope.earthquakes = result.data.features;
               $scope.url = result.data.metadata.url;

               $scope.hasLoadedData = true;
               $scope.loadGraph = true;
            });
        }

        function getPastDay(){
            $scope.hasLoadedData = false;
            data = EarthquakeFactory.getEarthquakesPastDay();
            data.then(function(result) {
               // display data when avaliable
               $scope.status = result.data.metadata.status;
               $scope.title = result.data.metadata.title;
               $scope.count = result.data.metadata.count;

               $scope.earthquakes = result.data.features;
               $scope.url = result.data.metadata.url;

               $scope.hasLoadedData = true;
               $scope.loadGraph = true;
            });
        }

        function getPastWeek(){
            $scope.hasLoadedData = false;
            data = EarthquakeFactory.getEarthquakesPastWeek();
            data.then(function(result) {
               // display data when avaliable
               $scope.status = result.data.metadata.status;
               $scope.title = result.data.metadata.title;
               $scope.count = result.data.metadata.count;

               $scope.earthquakes = result.data.features;
               $scope.url = result.data.metadata.url;

               $scope.hasLoadedData = true;
               $scope.loadGraph = false;
            });
        }

        function getPastMonth(){
            $scope.hasLoadedData = false;
            data = EarthquakeFactory.getEarthquakesPastMonth();
            data.then(function(result) {
               // display data when avaliable
               $scope.status = result.data.metadata.status;
               $scope.title = result.data.metadata.title;
               $scope.count = result.data.metadata.count;

               $scope.earthquakes = result.data.features;
               $scope.url = result.data.metadata.url;

               $scope.hasLoadedData = true;
               $scope.loadGraph = true;
            });
        }
    }
})();
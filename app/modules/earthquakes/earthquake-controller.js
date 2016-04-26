(function() {
    'use strict';

    angular
        .module('app')
        .controller('EarthquakeController', EarthquakeController);

    EarthquakeController.$inject = ['$scope', '$state', 'EarthquakeFactory'];


    function EarthquakeController($scope, $state, EarthquakeFactory) {
        var self = this;

        $scope.hasLoadedData = false;

        var data = EarthquakeFactory.getEarthquakes();
        data.then(function(result) {
           // display data when avaliable
           $scope.status = result.data.metadata.status;
           $scope.title = result.data.metadata.title;
           $scope.count = result.data.metadata.count;

           $scope.earthquakes = result.data.features;
           $scope.url = result.data.metadata.url;

           $scope.hasLoadedData = true;
        });        

        activate();

        function activate() {
        }
    }
})();
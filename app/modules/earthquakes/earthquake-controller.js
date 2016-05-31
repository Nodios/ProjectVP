(function() {
    'use strict';

    angular
        .module('earthquake')
        .controller('EarthquakeController', EarthquakeController);

    EarthquakeController.$inject = ['$scope','$state', '$stateParams', 'EarthquakeFactory'];

    /* @ngInject */
    function EarthquakeController($scope, $state, $stateParams, EarthquakeFactory) {
    	var self = this;
      angular.element(document.querySelector('#tip')).remove();

    	var earthquakeUrl = $stateParams.earthquakeUrl;
    	var data = null;

    	$scope.hasLoadedData = false;

      (activate());

      ////////////////

      function activate() {
      	data = EarthquakeFactory.getEarthquakeDetails(earthquakeUrl);
      	data.then(function(result) {
             // display data when avaliable
             var nearbyCitiesUrl = result.data.properties.products["nearby-cities"][0].contents["nearby-cities.json"].url;

             $scope.resultData = result;             
             $scope.lng = result.data.geometry.coordinates[0];
             $scope.lat = result.data.geometry.coordinates[1];
             $scope.tsunamiChance = result.data.properties.tsunami;

             nearbyCities(nearbyCitiesUrl);

             
          });
      }

      function nearbyCities(url){
        data = EarthquakeFactory.getNearbyCities(url);
          data.then(function(result) {
            $scope.nearbyCitiesData = result.data;
            $scope.hasLoadedData = true;
          });
      }
      
    }
})();
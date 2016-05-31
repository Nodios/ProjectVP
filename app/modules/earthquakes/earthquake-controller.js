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

      $scope.goBack = goBack;

    	$scope.hasLoadedData = false;

      (activate());

      ////////////////

      function activate() {
      	data = EarthquakeFactory.getEarthquakeDetails(earthquakeUrl);
      	data.then(function(result) {
            angular.element(document.querySelector('#tip')).remove();
             // display data when avaliable
            var nearbyCitiesUrl = result.data.properties.products["nearby-cities"][0].contents["nearby-cities.json"].url;
            var geoserve = result.data.properties.products["geoserve"][0].contents["geoserve.json"].url;

            var resultData = result.data;             
            $scope.lng = resultData.geometry.coordinates[0];
            $scope.lat = resultData.geometry.coordinates[1];

            $scope.depth = result.data.properties.products["phase-data"][0].properties.depth;
            $scope.tsunamiChance = resultData.properties.tsunami;
            $scope.magnitude = resultData.properties.mag;
            $scope.place = resultData.properties.place;
            $scope.time = new Date(resultData.properties.time);
            $scope.updateTime = new Date(resultData.properties.updated);

            nearbyCities(nearbyCitiesUrl);
            getGeoserve(geoserve);

          });
      }

      function nearbyCities(url){
        data = EarthquakeFactory.getNearbyCities(url);
          data.then(function(result) {
            $scope.nearbyCitiesData = result.data;
            
          });
      }

      function getGeoserve(url){
        data = EarthquakeFactory.getGeoserve(url);
        data.then(function(result){
          var data = result.data;
          $scope.country = data.region.country;
          $scope.region = data.region.state;
          $scope.tectonicSummary = data.tectonicSummary.text;
          $scope.hasLoadedData = true;
        });
      }
      
      function goBack() {
          $state.go('^');
      }
    }
})();
(function() {
    'use strict';

    angular
        .module('significant')
        .controller('SignificantController', SignificantController);

    SignificantController.$inject = ['$scope','$state', '$stateParams', 'EarthquakeFactory'];

    /* @ngInject */
    function SignificantController($scope, $state, $stateParams, EarthquakeFactory) {
    	var self = this;

      var data = undefined;
      $scope.eqArray = [];
      $scope.eqWithTsunamiWarningArray = [];

      $scope.hasLoadedData = false;

      getPastMonth();

      function getPastMonth(){
        $scope.hasLoadedData = false;
        data = EarthquakeFactory.getEarthquakesPastMonth();
        data.then(function(result) {
           // display data when avaliable
           for(var eq in result.data.features){
              var data = result.data.features[eq];
              if(data.properties.mag > 6){
                  $scope.eqArray.push(data);
              }
              if(data.properties.tsunami > 0){
                $scope.eqWithTsunamiWarningArray.push(data);
              }
           }

           $scope.maxMagnitudeEearthquake = getMaxMagnitude($scope.eqArray);

           $scope.status = result.data.metadata.status;
           $scope.title = result.data.metadata.title;
           $scope.count = result.data.metadata.count;

           $scope.earthquakes = result.data.features;
           $scope.url = result.data.metadata.url;

           $scope.hasLoadedData = true;
        });
      }

      function getMaxMagnitude(array){
        var len = array.length, max = -Infinity, output;
        while(len--){
          if(array[len].properties.mag > max){
            max = array[len].properties.mag
            output = array[len];
          }
        }
        return output;
      }
    }
})();
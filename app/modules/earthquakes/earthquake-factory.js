(function() {
    'use strict';

    angular
        .module('app')
        .factory('EarthquakeFactory', EarthquakeFactory);

    EarthquakeFactory.$inject = ['$http'];

    /* @ngInject */
    function EarthquakeFactory($http) {
        var self = this;
        var test;

        var service = {
            getEarthquakes: getEarthquakes
        };
        return service;

        ////////////////

        function getEarthquakes(){
            return $http.get('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')
                        .success(function(response){
                            return response
                        })
                        .error(function(err){
                            //TODO error handle
                        });
        }
    }
})();
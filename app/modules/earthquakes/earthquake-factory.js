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
            getEarthquakesPastHour: getEarthquakesPastHour,
            getEarthquakesPastDay: getEarthquakesPastDay,
            getEarthquakesPastWeek: getEarthquakesPastWeek,
            getEarthquakesPastMonth: getEarthquakesPastMonth

        };
        return service;

        ////////////////

        function getEarthquakesPastHour(){
            return $http.get('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')
                        .success(function(response){
                            return response
                        })
                        .error(function(err){
                            //TODO error handle
                        });
        }
        function getEarthquakesPastDay(){
            return $http.get('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
                        .success(function(response){
                            return response
                        })
                        .error(function(err){
                            //TODO error handle
                        });
        }
        function getEarthquakesPastWeek(){
            return $http.get('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
                        .success(function(response){
                            return response
                        })
                        .error(function(err){
                            //TODO error handle
                        });
        }
        function getEarthquakesPastMonth(){
            return $http.get('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
                        .success(function(response){
                            return response
                        })
                        .error(function(err){
                            //TODO error handle
                        });
        }
    }
})();
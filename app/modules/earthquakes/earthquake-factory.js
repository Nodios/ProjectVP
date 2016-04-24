(function() {
    'use strict';

    angular
        .module('main')
        .factory('EarthQuakeFactory', EarthQuakeFactory);

    EarthQuakeFactory.$inject = ['ngResource'];

    /* @ngInject */
    function EarthQuakeFactory() {
        var service = {
            getEarthquakes: getEarthquakes
        };
        return service;

        ////////////////

        function getEarthquakes() {

        }
    }
})();
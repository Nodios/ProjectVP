(function() {
    'use strict';

    angular
        .module('earthquake')
        .controller('NearbyCitiesController', NearbyCitiesController);

    NearbyCitiesController.$inject = ['$scope', '$state', '$stateParams', 'EarthquakeFactory'];

    /* @ngInject */
    function NearbyCitiesController($scope, $state, EarthquakeFactory) {
    	var self = this;

    	var data = null;

    	$scope.hasLoadedData = false;

        activate();

        ////////////////

        function activate() {
        	data = EarthquakeFactory.getNearbyCities();
        	data.then(function(result) {
        		var x = result;
        	}
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('googlemap')
        .directive('googleMap', GoogleMap);

    GoogleMap.$inject = [];

    function GoogleMap() {    	
        var directive = {
        	restricted: 'E', //use directive as an element
        	replace: true,
        	scope: {
        		mapData: "@" //geojson url goes here
        	},
        	template: '<div id="map"></div>',
        	link: link
        };
        return directive;

        function link(scope, element, attrs) {

        	var options = {
        		zoom: 2,
        		center: {lat:0, lng:0},
        		mapTypeId: google.maps.MapTypeId.STAELLITE
        	};

        	var map = new google.maps.Map(document.getElementById('map'), options);
        	map.data.loadGeoJson(attrs.mapdata);
        }
    }
})();
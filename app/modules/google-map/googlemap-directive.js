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
        		mapData: "@", //geojson url goes here
                earthquakeData: "="
        	},
        	template: '<div id="map"></div>',
        	link: link
        };
        return directive;

        function link(scope, element, attrs) {

        	var options = {
        		zoom: 2,
                scrollwheel: false,
                scaleControl: false,
                streetViewControl: false,
                disableDoubleClickZoom: true,
                mapTypeControl: false,
        		center: {lat:0, lng:0},
        		mapTypeId: google.maps.MapTypeId.STAELLITE
        	};

        	var map = new google.maps.Map(document.getElementById('map'), options);
            map.data.setStyle(styleFeature);
        	map.data.loadGeoJson(attrs.mapdata);

            map.data.addListener('click', getData);

            function styleFeature(feature) {
                var low = [151, 83, 34];
                var high = [5, 69, 54];
                var minMag = 1.0;
                var maxMag = 6.0;
                var fraction = (Math.min(feature.getProperty('mag'), maxMag) - minMag) / (maxMag - minMag);

                var color = interpolateHsl(low, high, fraction);

                return {
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        strokeWeight: 0.5,
                        strokeColor: '#fff',
                        fillColor: color,
                        fillOpacity: 2 / feature.getProperty('mag'),
                        scale: Math.pow(feature.getProperty('mag'), 2)
                    },
                    zIndex: Math.floor(feature.getProperty('mag'))
                };
            }

            function interpolateHsl(lowHsl, highHsl, fraction) {
                var color = [];
                for (var i = 0; i < 3; i++) {
                  color[i] = (highHsl[i] - lowHsl[i]) * fraction + lowHsl[i];
                }

                return 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)';
            }

            function getData(event){
                //Here is clicked marker data
                var data = event.feature[Object.keys(event.feature)[2]];
                scope.earthquakeData = data;
            }
        }
    }
})();
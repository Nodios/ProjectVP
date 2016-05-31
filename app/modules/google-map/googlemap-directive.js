(function() {
    'use strict';

    angular
        .module('googlemap')
        .directive('googleMap', GoogleMap);

    GoogleMap.$inject = ['$state'];

    function GoogleMap($state) {    	
        var directive = {
        	restricted: 'E', //use directive as an element
        	replace: true,
        	scope: {
        		mapData: "=", //geojson url goes here
                zoom: "@",
                lat: "@",
                lng: "@",
                cities: "=",
                earthquakeData: "="
        	},
        	template: '<div id="map"></div>',
        	link: link
        };
        return directive;

        function link(scope, element, attrs) {

            var x = parseFloat(attrs.lat);
            var y = parseFloat(attrs.lng);

        	var options = {
        		zoom: parseInt(attrs.zoom),
                scrollwheel: false,
                scaleControl: false,
                streetViewControl: false,
                disableDoubleClickZoom: true,
                mapTypeControl: false,
        		center: {lat:0, lng:0},
        		mapTypeId: google.maps.MapTypeId.STAELLITE
        	};

        	var map = new google.maps.Map(document.getElementById('map'), options);
            map.setCenter(new google.maps.LatLng(x,y));

            //add earthquake marker
            if(x != 0 || y != 0){
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(x,y),
                    icon: {
                        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                        scale: 5,
                        strokeWeight:2,
                        strokeColor:"#B40404"
                    }
                });
                marker.setMap(map);
            }

            //add nearby cities markers
            var cities = scope.cities;
            for(var city in cities){
                createGMapCityMarker(cities[city], map);
            }

            map.data.setStyle(styleFeature);
            if(attrs.mapdata != "null"){
        	   map.data.loadGeoJson(attrs.mapdata);
            }

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
                $state.go('earthquake', {earthquakeUrl: data.detail});
            }

            function createGMapCityMarker(city, gMap){
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(city.latitude, city.longitude),
                    title: city.name
                });
                marker.setMap(gMap);

                var cityDetails = '<p>City name: </p><strong>' + city.name + '</strong> <br>' +
                    '<p>Direction from earthquake: </p><strong>' + city.direction + '</strong> <br>' +
                    '<p>Distance from earthquake: </p><strong>' + city.distance + 'km</strong> <br>' +
                    '<p>City population: </p><strong>' + city.population + '</strong> ' +
                    '<p>If population is 1, real population is unknown.</p>'

                var infoWindow = new google.maps.InfoWindow({
                    content: cityDetails
                });

                marker.addListener('click',function(){
                    infoWindow.open(gMap, marker);
                })
            }
        }
    }
})();
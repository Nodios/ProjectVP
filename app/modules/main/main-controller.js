(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$state'];


    function MainController($scope, $state) {
        var self = this;
        
        $scope.title = "Earthquake monitor and statistics";
        $scope.message = "This is confirmation that this works";

        activate();

        function activate() {
        }
    }
})();
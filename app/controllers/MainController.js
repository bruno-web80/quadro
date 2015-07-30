'use strict';
angular.module('controllers').controller('MainController', ['$scope', function($scope) {
    console.log('--- controllers :: MainController');
    $scope.$on('$viewContentLoaded', function() {
        //Metronic.initComponents(); // init core components
        //Layout.init();
    });
}]);

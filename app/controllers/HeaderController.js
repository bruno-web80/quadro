'use strict';
angular.module('controllers').controller('HeaderController', ['$scope', function($scope) {
    console.log('--- controllers :: HeaderController');
    $scope.$on('$viewContentLoaded', function() {
        initSideNav();
    });
}]);

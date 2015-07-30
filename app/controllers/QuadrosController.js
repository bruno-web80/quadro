'use strict';
angular.module('controllers').controller('QuadrosController', ['$scope','Horario', function($scope, Horario) {
    console.log('--- controllers :: QuadrosController');
    $scope.$on('$viewContentLoaded', function() {

    });

    


    Horario.getAll().then(function(retorno){
      console.log(retorno);
    },function(erro){
      alert(erro);
    });




}]);

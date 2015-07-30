'use strict';
angular.module('controllers').controller('CursosController', ['$scope','Curso', function($scope, Curso) {
    console.log('--- controllers :: CursosController');
    $scope.$on('$viewContentLoaded', function() {

    });

    var resetForm = function() {
      //EFETUA O RESET COM VALORES PADRÕES
      Curso.reset().then(function(data){
        $scope.curso = data;
      }, function(erro){
        alert(erro);
      });
    }; resetForm();

    var getAll = function() {
      //RECUPERA TODOS OS REGISTROS (init)
      Curso.getAll().then(function(retorno){
        $scope.cursos = retorno;
      },function(erro){
        alert(erro);
      });
    }; getAll();

    //EXCLUI UM REGISTRO
    $scope.delete = function(_id) {
      if (confirm("Tem certeza de que deseja excluir esse registro?")==true) {
        Curso.delete(_id).then(function(retorno){
          getAll();
        },function(erro){
          alert(erro);
        });
      }
    };

    //SALVA O REGISTRO
    $scope.save = function() {
      Curso.save($scope.curso).then(function(retorno){
          resetForm();
          getAll();
      },function(erro){
          alert(erro);
      });

    };

}]);

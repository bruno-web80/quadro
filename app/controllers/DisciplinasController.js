'use strict';
angular.module('controllers').controller('DisciplinasController', ['$scope','Disciplina', function($scope, Disciplina) {
    console.log('--- controllers :: DisciplinasController');
    $scope.$on('$viewContentLoaded', function() {

    });

    var resetForm = function() {
      //EFETUA O RESET COM VALORES PADRÕES
      Disciplina.reset().then(function(data){
        $scope.disciplina = data;
      }, function(erro){
        alert(erro);
      });
    }; resetForm();

    //RECUPERA TODOS OS REGISTROS (init)
    Disciplina.getAll().then(function(retorno){
      $scope.disciplinas = retorno;
    },function(erro){
      alert(erro);
    });

    //EXCLUI UM REGISTRO
    $scope.delete = function(_id) {
      if (confirm("Tem certeza de que deseja excluir esse registro?")==true) {
        Disciplina.delete(_id).then(function(retorno){
        },function(erro){
          alert(erro);
        });
      }
    };

    //SALVA O REGISTRO
    $scope.save = function() {
      Disciplina.save($scope.disciplina).then(function(retorno){
          resetForm();
      },function(erro){
          alert(erro);
      });

    };


}]);

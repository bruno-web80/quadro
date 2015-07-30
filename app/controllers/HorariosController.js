'use strict';
angular.module('controllers').controller('HorariosController', ['$scope','Horario', function($scope, Horario) {
    console.log('--- controllers :: HorariosController');
    $scope.$on('$viewContentLoaded', function() {

    });

    $scope.periodos = ['Matutino','Vespertino','Noturno'];
    $scope.dias = ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'];

    //EFETUA O RESET COM VALORES PADRÕES
    Horario.reset().then(function(data){
      $scope.horario = data;
    }, function(erro){
      alert(erro);
    });

    var resetForm = function() {
      $scope.horario.descricao='';
    };

    //RECUPERA TODOS OS REGISTROS (init)
    Horario.getAll().then(function(retorno){
      $scope.horarios = retorno;
    },function(erro){
      alert(erro);
    });

    //EXCLUI UM REGISTRO
    $scope.delete = function(_id) {
      if (confirm("Tem certeza de que deseja excluir esse registro?")==true) {
        Horario.delete(_id).then(function(retorno){
        },function(erro){
          alert(erro);
        });
      }
    };

    //SALVA O REGISTRO
    $scope.save = function() {
      Horario.save($scope.horario).then(function(retorno){
          resetForm();
      },function(erro){
          alert(erro);
      });

    };

}]);

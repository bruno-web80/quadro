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

    $scope.resetForm = function() {
      if ($scope.horario!=undefined && $scope.horario.descricao!=undefined) {
        $scope.horario.descricao='';
      }
    }; $scope.resetForm();

    var getAll = function() {
      //RECUPERA TODOS OS REGISTROS (init)
      Horario.getAll().then(function(retorno){
        $scope.horarios = retorno;
      },function(erro){
        alert(erro);
      });
    }; getAll();

    //EXCLUI UM REGISTRO
    $scope.delete = function(_id, ev) {
      angular.element(ev.target).parents('.collapsible-header:first').addClass('active'); //FIX OPEN
      if (confirm("Tem certeza de que deseja excluir esse registro?")==true) {
        Horario.delete(_id).then(function(retorno){
          getAll();
        },function(erro){
          alert(erro);
        });
      }
    };

    $scope.edit = function(_id, ev) {
      angular.element(ev.target).parents('.collapsible-header:first').addClass('active'); //FIX OPEN
      if ($scope.horario.id!=undefined && $scope.horario.id == _id) {
          $scope.resetForm();
      } else {
        Horario.getById(_id).then(function(retorno){
          $scope.horario = retorno;
          //getAll();
        },function(erro){
          alert(erro);
        });
      }
    };

    //SALVA O REGISTRO
    $scope.save = function() {
      Horario.save($scope.horario).then(function(retorno){
          $scope.resetForm();
          getAll();
      },function(erro){
          alert(erro);
      });

    };

}]);

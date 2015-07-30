'use strict';
angular.module('controllers').controller('TurmasController', ['$scope','Turma','Curso', function($scope, Turma, Curso) {
    console.log('--- controllers :: TurmasController');
    $scope.$on('$viewContentLoaded', function() {

    });

    var resetForm = function() {
      //EFETUA O RESET COM VALORES PADRÕES
      Turma.reset().then(function(data){
        $scope.turma = data;
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

      Turma.getAll().then(function(retorno){
        $scope.turmas = retorno;
        angular.forEach($scope.turmas, function(obj,i){
          //RESOLVENDO NOME DO CURSO (não é necessário caso utilize banco de dados com activerecord)
          if (obj.curso_id!=undefined) {
            Curso.getById(obj.curso_id).then(function(retorno) {
                $scope.turmas[i]['curso'] = retorno;
            },function(error){
              alert(error);
            });
          }
        });
      },function(erro){
        alert(erro);
      });
    }; getAll();

    //EXCLUI UM REGISTRO
    $scope.delete = function(_id) {
      if (confirm("Tem certeza de que deseja excluir esse registro?")==true) {
        Turma.delete(_id).then(function(retorno){
          getAll();
        },function(erro){
          alert(erro);
        });
      }
    };

    //SALVA O REGISTRO
    $scope.save = function() {
      Turma.save($scope.turma).then(function(retorno){
          resetForm();
          getAll();
      },function(erro){
          alert(erro);
      });

    };


}]);

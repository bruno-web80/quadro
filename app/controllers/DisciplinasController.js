'use strict';
angular.module('controllers').controller('DisciplinasController', ['$scope','Disciplina','Curso', function($scope, Disciplina, Curso) {
    console.log('--- controllers :: DisciplinasController');
    $scope.$on('$viewContentLoaded', function() {

    });

    $scope.resetForm = function() {
      //EFETUA O RESET COM VALORES PADRÕES
      Disciplina.reset().then(function(data){
        $scope.disciplina = data;
      }, function(erro){
        alert(erro);
      });
    }; $scope.resetForm();

    var getAll = function() {
      //RECUPERA TODOS OS REGISTROS (init)
      Disciplina.getAll().then(function(retorno){
        $scope.disciplinas = retorno;
        angular.forEach($scope.disciplinas, function(obj1,i1){
          $scope.disciplinas[i1]['cursos']=[];
          //RESOLVENDO NOME DO CURSO (não é necessário caso utilize banco de dados com activerecord)
          if (obj1.cursos_id!=undefined) {
            angular.forEach(obj1.cursos_id, function(id,i2){
              Curso.getById(id).then(function(retorno) {
                  $scope.disciplinas[i1]['cursos'][i2] = retorno;
              },function(error){
                alert(error);
              });
            });
          }
        });
      },function(erro){
        alert(erro);
      });
      Curso.getAll().then(function(retorno){
        $scope.cursos = retorno;
      },function(erro){
        alert(erro);
      });
    }; getAll();

    //EXCLUI UM REGISTRO
    $scope.delete = function(_id, ev) {
      angular.element(ev.target).parents('.collapsible-header:first').addClass('active'); //FIX OPEN
      if (confirm("Tem certeza de que deseja excluir esse registro?")==true) {
        Disciplina.delete(_id).then(function(retorno){
          getAll();
        },function(erro){
          alert(erro);
        });
      }
    };

    $scope.edit = function(_id, ev) {
      angular.element(ev.target).parents('.collapsible-header:first').addClass('active'); //FIX OPEN
      if ($scope.disciplina.id!=undefined && $scope.disciplina.id == _id) {
          $scope.resetForm();
      } else {
        Disciplina.getById(_id).then(function(retorno){
          $scope.disciplina = retorno;
          //getAll();
        },function(erro){
          alert(erro);
        });
      }
    };

    //SALVA O REGISTRO
    $scope.save = function() {
      Disciplina.save($scope.disciplina).then(function(retorno){
          $scope.resetForm();
          getAll();
      },function(erro){
          alert(erro);
      });
    };

    $scope.toggleCursoDisciplina = function(curso_id) {
      if ($scope.disciplina.cursos_id==undefined) $scope.disciplina['cursos_id']=[];
      var index = $scope.disciplina.cursos_id.indexOf(curso_id);
      if (index > -1) {
        $scope.disciplina.cursos_id.splice(index,1);
      } else {
        $scope.disciplina.cursos_id.push(curso_id);
      }
    };

}]);

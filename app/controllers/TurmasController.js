'use strict';
angular.module('controllers').controller('TurmasController', ['$scope','Turma','Curso','Disciplina','Grade', function($scope, Turma, Curso, Disciplina, Grade) {
    console.log('--- controllers :: TurmasController');
    $scope.$on('$viewContentLoaded', function() {

    });

    $scope.resetForm = function() {
      //EFETUA O RESET COM VALORES PADRÕES
      Turma.reset().then(function(data){
        $scope.turma = data;
      }, function(erro){
        alert(erro);
      });
    }; $scope.resetForm();

    var getAll = function() {
      //RECUPERA TODOS OS REGISTROS (init)
      Curso.getAll().then(function(retorno){
        $scope.cursos = retorno;
      },function(erro){
        alert(erro);
      });
      Disciplina.getAll().then(function(retorno){
        $scope.disciplinas = retorno;
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
          $scope.turmas[i]['disciplinas']=[];
          //RESOLVENDO NOME DA DISCIPLINA (não é necessário caso utilize banco de dados com activerecord)
          if (obj.disciplinas_id!=undefined) {
            angular.forEach(obj.disciplinas_id, function(id,i2){
              Disciplina.getById(id).then(function(retorno) {
                  $scope.turmas[i]['disciplinas'][i2] = retorno;
              },function(error){
                alert(error);
              });
            });
          }

        });
      },function(erro){
        alert(erro);
      });
    }; getAll();

    //EXCLUI UM REGISTRO
    $scope.delete = function(_id, ev) {
      angular.element(ev.target).parents('.collapsible-header:first').addClass('active'); //FIX OPEN
      if (confirm("Tem certeza de que deseja excluir esse registro?")==true) {
        Turma.delete(_id).then(function(retorno){
          getAll();
        },function(erro){
          alert(erro);
        });
      }
    };

    $scope.edit = function(_id, ev) {
      angular.element(ev.target).parents('.collapsible-header:first').addClass('active'); //FIX OPEN
      if ($scope.turma.id!=undefined && $scope.turma.id == _id) {
          $scope.resetForm();
      } else {
        Turma.getById(_id).then(function(retorno){
          $scope.turma = retorno;
          //getAll();
        },function(erro){
          alert(erro);
        });
      }
    };

    //SALVA O REGISTRO
    $scope.save = function() {
      Turma.save($scope.turma).then(function(retorno){
          $scope.resetForm();
          getAll();
          Grade.make();
      },function(erro){
          alert(erro);
      });

    };

    $scope.toggleTurmaDisciplina = function(disciplina_id) {
      if ($scope.turma.disciplinas_id==undefined) $scope.turma['disciplinas_id']=[];
      var index = $scope.turma.disciplinas_id.indexOf(disciplina_id);
      if (index > -1) {
        $scope.turma.disciplinas_id.splice(index,1);
      } else {
        $scope.turma.disciplinas_id.push(disciplina_id);
      }
    };

    $scope.inCurso = function(disciplina) {
      return disciplina.cursos_id.indexOf(parseInt($scope.turma.curso_id))>-1;
    };


}]);

'use strict';
angular.module('controllers').controller('GradesController', ['$scope','Grade','Curso','Disciplina','Professor','Turma', function($scope, Grade, Curso, Disciplina, Professor, Turma) {
  console.log('--- controllers :: GradesController');
  $scope.$on('$viewContentLoaded', function() {

  });

  $scope.resetForm = function() {
    //EFETUA O RESET COM VALORES PADRÕES
    Grade.reset().then(function(data){
      $scope.grade = data;
    }, function(erro){
      alert(erro);
    });
  }; $scope.resetForm();

  var getAll = function() {
    Grade.getAll().then(function(retorno){
      $scope.grades = retorno;
    },function(erro){
      alert(erro);
    });
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
    Professor.getAll().then(function(retorno){
      $scope.professores = retorno;
    },function(erro){
      alert(erro);
    });
    Turma.getAll().then(function(retorno){
      $scope.turmas = retorno;
    },function(erro){
      alert(erro);
    });
  }; getAll();

  //EXCLUI UM REGISTRO
  $scope.delete = function(_id, ev) {
    angular.element(ev.target).parents('.collapsible-header:first').addClass('active'); //FIX OPEN
    if (confirm("Tem certeza de que deseja excluir esse registro?")==true) {
      Grade.delete(_id).then(function(retorno){
        getAll();
      },function(erro){
        alert(erro);
      });
    }
  };

  $scope.edit = function(_id, ev) {
    angular.element(ev.target).parents('.collapsible-header:first').addClass('active'); //FIX OPEN
    if ($scope.grade.id!=undefined && $scope.grade.id == _id) {
        $scope.resetForm();
    } else {
      Grade.getById(_id).then(function(retorno){
        $scope.grade = retorno;
        //getAll();
      },function(erro){
        alert(erro);
      });
    }
  };

  //SALVA O REGISTRO
  $scope.save = function() {
    Grade.save($scope.grade).then(function(retorno){
      $scope.resetForm();
      getAll();
    },function(erro){
      alert(erro);
    });
  };

  $scope.getById = function(_obj,_id) {
    var selObj={};
    angular.forEach(_obj,function(el,i){
      if (el.id!=undefined && el.id==_id) {
        selObj = el;
      }
    });
    return selObj;
  }


}]);

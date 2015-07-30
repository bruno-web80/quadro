'use strict';
angular.module('controllers').controller('ProfessoresController', ['$scope','Professor', 'Disciplina','Horario', function($scope, Professor, Disciplina, Horario) {
    console.log('--- controllers :: ProfessoresController');
    $scope.$on('$viewContentLoaded', function() {

    });
    var resetForm = function() {
      //EFETUA O RESET COM VALORES PADRÕES
      Professor.reset().then(function(data){
        $scope.professor = data;
      }, function(erro){
        alert(erro);
      });
    }; resetForm();

    var getAll = function() {
      //RECUPERA TODOS OS REGISTROS (init)
      Professor.getAll().then(function(retorno){
        $scope.professores = retorno;
      },function(erro){
        alert(erro);
      });

      //RECUPERA TODAS AS DISCIPLINAS
      Disciplina.getAll().then(function(retorno){
        $scope.disciplinas = retorno;
      },function(erro){
        alert(erro);
      });

      //RECUPERA TODAS OS HORÁRIOS
      Horario.getAll().then(function(retorno){
        $scope.horarios = retorno;
      },function(erro){
        alert(erro);
      });
    }; getAll();

    //EXCLUI UM REGISTRO
    $scope.delete = function(_id) {
      if (confirm("Tem certeza de que deseja excluir esse registro?")==true) {
        Professor.delete(_id).then(function(retorno){
          getAll();
        },function(erro){
          alert(erro);
        });
      }
    };

    //SALVA O REGISTRO
    $scope.save = function() {
      Professor.save($scope.professor).then(function(retorno){
          resetForm();
          getAll();
      },function(erro){
          alert(erro);
      });

    };

    //GRAVA ALTERAÇÃO NO HORÁRIO DO PROFESSOR
    $scope.toggleProfessorHorario = function(professor_id, horario_id) {
      var professorObj = {};
      Professor.getById(professor_id).then(function(retorno){
        professorObj = retorno;
        if (professorObj.horarios_id==undefined) professorObj['horarios_id']=[];
        var index = professorObj.horarios_id.indexOf(horario_id);
        if (index > -1) {
          professorObj.horarios_id.splice(index,1);
        } else {
          professorObj.horarios_id.push(horario_id);
        }
      },function(erro){

      });
    };

    $scope.toggleProfessorDisciplina = function(professorObj, disciplina_id) {
      if (professorObj.disciplinas_id==undefined) professorObj['disciplinas_id']=[];
      var index = professorObj.disciplinas_id.indexOf(disciplina_id);
      if (index > -1) {
        professorObj.disciplinas_id.splice(index,1);
      } else {
        professorObj.disciplinas_id.push(disciplina_id);
      }
      if (professorObj.id==undefined) {
        $scope.professor = professorObj;
      } else {
        Professor.save(professorObj);
      }
    }

}]);

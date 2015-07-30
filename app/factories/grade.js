angular.module('factories').factory('Grade', ['localDB', function(localDB) {

    var _resource = 'grades';
    return {
        reset: function(){ return localDB.reset(_resource); },
        getAll: function(){ return localDB.getAll(_resource); },
        getById: function(_id){ return localDB.getById(_resource, _id); },
        getByKey: function(_key, _value){ return localDB.getByKey(_resource, _key, _value); },
        getNewId: function(){ return localDB.getNewId(_resource); },
        delete: function(_id){ return localDB.delete(_resource, _id); },
        save: function(_data){ return localDB.save(_resource, _data); },
        make: function(){
          //APAGA TODAS AS GRADES PARA FAZER NOVAMENTE
          localDB.destroy(_resource);

          //FUNÇÃO RESPONSÁVEL POR CRIAR A GRADE BASEADO NOS CURSOS, DISCIPLINAS E TURMAS
          localDB.getAll('turmas').then(function(_turmas) {
            angular.forEach(_turmas,function(_turma,i){
              angular.forEach(_turma.disciplinas_id,function(_disciplina_id,i) {
                  var newGrade = {curso_id:_turma.curso_id, turma_id:_turma.id, disciplina_id: _disciplina_id, professor_id: null, carga_horaria: null}
                  localDB.save(_resource, newGrade);
              });
            });
          },function(erro){

          });
        }
    };

}]);

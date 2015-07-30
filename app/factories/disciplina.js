angular.module('factories').factory('Disciplina', ['localDB', function(localDB) {

    var _resource = 'disciplinas';
    return {
        reset: function(){ return localDB.reset(_resource); },
        getAll: function(){ return localDB.getAll(_resource); },
        getById: function(_id){ return localDB.getById(_resource, _id); },
        getByKey: function(_key, _value){ return localDB.getByKey(_resource, _key, _value); },
        getNewId: function(){ return localDB.getNewId(_resource); },
        delete: function(_id){ return localDB.delete(_resource, _id); },
        save: function(_data){ return localDB.save(_resource, _data); },
    };

}]);

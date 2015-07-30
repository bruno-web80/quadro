'use strict';

angular.module('controllers', ['ngStorage','ui.materialize']);
angular.module('services', ['ngStorage']);
angular.module('factories', []);

var web80App = angular.module('web80', [
  'ui.router',
  'angular.filter',
  'controllers',
  'services',
  'factories'
]);

web80App.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

  var timestamp = new Date().getTime(); //FIX CACHE

  // Redirect any unmatched url
  $urlRouterProvider.otherwise("/");

  $stateProvider
          .state('main', {
              //abstract: true,
              views: {
                  "vwHeader@main": {
                      templateUrl: 'app/views/common/header.html?'+timestamp,
                      controller: 'HeaderController'
                  },
                  "vwFooter@main": {
                      templateUrl: 'app/views/common/footer.html?'+timestamp,
                      //controller: 'FooterController'
                  },
                  "@": {
                      templateUrl: 'app/views/main.html?'+timestamp,
                      controller: 'MainController'
                  }
              },
              resolve: {
                  currentUser: function($rootScope) {
                  }
              }
          })
          .state('main.home', {
              url: "/",
              data: {pageTitle: 'Home', pageSubTitle: 'Home'},
              views: {
                  "@main": {
                      templateUrl: 'app/views/home.html?'+timestamp,
                      controller: 'HomeController'
                  }
              }
          })
          .state('main.cursos', {
              url: "/cursos",
              data: {pageTitle: 'Cursos', pageSubTitle: 'Cursos'},
              views: {
                  "@main": {
                      templateUrl: 'app/views/cursos.html?'+timestamp,
                      controller: 'CursosController'
                  }
              }
          })
          .state('main.disciplinas', {
              url: "/disciplinas",
              data: {pageTitle: 'disciplinas', pageSubTitle: 'disciplinas'},
              views: {
                  "@main": {
                      templateUrl: 'app/views/disciplinas.html?'+timestamp,
                      controller: 'DisciplinasController'
                  }
              }
          })
          .state('main.horarios', {
              url: "/horarios",
              data: {pageTitle: 'horarios', pageSubTitle: 'horarios'},
              views: {
                  "@main": {
                      templateUrl: 'app/views/horarios.html?'+timestamp,
                      controller: 'HorariosController'
                  }
              }
          })
          .state('main.professores', {
              url: "/professores",
              data: {pageTitle: 'professores', pageSubTitle: 'professores'},
              views: {
                  "@main": {
                      templateUrl: 'app/views/professores.html?'+timestamp,
                      controller: 'ProfessoresController'
                  }
              }
          })
          .state('main.turmas', {
              url: "/turmas",
              data: {pageTitle: 'turmas', pageSubTitle: 'turmas'},
              views: {
                  "@main": {
                      templateUrl: 'app/views/turmas.html?'+timestamp,
                      controller: 'TurmasController'
                  }
              }
          })
          .state('main.grades', {
              url: "/grades",
              data: {pageTitle: 'grades', pageSubTitle: 'grades'},
              views: {
                  "@main": {
                      templateUrl: 'app/views/grades.html?'+timestamp,
                      controller: 'GradesController'
                  }
              }
          })
          .state('main.quadros', {
              url: "/quadros",
              data: {pageTitle: 'quadros', pageSubTitle: 'quadros'},
              views: {
                  "@main": {
                      templateUrl: 'app/views/quadros.html?'+timestamp,
                      controller: 'QuadrosController'
                  }
              }
          })

}]);

web80App.run(["$rootScope","$state", function($rootScope,$state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);

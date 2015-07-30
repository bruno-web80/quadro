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

  // Redirect any unmatched url
  $urlRouterProvider.otherwise("/");

  $stateProvider
          .state('main', {
              //abstract: true,
              views: {
                  "vwHeader@main": {
                      templateUrl: 'app/views/common/header.html',
                      controller: 'HeaderController'
                  },
                  "vwFooter@main": {
                      templateUrl: 'app/views/common/footer.html',
                      //controller: 'FooterController'
                  },
                  "@": {
                      templateUrl: 'app/views/main.html',
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
                      templateUrl: 'app/views/home.html?1',
                      controller: 'HomeController'
                  }
              }
          })
          .state('main.cursos', {
              url: "/cursos",
              data: {pageTitle: 'Cursos', pageSubTitle: 'Cursos'},
              views: {
                  "@main": {
                      templateUrl: 'app/views/cursos.html?1',
                      controller: 'CursosController'
                  }
              }
          })
          .state('main.disciplinas', {
              url: "/disciplinas",
              data: {pageTitle: 'disciplinas', pageSubTitle: 'disciplinas'},
              views: {
                  "@main": {
                      templateUrl: 'app/views/disciplinas.html?2',
                      controller: 'DisciplinasController'
                  }
              }
          })
          .state('main.horarios', {
              url: "/horarios",
              data: {pageTitle: 'horarios', pageSubTitle: 'horarios'},
              views: {
                  "@main": {
                      templateUrl: 'app/views/horarios.html?3',
                      controller: 'HorariosController'
                  }
              }
          })
          .state('main.professores', {
              url: "/professores",
              data: {pageTitle: 'professores', pageSubTitle: 'professores'},
              views: {
                  "@main": {
                      templateUrl: 'app/views/professores.html?2',
                      controller: 'ProfessoresController'
                  }
              }
          })
          .state('main.turmas', {
              url: "/turmas",
              data: {pageTitle: 'turmas', pageSubTitle: 'turmas'},
              views: {
                  "@main": {
                      templateUrl: 'app/views/turmas.html?2',
                      controller: 'TurmasController'
                  }
              }
          })
          .state('main.quadros', {
              url: "/quadros",
              data: {pageTitle: 'quadros', pageSubTitle: 'quadros'},
              views: {
                  "@main": {
                      templateUrl: 'app/views/quadros.html?2',
                      controller: 'QuadrosController'
                  }
              }
          })

}]);

web80App.run(["$rootScope","$state", function($rootScope,$state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);

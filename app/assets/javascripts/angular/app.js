angular.module('pageBuilder', ['ui.router', 'templates', 'froala', 'xeditable', 'ui.sortable'])
    .config(
      function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
          .state('newSite', {
            url: '/',
            templateUrl: '_home.html',
            controller: 'BuildCtrl'
          })

          .state('index', {
            url: '/builder',
            templateUrl: '_builder.html',
            controller: 'BuildCtrl'
          })

          .state('sites', {
            url: '/kot',
            template: '<h1> {{test}} </h1>',
            controller: 'MainCtrl'
          })

          .state('Site', {
            url: '/newSite',
            templateUrl: 'site/_new.html',
            controller: 'BuildCtrl'
          });

          $locationProvider.html5Mode({
             enabled: true,
             requireBase: false
          });

        // $urlRouterProvider.otherwise('/');
      })

      .value('froalaConfig', {
          toolbarInline: false,
          placeholderText: 'Enter Text Here',
          dragInline: true
      })

      .run(function(editableOptions) {
        editableOptions.theme = 'bs3';
      });

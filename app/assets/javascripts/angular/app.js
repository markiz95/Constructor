angular.module('pageBuilder', ['ui.router', 'templates', 'froala'])
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
            url: '/sites/new',
            template: '_home.html',
            controller: 'MainCtrl'
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
      });


// <div class=\"col-sm-4\">\ forcePlaceholderSize: true,
//        One of three columns\n\n\n\n\n\n\n\
//      </div>\
//      <div class=\"col-sm-4\">\
//        One of three columns\n\n\n\n\n\n\n\
//      </div>\
//      <div class=\"col-sm-4\">\
//        One of three columns\n\n\n\n\n\n\n\
//      </div>

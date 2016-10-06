angular.module('pageBuilder',
      ['ui.router', 'templates', 'froala', 'xeditable', 'ui.sortable',
      'ngSanitize', 'yaru22.angular-timeago', 'angular-jqcloud'])
    .config(
      function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
          .state('root', {
            url: '/',
            templateUrl: '_home.html',
            controller: 'SiteViewCtrl'
          })

          .state('user', {
            url: '/users/{userId}',
            templateUrl: '_user.html',
            controller: 'UserCtrl'
          })

          .state('builder', {
            url: '/builder',
            templateUrl: '_builder.html',
            controller: 'BuildCtrl'
          })

          .state('sites', {
            url: '/sites',
            templateUrl: 'site/_index.html',
            controller: 'SiteViewCtrl'
          })

          .state('show', {
            url: '/sites/{id:int}',
            templateUrl: 'site/_show.html',
            controller: 'SiteViewCtrl'
          })

          .state('new', {
            url: '/sites/new',
            templateUrl: 'site/_new.html',
            controller: 'SiteCtrl'
          })

          .state('tag', {
            url: '/sites/{tag}',
            templateUrl: 'site/_index.html',
            controller: function($stateParams, $scope, $http){
              $http.get('/api/sites.json',{ params: { tag: $stateParams.tag } })
                .then(function(response){
                  $scope.sites = response.data;
                });
           }});

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
      })

      .service('sampleService', function($http){
        var tags = [];
        var siteName = 'My site';
        this.setSiteName = function(data){
          siteName = data;
        }
        this.getSiteName = function(){
          return siteName;
        }
        this.setTags = function(data){
          tags = data;
        }
        this.getTags = function(){
          return tags;
        }
        this.getCurrentUser = function(){
          $http.get('/me.json').then(function(response){
            return response.data;
          } , function(response){
            return undefined;
          });
        }
      });

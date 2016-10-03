angular.module('pageBuilder', ['ui.router', 'templates', 'froala', 'xeditable', 'ui.sortable', 'ngSanitize'])
    .config(
      function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
          .state('root', {
            url: '/',
            templateUrl: '_home.html',
            controller: 'SiteCtrl'
          })

          .state('builder', {
            url: '/builder',
            templateUrl: '_builder.html',
            controller: 'BuildCtrl'
          })

          .state('sites', {
            url: '/sites',
            templateUrl: '_home.html',
            controller: 'SiteCtrl'
          })

          .state('show', {
            url: '/sites/{id:int}',
            templateUrl: 'site/_show.html',
            controller: 'SiteViewCtrl'
          })

          .state('new Site', {
            url: '/sites/new',
            templateUrl: 'site/_new.html',
            controller: 'SiteCtrl'
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

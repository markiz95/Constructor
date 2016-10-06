angular.module('pageBuilder',
  ['ui.router', 'permission', 'permission.ui','templates', 'froala', 'xeditable', 'ui.sortable',
   'ngSanitize', 'yaru22.angular-timeago', 'angular-jqcloud', 'ngCookies', 'ngMessages'])
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
            controller: 'BuildCtrl',
            data: {
              permissions: {
                except: 'guest',
                redirectTo: '403'
              }
            }
          })

          .state('sites', {
            url: '/sites',
            templateUrl: 'site/_index.html',
            controller: 'SiteViewCtrl'
          })

          .state('show', {
            url: '/sites/{id:int}',
            templateUrl: 'site/_show.html',
            controller: 'ShowCtrl'
          })

          .state('403', {
            url: '/403',
            templateUrl: '_403.html'
          })

          .state('404', {
            url: '/404',
            templateUrl: '_404.html'
          })

          .state('new', {
            url: '/sites/new',
            templateUrl: 'site/_new.html',
            controller: 'SiteCtrl',
            data: {
              permissions: {
                except: 'guest',
                redirectTo: '403'
              }
            }
          })

          .state('tag', {
            url: '/sites/{tag}',
            templateUrl: 'site/_index.html',
            controller: function($stateParams, $scope, $http){
              $http.get('/api/sites.json',{ params: { tag: $stateParams.tag } })
                .then(function(response){
                  $scope.sites = response.data;
                });
            }
         });

        //  $urlRouterProvider.otherwise( function($injector) {
        //     var $state = $injector.get("$state");
        //     $state.go('404');
        //   });

          $locationProvider.html5Mode({
             enabled: true,
             requireBase: false
          });
      })

      .value('froalaConfig', {
          toolbarInline: false,
          placeholderText: 'Enter Text Here',
          dragInline: true
      })

      .run(function(editableOptions, sampleService, PermPermissionStore, $cookies, $stateParams) {
        var id = $cookies.get('user_id');
        var role = $cookies.get('user_role');

        PermPermissionStore.definePermission('guest', function () {
          return id === undefined;
        });
        PermPermissionStore.definePermission('user', function () {
          return id !== undefined;
        });
        PermPermissionStore.definePermission('author', function () {
          return role == 'admin';
        });
        PermPermissionStore.definePermission('author', function () {
          return id == $stateParams.userId;
        });

        editableOptions.theme = 'bs3';
      })

      .service('sampleService', function(){
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
      }});

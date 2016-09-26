var myApp = angular.module('myapplication', ['ui.router', 'templates']);


myApp.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('newSite', {
      url: '/sites/new',
      templateUrl: 'site/_new.html',
      controller: 'UserListCtr'
    });
    // .state('home', {
    //   url: '/',
    //   templateUrl: '_home.html',
    //   controller: 'UserListCtr'
    // });

  $urlRouterProvider.otherwise('/sites/new');
}])

myApp.controller("UserListCtr", ['$scope', function($scope) {

}]);

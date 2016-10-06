angular.module('pageBuilder').controller("UserCtrl", function($scope, $http, $stateParams){

  $http.get('/api/users/'+$stateParams.userId+'.json')
    .then(function(response){
      $scope.user = response.data;
      $scope.sites = response.data.sites;
      var comments = response.data.comments;
      var views = 0;

      $scope.sites.forEach(function(item){
        views+= item.views;
      });

      $scope.sitesCount = $scope.sites.length;
      $scope.totalViews = views;
      $scope.commentsCount = comments.length;
    });


})

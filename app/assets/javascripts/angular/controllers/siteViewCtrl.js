angular.module('pageBuilder').controller("SiteViewCtrl",  function($scope, $http, $stateParams) {

  $http.get('/api/sites/'+$stateParams.id+'.json')
    .then(function(response){
      $scope.site = response.data;
      $scope.currentPageContent = $scope.site.pages[0].body;
    });

  function updateSites() {
    $http.get('/api/sites/'+$stateParams.id+'.json')
      .then(function(response){
        $scope.sites = response.data;
      });
  };

  $('.page-view').on("click", "#n", function() {
    var index = $(this).parent().children().index(this);
    $scope.currentPageContent = $scope.site.pages[index].body;
  });

  $http.get('/api/sites.json')
    .then(function(response){
      $scope.sites = response.data;
    });

  $scope.deleteSite = function(id){
    $http.delete('/api/sites/'+id)
      .then(function(response){
        updateSites();
      });
  };

})

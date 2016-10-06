angular.module('pageBuilder')
  .controller("SiteViewCtrl",  function($scope, $http, $stateParams, $location, $rootScope) {

  $scope.words = [];
  $scope.colors = ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976"];

  $scope.deleteSite = function(id){
    $http.delete('/api/sites/'+id)
      .then(function(response){
        updateSites();
      });
  };

  //add tags to cloud
  $http.get('/api/tags.json')
    .then(function(response){
      var tags = response.data;
      tags.forEach(function(item, i, arr) {
        $scope.words.push({text: item, weight: getRandomArbitary()})
      });
    });

  $http.get('/api/sites.json').then(function(response){
    $scope.sites = response.data;
  });

  function getRandomArbitary() {
    return Math.random() * (7) + 2;
  };

  function updateSites() {
    $http.get('/api/sites/'+$stateParams.id+'.json')
      .then(function(response){
        $scope.sites = response.data;
      });
  };

  $('#tag-cloud').on("click", "span", function() {
     var tag = $(this).text();
     $location.path('/sites/'+tag);
  });

})

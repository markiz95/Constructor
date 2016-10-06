angular.module('pageBuilder')
  .controller("SiteViewCtrl",  function($scope, $http, $stateParams, $location) {

  $scope.words = [];
  $scope.colors = ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976"];
  $scope.newCommentBody = "";

  $scope.deleteSite = function(id){
    $http.delete('/api/sites/'+id)
      .then(function(response){
        updateSites();
      });
  };

  $scope.addComment = function(){
    var data = { comment: {body: $scope.newCommentBody}}
    $http.post('/api/sites/'+$stateParams.id+'/comments', data)
    .success(function(comment) {
      $scope.site.comments.push(comment);
    });
    $scope.newCommentBody = "";
  };

  $http.get('/api/tags.json')
    .then(function(response){
      var tags = response.data;
      tags.forEach(function(item, i, arr) {
        $scope.words.push({text: item, weight: getRandomArbitary()})
      });
    });

  $http.get('/api/sites/'+$stateParams.id+'.json')
    .then(function(response){
      $scope.site = response.data;
      $scope.currentPageContent = $scope.site.pages[0].body;
    });

  $http.get('/api/sites.json')
    .then(function(response){
      $scope.sites = response.data;
    });

  $http.put('/api/sites/'+$stateParams.id+'/upviews.json')
    .then(function(response){
      ++$scope.site.views;
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

  $('.page-view').on("click", "#n", function() {
    var index = $(this).parent().children().index(this);
    $scope.currentPageContent = $scope.site.pages[index].body;
  });

  $('#tag-cloud').on("click", "span", function() {
     var tag = $(this).text();
     $location.path('/sites/'+tag);
  });




})

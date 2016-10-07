angular.module('pageBuilder')
  .controller("ShowCtrl",  function($scope, $http, $stateParams, $cookies) {

  $scope.newCommentBody = "";
  $scope.userImage = $cookies.get('user_image')
  $http.get('/api/sites/'+$stateParams.id+'.json')
    .then(function(response){
      $scope.site = response.data;
      $scope.currentPageContent = $scope.site.pages[0].body;
    });

  $scope.addComment = function(){
    var data = { comment: {body: $scope.newCommentBody}}
    $http.post('/api/sites/'+$stateParams.id+'/comments', data)
    .success(function(comment) {
      $scope.site.comments.push(comment);
    });
    $scope.newCommentBody = "";
  };

  $http.put('/api/sites/'+$stateParams.id+'/upviews.json')
    .then(function(response){
      ++$scope.site.views;
    });

  $('.page-view').on("click", "#n", function() {
    var index = $(this).parent().children().index(this);
    $scope.currentPageContent = $scope.site.pages[index].body;
  });

})

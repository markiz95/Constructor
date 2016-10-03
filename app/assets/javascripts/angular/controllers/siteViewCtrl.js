angular.module('pageBuilder').controller("SiteViewCtrl",  function($scope, $http, $stateParams) {

  $http.get('/api/sites/'+$stateParams.id+'.json')
    .then(function(response){
      $scope.site = response.data;
    });
  $("li").click(function(){
    var index = $(this).parent().children().index(this);
    $(".page-view").html($scope.site.pages[index].body);
  });

})

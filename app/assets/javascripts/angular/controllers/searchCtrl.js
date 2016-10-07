angular.module('pageBuilder')
  .controller("SearchCtrl",  function($scope, $state, $location, sampleService) {

    $scope.startSearch = function(){
      sampleService.setSearch($scope.search);
      $scope.search = "";

      if($location.url() === '/search'){
        $state.reload();
      }
      else {
        $location.path('/search');
      }
    };
})

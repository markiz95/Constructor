angular.module('pageBuilder')
  .controller("oneMore",  function($scope, sampleService, results) {
    $scope.results = results;
    $scope.count = results.length;

    $scope.input = sampleService.getSearch();




})

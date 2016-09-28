angular.module('pageBuilder').controller("BuildCtrl",  function($scope) {
    $( function() {
      $( "#sortable" ).sortable({
        opacity: 0.7,
        tolerance: 'pointer'}).disableSelection();
    });

    $scope.pages = ["ppdfppsf",""];


    $scope.test = "BuildCtrl";
});

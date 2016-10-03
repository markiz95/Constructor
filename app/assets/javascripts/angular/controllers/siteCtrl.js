angular.module('pageBuilder').controller("SiteCtrl",  function($scope, $location, sampleService) {
  var tags = [];

  $.getJSON("/api/tags.json", function(data){
    $.each( data, function( i, value ) {
      tags.push(value);
    });
  });

  $("#myTags").tagit({
    availableTags: tags,
    autocomplete: {delay: 0, minLength: 1},
    removeConfirmation: true,
    allowSpaces: true
  });

  $scope.test = "SiteCtrl";
  $scope.siteName = "My Site";

  $scope.toBuilder = function() {
    $location.path("/builder");
    sampleService.setSiteName($scope.siteName);
    sampleService.setTags($("#myTags").tagit("assignedTags"));
  };

})

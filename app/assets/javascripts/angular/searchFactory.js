angular.module('pageBuilder').factory('searches', function($http){
  return {
        get: function(input){
          var promise = $http({
              url: '/api/sites/search.json',
              method: "GET",
              params: {search: input}
           }).then(function(res){
            return res.data;
          });
          return promise;
        }
    };
})

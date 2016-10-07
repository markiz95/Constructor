angular.module('pageBuilder').factory('sites', function($http){
  return {
        get: function(id){
          var promise = $http.get('/api/sites/'+id+'.json').then(function(res){
            return res.data;
          });
          return promise;
        }
        // dodo: function(){
        //   var data = { search: "Zaka" }
        //   var res = $http.get('/api/sites/search.json',data: data).then(function(res){
        //     return res.data;
        //   });
        //   return res;
        // }
    };

  // var factory = {};
  //
  // factory.get = function(id){
  //   var promise = $http.get('api/sites/'+id+'.json').then(function(res){
  //     return res.data;
  //   });
  //   return promise;
  // };

})

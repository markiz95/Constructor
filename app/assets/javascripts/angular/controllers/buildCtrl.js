angular.module('pageBuilder').controller("BuildCtrl", function($scope, $http, sampleService) {

    var span = document.getElementsByClassName("close")[0];
    var modal = document.getElementById('myModal');
    var newPageModal = document.getElementById('newPage');
    var tags = sampleService.getTags();
    var currentPageIndex = 0;
    var siteName = sampleService.getSiteName();
    var navbar =
        "<nav class=\"navbar navbar-inverse\">\
             <div class=\"container-fluid\">\
               <div class=\"navbar-header\">\
                 <a class=\"navbar-brand\" >"+siteName+"</a>\
               </div>\
               <ul class=\"nav navbar-nav\" id=\"builder-nav\">\
                 <li id=\"n\"><a href=\"#\">Home</a></li>\
               </ul>\
             </div>\
         </nav>";
    var layout = "<table id=\"layout\"><tr><td></td><td></td></tr></table>";
    var layout2 = "<div class=\'col-sm-12\'></div>";
    var initPage = { name: "Home", body: navbar+layout2 };

    $scope.pages = [initPage];
    $scope.newPageName = "New page";
    $scope.currentPageContent = $scope.pages[currentPageIndex].body;
    $scope.currentLayout = layout2
    $scope.layouts = [];

    $.getJSON("/api/layouts.json", function(data){
      $.each( data, function( i, value ) {
        $scope.layouts.push({name: value[0], body: value[1]});
      });
    });

    function updateNavigation(){
      var list = "";

      for (var i = 0; i < $scope.pages.length; i++)
        list+= "<li id=\"n\"><a href=\"#\">"+$scope.pages[i].name+"</a></li>";
      for(var i = 0; i < $scope.pages.length; i++)
        $scope.pages[i].body = $scope.pages[i].body.replace(/<li id=\"n\".*\/li>/,list);

      $scope.currentPageContent = $scope.pages[currentPageIndex].body;
    }

    span.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
    }

    $scope.showModal = function(){
      newPageModal.style.display = "block";
    };

    $scope.hideModal = function(){
      newPageModal.style.display = "none";
    };

    $scope.getClass = function(idx) {
      if (idx == currentPageIndex) return "current";
    };

    $scope.addPage = function(){
      var newPage = { name: $scope.newPageName, body: navbar + $scope.currentLayout };
      $scope.pages.push(newPage);
      $scope.newPageName = "New page";
      currentPageIndex = $scope.pages.length-1;
    };

    $scope.changePage = function(page){
      currentPageIndex = $scope.pages.indexOf(page);
      $scope.currentPageContent = $scope.pages[currentPageIndex].body;
    };

    $scope.removePage = function(page){
      if ($scope.pages.length > 1) {
        var index = $scope.pages.indexOf(page);
        $scope.pages.splice(index,1);
        $scope.changePage($scope.pages[index-1]);
      }
      else
        modal.style.display = "block";
    };

    $scope.save = function(){
      var tagsAsString = tags.join();
      var data = {
        site: {
          name: siteName,
          tag_list: tagsAsString,
          pages_attributes: $scope.pages
        }
      };
      var res = $http.post('/api/sites.json', data);
      res.success(function(data, status, headers, config) {
  			alert("success");
  		});
      res.error(function(data, status, headers, config) {
  			alert( "failure message: " + JSON.stringify({data: data}));
  		});
    };

    $scope.froalaOptions = {
      height: 700,

      theme: 'gray',
      fontFamily: {
        "Roboto,sans-serif": 'Roboto',
        "Oswald,sans-serif": 'Oswald',
        "Montserrat,sans-serif": 'Montserrat',
        "'Open Sans Condensed',sans-serif": 'Open Sans Condensed'
      },
      fontFamilySelection: true,
      tabSpaces: 4,
      language: 'ru',
      enter: $.FroalaEditor.ENTER_BR,

      imageUploadURL: '	https://api.cloudinary.com/v1_1/page-builder/image/upload',

      events : {
        'froalaEditor.contentChanged' : function(e, editor){
          $scope.pages[currentPageIndex].body = $('.fr-view').html();
        }
          // 'froalaEditor.image.error' : function (e, editor, error, response) {
          //   console.log(error.code);
          // }
      }};

    $( function() {
      $( "#sortable" ).sortable({
        opacity: 0.7}).disableSelection();
    });

    $('#sortable').bind("DOMSubtreeModified",function(){
      updateNavigation();
    });

    $('.right-sidebar-toggle').click(function () {
        $('#right-sidebar').toggleClass('sidebar-open');
    });


});
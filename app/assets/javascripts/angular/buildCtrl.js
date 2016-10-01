angular.module('pageBuilder').controller("BuildCtrl",  function($scope) {

    var span = document.getElementsByClassName("close")[0];
    var modal = document.getElementById('myModal');
    var newPageModal = document.getElementById('newPage');
    var currentPageIndex = 0;
    var navbar =
        "<nav class=\"navbar navbar-inverse\">\
             <div class=\"container-fluid\">\
               <div class=\"navbar-header\">\
                 <a class=\"navbar-brand\" >WebSiteName</a>\
               </div>\
               <ul class=\"nav navbar-nav\" id=\"builder-nav\">\
                 <li id=\"n\"><a href=\"#\">Home</a></li>\
               </ul>\
             </div>\
         </nav>";
    var layout = "<table id=\"layout\"><tr><td></td><td></td></tr></table>";
    var layout2 = "<div class=\'col-sm-12\'></div>";
    var initPage = {title: "Home", body: navbar+layout};

    $scope.pages = [initPage];
    $scope.layouts = [
        {name: "common",      body:"<div class=\'col-sm-12\'></div>" },
        {name: "two columns", body: "<table id=\"layout\"><tr><td></td><td></td></tr></table>"},
        {name: "row and two columns", body: "<table id=\"layout\"><tr><td colspan=\"2\"></td></tr><tr><td></td><td></td></tr></table>"}
    ];
    $scope.newPageTitle = "New page";
    $scope.currentPageContent = $scope.pages[currentPageIndex].body;
    $scope.currentLayout = $scope.layouts[0].body;

    function updateNavigation(){
      var list = "";

      for (var i = 0; i < $scope.pages.length; i++)
        list+= "<li id=\"n\"><a href=\"#\">"+$scope.pages[i].title+"</a></li>";
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
      var newPage = {title: $scope.newPageTitle, body: navbar + $scope.currentLayout};
      $scope.pages.push(newPage);
      $scope.newPageTitle = "New page";
    };

    $scope.changePage = function(page){
      currentPageIndex = $scope.pages.indexOf(page);
      $scope.currentPageContent = $scope.pages[currentPageIndex].body;
    };

    $scope.removePage = function(page){
      if ($scope.pages.length > 1) {
        var index = $scope.pages.indexOf(page);
        $scope.pages.splice(index,1);
        $scope.changePage($scope.pages[0]);
      }
      else
        modal.style.display = "block";
    };

    $scope.froalaOptions = {
      heightMin: 400,
      heightMax: 750,
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
        // 'froalaEditor.contentChanged' : function(e, editor){
        //   $scope.pages[currentPageIndex].body = $('.fr-view').html();
        // }
          'froalaEditor.image.error' : function (e, editor, error, response) {
            console.log(error.code);
          }
      }};

    $( function() {
      $( "#sortable" ).sortable({
        opacity: 0.7}).disableSelection();
    });

    $('#sortable').bind("DOMSubtreeModified",function(){
      updateNavigation();
    });


});

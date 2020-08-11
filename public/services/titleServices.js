(function(){

    var app = angular.module('titleServices',[]);

    app.config(function(){

        //console.log("titleServices Loaded and Initialized...")

    });

    app.factory('Title', function(){

        titleFactory = {};

        titleFactory.changeTitle = function(){

            //rootScope.title 

        }

        return titleFactory;

    });




}())
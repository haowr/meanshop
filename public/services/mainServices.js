////console.log("mainService loaded");
(function(){

var app = angular.module('mainServices',[]);

app.config(function(){

////console.log("mainServices injected and initialized");

});

app.factory('Main',function($http){

mainFactory = {};

//Main.getShoes
mainFactory.read = function(){

   return $http.get('/api/shoes');

};


return mainFactory;

});





}());
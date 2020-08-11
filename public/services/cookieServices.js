(function(){

var app = angular.module('cookieServices',[]);

app.factory('Cookie',function($window){

var cookieFactory = {};

cookieFactory.getCookieHearts = function(){

    return $window.localStorage.getItem('hearto');


}
cookieFactory.setHearto = function(value){

    return $window.localStorage.setItem('hearto',value);
}
cookieFactory.setCookieHearts = function(value){

    return $window.localStorage.setItem('cookieHearts',value);
}


return cookieFactory;


});


}());
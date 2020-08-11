(function(){

var app = angular.module('authServices',[]);

app.config(function(){

//console.log("Testing Auth Services");

});

app.factory('Auth', function($http, AuthToken,$window,$q){  //a way to organize the code..
//Auth.create(regData);
var authFactory = {};
 authFactory.login = function(loginData){

     return $http.post('/api/authenticate',loginData).then(function(data){
        AuthToken.setToken(data.data.token);
        return data;

     }); //no need for "this.regData"
 };

 //Auth.isLoggedIn()

 authFactory.isLoggedIn = function(){
     if(AuthToken.getToken()){
        return true;

     }else{
         return false;
     }

     
 };

//Auth.getUser()

 authFactory.getUser = function(){

    if(AuthToken.getToken()){

        return $http.post('/api/me');
    }else{
        $q.reject({message: 'User has no token'})
    }

 };
 //Auth.Logout();
 authFactory.logout = function(){
    AuthToken.setToken();
    $window.localStorage.removeItem('myLoves');
    $window.localStorage.removeItem('cookieHearts');
    $window.localStorage.removeItem('grandTotal');
    $window.localStorage.removeItem('tax');
    $window.localStorage.removeItem('shippingChoice');
 };
 return authFactory;

});

//AuthToken.setToken(data.data.token);
app.factory('AuthToken',function($window){
    var authTokenFactory = {};

    authTokenFactory.setToken = function(token){
        if(token){
            $window.localStorage.setItem('token',token);
        }else{
            $window.localStorage.removeItem('token');
        }
        

    };
//AuthToken.getToken();
    authTokenFactory.getToken = function(){
       return $window.localStorage.getItem('token');
    };
return authTokenFactory;
});

app.factory('AuthInterceptors',function(AuthToken){

    var authInterceptorsFactory = {};
    authInterceptorsFactory.request = function(config){

        var token = AuthToken.getToken();
        if (token) config.headers['x-access-token'] = token;

        return config;

    };
    return authInterceptorsFactory;

});


}());
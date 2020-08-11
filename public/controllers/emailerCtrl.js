(function(){

var app = angular.module('emailController',['userServices']);

                          
app.config(function(){

    //console.log("emailCtrl");

});



app.controller('emailCtrl', function($routeParams,User,$timeout, $location){

    //console.log("Hello from email ctrl");

    //console.log($routeParams.token);
    scope= this;

    User.activateAccount($routeParams.token).then(function(data){
        //console.log(data.data.message);
        //console.log(data.data.success);

        scope.successMsg = false;
        scope.errorMsg = false;
        

        if(data.data.success){

            scope.successMsg = data.data.message +"...Redirecting";
            $timeout(function(){
                    $location.path('/login');  //Redirect them to login page...
            },2000);

        }else{

            scope.errorMsg = data.data.message+"...Redirecting";
            $timeout(function(){
                    $location.path('/login');  //Redirect them to login page...
            },2000);
        }

    });

});
app.controller('resendCtrl',function(User){

    scope= this;
    scope.successMsg = false;
    scope.errorMsg = false;
    
    scope.checkCredentials = function(loginData) {
    scope.disabled = true;
        User.checkCredentials(scope.loginData).then(function(data){

            //console.log(data);
            if(data.data.success){

                User.resendLink(scope.loginData).then(function(data){
                    //console.log(data);
                    if(data.data.success){

                        scope.successMsg= data.data.message;
                    }
                });
            }else{
                        scope.disabled=false;
                        scope.errorMsg= data.data.message;
                    }

        });

    };


});

}());
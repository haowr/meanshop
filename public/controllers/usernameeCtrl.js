(function(){

    var app = angular.module('usernameController', ['userServices']);

    app.config(function(){

        //console.log("usernameController loaded and initialized...");

    });

    app.controller('usernameCtrl',function(User){

        scope = this;
        

        scope.sendUsername = function(userData,valid){
            scope.errorMsg= false;
            scope.loading=true;
            scope.disabled = true;

            ////console.log(scope.userData.email);
             if(valid){
                User.sendUsername(scope.userData.email).then(function(data){
                    scope.loading = false;
                    if(data.data.success){

                        scope.successMsg = data.data.message;
                    }else{
                        scope.disabled = false;
                        scope.errorMsg = data.data.message;
                    }
            });

             }else{
                 scope.loading = false;
                 scope.disabled = false;
                 scope.errorMsg="Please enter a valid e-mail";
             }



        };


    });



}());
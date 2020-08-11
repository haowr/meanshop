(function(){

    var app = angular.module('passwordController',['userServices']);

    app.config(function(){

        //console.log("passwordController loaded and initailized...")

    });

    app.controller('passwordCtrl',function(User){

        scope = this;
        

        scope.sendPassword= function(resetData,valid){
            scope.errorMsg= false;
            scope.successMsg= false;
            scope.loading=true;
            scope.disabled = true;

            //console.log(scope.resetData);
             if(valid){
                User.sendPassword(scope.resetData).then(function(data){

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
                 scope.errorMsg="Please enter a valid Username";
             }



        };


    });


    app.controller('resetCtrl',function(User,$routeParams,$scope,$timeout,$location){

        scope = this;
        scope.hide = true;


        //console.log($routeParams.token);   
        
       scope.savePassword = function(regData,valid,confirmed){
           scope.successMsg= false;
           scope.errorMsg=false;
           scope.disabled = true;
           scope.loading = true;
           
           if(valid && confirmed){
            scope.regData.username= $scope.username;
            scope.disabled = true;
            scope.loading = false;

            User.savePassword(scope.regData).then(function(data){


                

                if(data.data.success){

                    scope.disabled = true;
                    scope.successMsg = data.data.message+'..Redirecting';
                    $timeout(function(){

                        $location.path('/login');

                    },2000)

                }else{

                    scope.loading = false;
                    scope.disabled = false;
                    scope.errorMsg = data.data.message;

                }
            });
            

           }else{
            scope.loading = false;
            scope.disabled = false;
            scope.errorMsg= "Please ensure form is filled out properly...";

           }


       };     

        User.resetUser($routeParams.token).then(function(data){
            scope.successMsg = false;
            scope.errorMsg = false;

            if(data.data.success){
                scope.hide=false;
                scope.successMsg="Please enter a new password..."
                $scope.username = data.data.user.username;
                //console.log($scope.username);

            }else{
                scope.errorMsg = data.data.message;

            }

        //console.log(data);

       });





    });





}());
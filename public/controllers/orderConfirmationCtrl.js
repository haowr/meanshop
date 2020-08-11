(function(){


    var app = angular.module('orderConfirmationController',['authServices','emailServices','userServices']);

    app.config(function(){

        //console.log("orderConfirmationCtrl loaded and initialized..");


    });

    app.controller('orderConfirmationCtrl', function($window,$scope,Auth,Email,User,$rootScope,$timeout){

        $scope.isLoggedIn= false;
        $scope.currentUser;
        $scope.emailAdded=false;
        $scope.emailNotAdded=false;
        
        //console.log($scope.lastOrder);

        //console.log("hello");
       if(Auth.isLoggedIn()){

        $scope.isLoggedIn = true;
        Auth.getUser().then(function(data){

            //console.log(data.data.username);
            $scope.currentUser = data.data.username;
            User.getUserProfile(data.data.username).then(function(data){

                //console.log(data.data);
                $scope.lastOrder= data.data.user.shoppingbag;
                User.clearShoppingBag($scope.currentUser).then(function(data){
                        //console.log($scope.currentUser);
                        $rootScope.cartItems = data.data.user.shoppingbag.length;
                        //console.log(data.data);
                });


            });

        });

       }else{

        $scope.isLoggedIn = false;
        $scope.currentUser = $window.localStorage.getItem('guestName');
        $scope.lastOrder = JSON.parse($window.localStorage.getItem('checkoutArray'));
        $window.localStorage.setItem('checkoutArray',JSON.stringify([]));
        $rootScope.cartItems =0;

       }

        $scope.addToEmailList = function(emailListData, valid){

        //console.log("form submitted");
        //console.log(valid);
        //console.log(emailListData);
        //console.log(emailListData.email);
        $rootScope.EmailListEmail = emailListData;

        if(valid){
            
            //console.log($scope.emailAdded);
            
            Email.addToMailList(emailListData.email).then(function(data){
                //console.log(data.data);
                if(data.data.success){

                    User.sendEmailEmailList(emailListData.email).then(function(data){
                        $scope.emailAdded= true;
                        //console.log(data.data);
                    })
                    
                    $timeout(function(){
                        $scope.emailAdded=false;
                    },3000);
                }else{

                    $scope.emailNotAdded=true;
                }
                //console.log(data.data.message);
                //console.log(data.data);
            });
        }

     };


    });





}());
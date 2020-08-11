(function(){

    var app = angular.module('mensController', ['shopServices','authServices','userServices','heartServices','cookieServices']);

    app.config(function(){

        console.log("mensController loaded and initialized...");

    });

    app.controller('mensCtrl',function($routeParams,$route,Shop,$scope, $rootScope,Heart,Auth,$timeout,$location,User,$window,Cookie){
    console.log('"'+$routeParams.name+'"');
    
    $scope.shoppingCartNumber=0;
    $scope.imageIndex = 0;
    $scope.size = "S";
    $scope.selection = 1;
    $scope.shippingSelection = 0;
    $scope.hearts =false;
    $scope.fit =0;
    $rootScope.shipping= "SHIPPING: Receive Free Ground Shipping on orders over $75 by entering promotional code SMCAFREE75 at checkout. \
    Free Shipping promotion is valid within Canada except for the three territories; Northwest Territories, Nunavut, and Yukon. \
    Please note this promotion may not be combined with any other offers unless explicitly noted. The SMCAFREE75 code is not valid on Clearance Items. \
    ";
    
    $rootScope.returns = "RETURNS:\
    For your convenience, we accept online returns at Steve Madden stores within Canada.\
    We gladly accept returns of unworn merchandise within 30 days of delivery. \
    If there is no store near you then you may obtain return authorization via phone, Live Chat, e-mail or by signing into your account and going into your order. The authorization requests must be made within 30 days from when your order is delivered. \
    Shipping charges are not refundable and there is a $6.95 per order return fee that covers restocking and postage back to the warehouse. Clearance items and earring purchases cannot be returned or exchanged. \
    Click here to view our full Return Policy" ;
    $rootScope.heartss =$window.localStorage.getItem('cookieHearts');
    //console.log($rootScope.heartss);
    $scope.loadme = false;
    //$scope.open = false;
    $scope.amt = 0;
    $scope.newHeartValue=false;
    $scope.zoomValue =0;
    //$rootScope.heartActivated= false;
    $rootScope.heartactivated =false;
    $scope.activatedByName;
    $scope.addCookieHeart = 1;
    $scope.removeCookieHeart = 0;
    $scope.myLovesEach=[];
    $scope.checkout={};
    $scope.checkoutArray=[];
    $scope.newAdminProducts=[];
    $scope.adminProducts;
    $scope.happy=[{name: "Ras", size: "M", amt: "1", price: "322.00", description: "The head of our creations. The perfection of the way"}];
    console.log(JSON.stringify($scope.happy));
     if($window.localStorage.getItem($routeParams.name) == 1){
         $rootScope.heartactivated = true;
         console.log($rootScope.heartactivated);
     }else{
        $rootScope.heartactivated = false;
        console.log($rootScope.heartactivated);
     }
    //console.log($rootScope.myLoves);

  //$rootScope.myLoves =[];
  //$window.localStorage.removeItem('myLoves');
  //$window.localStorage.setItem($routeParams.name,$scope.removeCookieHeart);
  //$window.localStorage.setItem('cookieHearts',$scope.removeCookieHeart);
    //$window.localStorage.setItem('cookieHearts',$scope.addCookieHeart);
   
  
 
 

    Shop.getMensShoe($routeParams.name).then(function(data){
        $scope.mensShoe = data.data.allshoe[0];
        $scope.loadme=true;

        console.log(data.data.allshoe);
        console.log("SCOPEHEARTACTIVATED");
        console.log($scope.mensShoe.heartactivated);
    });
    $scope.checkoutFunc= function(){
        console.log(JSON.parse($window.localStorage.getItem('checkoutArray')));
        if(JSON.parse($window.localStorage.getItem('checkoutArray'))!== null){
            $scope.checkoutArray = JSON.parse($window.localStorage.getItem('checkoutArray'));
                   for(var i =0; i< $scope.checkoutArray.length; i++){
            console.log($scope.checkoutArray[i].name );
           // console.log($routeParams.name);
            if($scope.checkoutArray[i].name == $routeParams.name){
               $scope.checkoutArray.splice($scope.checkoutArray.indexOf($scope.checkoutArray[i]),1);
               console.log("hello");
            }

        }
        }
        
 
        console.log($scope.checkoutArray);
        $scope.shoppingCartNumber++
        $scope.checkout.name = $routeParams.name;
        $scope.checkout.size =  $scope.size;
        $scope.checkout.amt = $scope.amt;
        $scope.checkout.price = $scope.mensShoe.price+".00";
        $scope.checkout.description = $scope.mensShoe.description;
        $scope.checkout.available= $scope.mensShoe.available;
        $scope.checkout.image= $scope.mensShoe.perspectives[1];



        console.log($scope.checkout);
       $scope.checkoutArray.push($scope.checkout);
        $window.localStorage.setItem('checkoutArray',JSON.stringify($scope.checkoutArray));

       //////  var unique = $rootScope.myLoves.filter(function(elem, index, self) {
       ///     return index == self.indexOf(elem);
        //});
       // $rootScope.myLoves = unique;
        /*Shop.addToCheckout($scope.checkout).then(function(data){

            console.log(data.data.message);
            console.log(data.data);

        });
        */
        console.log("button pressed");
        console.log($scope.size);
        console.log($scope.amt);
        console.log($scope.mensShoe.name);
        console.log($routeParams.name);
        console.log($scope.mensShoe.price+".00");
        $window.localStorage.setItem('shoppingCartNumber',$routeParams.name);

    };
   /* Heart.isActivated($routeParams).then(function(data){

        console.log("heartActivated "+data.data.success);
        console.log(data.data);
                        if(data.data.active.heartactivated){
                    $scope.heartActivated = true;
                }else{
                     $scope.heartActivated = false;
                }
        console.log("$scope.heartActivated "+$scope.heartActivated);

    });
    */


    console.log("$scope.heartActivated: "+$scope.heartActivated);
    $scope.imageChange = function(index){
        $scope.imageIndex = index;
        console.log($scope.imageIndex);
    };
    $scope.changeSize = function(size){
        $scope.size = size;

    };
    $scope.changeQty = function(amt){
        $scope.amt = amt;

    };
    $scope.openDetails = function(){
        if($scope.selection === 0){
            $scope.selection = 1;
            $scope.shippingSelection = 1;
        }else{
            $scope.selection = 0;
            $scope.shippingSelection = 0;
        }
    };
    $scope.shippingDetails = function(){
        if($scope.selection === 0){
            $scope.shippingSelection = 1;
        }else{
            $scope.shippingSelection = 0;
        }
    };
    $scope.openFit = function(){
        if($scope.fit === 0){
            $scope.fit = 1;
        }else{
            $scope.fit = 0;
        }
    };
    $scope.zoom = function(){
        if($scope.zoomValue === 0){
            $scope.zoomValue =1;
        }else if($scope.zoomValue === 1){
            $scope.zoomValue = 2;
        }else if ($scope.zoomValue === 2){
            $scope.zoomValue  = 3;
        }else{
            $scope.zoomValue= 0;
        }


    };
    $scope.heartAdder = function(){

        console.log("new button press");
        
        
        //$rootScope.myLoves =[];
        //console.log($window.localStorage.getItem('myLoves'));
       // $window.localStorage.removeItem('myLoves');  //clear myLoves in cookies(localStorage)
        
       // $rootScope.myLoves.slice($rootScope.myLoves.indexOf(''),1);

       // $rootScope.myLoves.push($window.localStorage.getItem('myLoves').split(','));
      //  $rootScope.myLovesSplitter= $rootScope.myLoves.split(",");
        //$rootScope.myLoves = $rootScope.myLovesSplitter;
       /* var unique = $rootScope.myLoves.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        });
        $rootScope.myLoves = unique;
        console.log($scope.heartactivated); 
        */  

        $scope.open = true;
        console.log($scope.loading);
        console.log($window.localStorage.getItem('page'));
        console.log($window.localStorage.getItem($routeParams.name));
       // $rootScope.myLoves.push($routeParams.name);
        console.log($rootScope.myLoves);
        
        Cookie.setHearto($scope.removeCookieHeart);
        //Cookie.setCookieHearts($scope.removeCookieHeart);
        //$window.localStorage.setItem($routeParams.name,$scope.removeCookieHeart);
        //$window.localStorage.removeItem('hearto');
       // $scope.cookiePages.push($routeParams.name);
        //$window.localStorage.setItem($sope.cookiePages,$scope.cookiePages)
        if($window.localStorage.getItem($routeParams.name) != 1){
            $rootScope.heartactivated = true;
            console.log($rootScope.heartactivated);
              $rootScope.myLoves.push($routeParams.name);
            var unique = $rootScope.myLoves.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
            });
             $rootScope.myLoves = unique;
              console.log($rootScope.myLoves[0]);
              console.log($rootScope.myLoves);
              console.log($window.localStorage.getItem('myLoves'));
              if($window.localStorage.getItem('myLoves')!= null && $window.localStorage.getItem('cookieHearts') <=1 ){
                $rootScope.myLoves.push($window.localStorage.getItem('myLoves'));
                $window.localStorage.removeItem('myLoves',$rootScope.myLoves);  
                var unique = $rootScope.myLoves.filter(function(elem, index, self) {
                         return index == self.indexOf(elem);
              });
              $rootScope.myLoves = unique;
              $window.localStorage.setItem('myLoves',$rootScope.myLoves);  
              $window.localStorage.setItem($routeParams.name,$scope.addCookieHeart);
                              Heart.activateHeart($routeParams).then(function(data){
                    //console.log("did it work?");
                    //console.log("shoe.heartactivated = true");
                    //console.log(data.data.success);
                    console.log(data.data.shoe);
                    $scope.heartActivated = true;
                    console.log("$scope.heartActivated "+$scope.heartActivated);

                });
                
              //$scope.heartactivated = true;
              //console.log($scope.heartactivated);
              if(Auth.isLoggedIn()){
                 User.addLove($routeParams.name,$rootScope.usernamey).then(function(data){
                     console.log(data.data.message);
                     console.log(data.data);
                 });


              }

              $scope.cookieHearts = $window.localStorage.getItem('cookieHearts');
              $scope.cookieHearts = Number($scope.cookieHearts);
              console.log($scope.cookieHearts+$scope.addCookieHeart);
              $scope.newCookieHeart = $scope.cookieHearts + $scope.addCookieHeart;
              $window.localStorage.setItem('cookieHearts',$scope.newCookieHeart);
              Shop.incrementHearts($routeParams.name).then(function(data){

                    console.log(data.data.shoe);

              });
              //User.increaseAdminHearts($routeParams.name).then(function(data){
//
                //    console.log(data.data.admin);

              //});
               User.getProducts().then(function(data){

    $scope.adminProducts=data.data.user.products;
    console.log($scope.adminProducts[0].Ras);
    console.log($scope.adminProducts[0][$routeParams.name]+1);
    $scope.adminProducts[0][$routeParams.name]= $scope.adminProducts[0][$routeParams.name]+1;
    console.log($scope.adminProducts[0][$routeParams.name]);
    console.log($scope.adminProducts[0]);
    $scope.newAdminProducts.push($scope.adminProducts[0]);
    User.updateAdminProducts($scope.adminProducts[0]).then(function(data){

            console.log(data.data.user);

    });
   });
              $scope.adminProducts[0].$routeParams.name++;

               // $window.localStorage.setItem('cookieHearts',$scope.addCookieHeart);
              }else{
                $window.localStorage.removeItem('myLoves',$rootScope.myLoves);  
                $window.localStorage.setItem('myLoves',$rootScope.myLoves);  
                $window.localStorage.setItem($routeParams.name,$scope.addCookieHeart);
                
                //$timeout(function(){
                    $scope.open = true;
                    $rootScope.heartactivated = true;
                    console.log($rootScope.heartactivated);
                    Heart.activateHeart($routeParams).then(function(data){
                    //console.log("did it work?");
                    //console.log("shoe.heartactivated = true");
                    //console.log(data.data.success);
                        console.log(data.data.shoe);
                         $scope.heartActivated = true;
                        console.log("$scope.heartActivated "+$scope.heartActivated);

                    });
                

                if(Auth.isLoggedIn()){
                 User.addLove($routeParams.name,$rootScope.usernamey).then(function(data){
                     console.log(data.data.message);
                     console.log(data.data);
                 });


              }
                //$window.localStorage.setItem('cookieHearts',$scope.addCookieHeart);
                 $scope.cookieHearts = $window.localStorage.getItem('cookieHearts');
              $scope.cookieHearts = Number($scope.cookieHearts);
              console.log($scope.cookieHearts+$scope.addCookieHeart);
              $scope.newCookieHeart = $scope.cookieHearts + $scope.addCookieHeart;
              $window.localStorage.setItem('cookieHearts',$scope.newCookieHeart);
                Shop.incrementHearts($routeParams.name).then(function(data){

                    console.log(data.data.shoe);

                });
              /*  User.increaseAdminHearts($routeParams.name).then(function(data){

                    console.log(data.data.admin);

                });
                */
               User.getProducts().then(function(data){

    $scope.adminProducts=data.data.user.products;
    console.log($scope.adminProducts[0].Ras);
    console.log($scope.adminProducts[0][$routeParams.name]+1);
    $scope.adminProducts[0][$routeParams.name]= $scope.adminProducts[0][$routeParams.name]+1;
    console.log($scope.adminProducts[0][$routeParams.name]);
    console.log($scope.adminProducts[0]);
    $scope.newAdminProducts.push($scope.adminProducts[0]);
    User.updateAdminProducts($scope.adminProducts[0]).then(function(data){

            console.log(data.data.user);

    });
   });

              }
              

              /*$scope.cookieHearts = $window.localStorage.getItem('cookieHearts');
              $scope.cookieHearts = Number($scope.cookieHearts);
              console.log($scope.cookieHearts+$scope.addCookieHeart);
              $scope.newCookieHeart = $scope.cookieHearts + $scope.addCookieHeart;
              $window.localStorage.setItem('cookieHearts',$scope.newCookieHeart);
              */
            
        }/*else if($window.localStorage.getItem('cookieHearts') !=0 && window.localStorage.getItem($routeParams.name) != 1){
            $window.localStorage.setItem($routeParams.name,$scope.removeCookieHeart);
            $scope.cookieHearts = $window.localStorage.getItem('cookieHearts');
            $scope.cookieHearts = Number($scope.cookieHearts);
            console.log($scope.cookieHearts-$scope.addCookieHeart);
            $scope.newCookieHeart = $scope.cookieHearts - $scope.addCookieHeart;
            $window.localStorage.setItem('cookieHearts',$scope.removeCookieHeart);

        }*/else{
            $rootScope.heartactivated = false;
            console.log($rootScope.heartactivated);
            $rootScope.localStorageMyLovesString = $window.localStorage.getItem('myLoves');// retrieves myLoves from local storage as string....
            console.log($rootScope.localStorageMyLovesString);
           $rootScope.myLovesStringSplit = $rootScope.localStorageMyLovesString.split(",");// splits string into an array, with each shoe at its own index. Or returns shoe at zero index if one seperator exists..
            console.log($rootScope.myLovesStringSplit);
            console.log($routeParams.name);
          $rootScope.myLovesStringSplit.splice($rootScope.myLovesStringSplit.indexOf($routeParams.name),1);
            console.log($rootScope.myLovesStringSplit);
            $window.localStorage.setItem('myLoves',$rootScope.myLovesStringSplit);

            if(Auth.isLoggedIn()){
                 User.removeLove($routeParams.name,$rootScope.usernamey).then(function(data){
                     console.log(data.data.message);
                     console.log(data.data);
                 });
            }
            $window.localStorage.setItem($routeParams.name,$scope.removeCookieHeart);
                        Heart.deactivateHeart($routeParams).then(function(data){
                    console.log("did it work?");
                    console.log("activated");
                    console.log(data.data.success);
                    console.log(data.data.shoe);
                     $scope.heartActivated = false;
                     console.log("$scope.heartActivated "+$scope.heartActivated);

            });
            /*
                                Shop.decrementHearts($routeParams.name).then(function(data){

                    console.log(data.data.shoe);

              });
              */
           // $rootScope.heartactivated = false;
                            //$timeout(function(){
                    $scope.open = false;
                    $rootScope.heartactivated = false;
                //},200);
            //$scope.heartactivated= false;
            //console.log($scope.heartactivated);
            //$window.localStorage.setItem('cookieHearts',$scope.removeCookieHeart);
             $scope.cookieHearts = $window.localStorage.getItem('cookieHearts');
              $scope.cookieHearts = Number($scope.cookieHearts);
              console.log($scope.cookieHearts+$scope.addCookieHeart);
              if($scope.cookieHearts != 0){
                $scope.newCookieHeart = $scope.cookieHearts - $scope.addCookieHeart;
              $window.localStorage.setItem('cookieHearts',$scope.newCookieHeart);
              }else{
                $window.localStorage.setItem('cookieHearts',$scope.removeCookieHeart);   
              }
                //Shop.decrementHearts($routeParams.name).then(function(data){

                    //console.log(data.data.shoe);

                //});
                //User.decreaseAdminHearts($routeParams.name).then(function(data){

                   // console.log(data.data.admin);

                //});
               User.getProducts().then(function(data){

    $scope.adminProducts=data.data.user.products;
    console.log($scope.adminProducts[0].Ras);
    console.log($scope.adminProducts[0][$routeParams.name]+1);
    $scope.adminProducts[0][$routeParams.name]= $scope.adminProducts[0][$routeParams.name]-1;
    console.log($scope.adminProducts[0][$routeParams.name]);
    console.log($scope.adminProducts[0]);
    console.log($scope.adminProducts);

    $scope.newAdminProducts.push($scope.adminProducts[0]);
    User.updateAdminProducts($scope.adminProducts[0]).then(function(data){

            console.log(data.data.user);

    });
   });
              
              
            console.log($window.localStorage.getItem('myLoves'));
            if($window.localStorage.getItem('myLoves') == ""){
                $window.localStorage.removeItem('myLoves');
                $rootScope.myLoves = [];
            }

            //$scope.myLovesEach.push($window.localStorage.getItem('myLoves'));
           /* $rootScope.myLoves.splice(($rootScope.myLoves.length - 1),1);
            console.log("$rootScope.myLoves after splice")
            console.log($rootScope.myLoves);
            console.log($scope.myLovesEach);
            console.log($rootScope.myLoves[0]);
            $scope.myLoveSplit=$rootScope.myLoves[0].split(",");
            console.log($scope.myLoveSplit);
            $scope.myLoveSplit.forEach(function(element) {
                var i =  $scope.myLoveSplit.indexOf($routeParams.name);
                if(element == $routeParams.name){
                    $scope.myLoveSplit.splice(i,1);
                }
            });
            console.log($scope.myLoveSplit);
            console.log($window.localStorage.getItem('cookieHearts'));
            $scope.cookieHearts = $window.localStorage.getItem('cookieHearts');
            $scope.cookieHearts = Number($scope.cookieHearts);
            $scope.newCookieHeart = $scope.cookieHearts - $scope.addCookieHeart;

            $window.localStorage.setItem('myLoves',$scope.myLoveSplit); 
            $window.localStorage.setItem($routeParams.name,$scope.removeCookieHeart);
            $window.localStorage.setItem('cookieHearts',$scope.newCookieHeart);
           */
            
        }
        
       // Heart.whoActivated().then

       //$scope.activatedByName =  $window.localStorage.getItem($routeParams.name);
       console.log($routeParams.name);
        Heart.whoActivated().then(function(data){
            console.log(data.data);

        });

        if( !$scope.heartActivated){

                Heart.activateHeart($routeParams).then(function(data){
                    //console.log("did it work?");
                    //console.log("shoe.heartactivated = true");
                    //console.log(data.data.success);
                    console.log(data.data.shoe);
                    $scope.heartActivated = true;
                    console.log("$scope.heartActivated "+$scope.heartActivated);

                });
                   Heart.addHeart().then(function(data){
           console.log(data.data.value);
           $scope.newHeartValue = true;
           

        });
                       Heart.getHearts().then(function(data){
        console.log("getHearts has run...");
        console.log(data.data.hearts[0].hearts);
        $rootScope.heartss =$window.localStorage.getItem('cookieHearts');
       // $window.localStorage.setItem('cookieHearts',$rootScope.heartss);
       // $scope.loading = false;
    });

    }else {
            Heart.deactivateHeart($routeParams).then(function(data){
                    console.log("did it work?");
                    console.log("activated");
                    console.log(data.data.success);
                    console.log(data.data.shoe);
                     $scope.heartActivated = false;
                     console.log("$scope.heartActivated "+$scope.heartActivated);

            });
  

            Heart.removeHeart().then(function(data){
                console.log(data.data.success);
            })
            //$scope.newHeartValue = false;
                Heart.getHearts().then(function(data){
        console.log("getHearts has run...");
        console.log(data.data.hearts[0].hearts);
        $rootScope.heartss = $window.localStorage.getItem('cookieHearts');
       // $window.localStorage.setItem('cookieHearts',$rootScope.heartss);
        
       // $scope.loading = false;
    });
        }

       if( Auth.isLoggedIn()){
           console.log("logged in");
       }else{
            console.log("Not logged in!");
            $timeout(function(){
                $location.path('/login');

            },2000); 

       }


        
  
        //console.log(Heart.hearts);
        //Heart.hearts = $scope.newHeartValue + Heart
        //console.log($scope.newHeartValue);
      // $scope.newHeartValue = Heart.hearts++;
        //console.log($scope.newHeartValue);



//console.log($route);
    }

});



}());
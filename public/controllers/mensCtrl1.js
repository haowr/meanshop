(function(){

    var app = angular.module('mensController1', ['shopServices','authServices','userServices','heartServices','cookieServices']);

    app.config(function(){

        //console.log("mensController1 loaded and initialized...");

    });

    app.controller('mensCtrl1',function($routeParams,$route,Shop,$scope, $rootScope,Heart,Auth,$timeout,$location,User,$window,Cookie){
    //console.log('"'+$routeParams.name+'"');
    
    //$rootScope.title = $routeParams.name;
    $scope.loadmemensshoe = false;
   // $scope.loadme2 = false;
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
    
    ////console.log($rootScope.heartss);
    $scope.loadme = false;
    //$scope.open = false;
    $scope.amt = 0;
    $scope.noQty = false;
    $scope.newHeartValue=false;
    $scope.addedToCart = false;
    $scope.itemAddedToCart;
    $scope.zoomValue =0;
    //$rootScope.heartActivated= false;
    //$rootScope.heartactivated =true;
    $scope.activatedByName;
    $scope.addCookieHeart = 1;
    $scope.removeCookieHeart = 0;
   // $scope.totalHearts;
    $scope.myLovesEach=[];
    
    $scope.checkout={};
    $scope.checkoutArray=[];
    $scope.newAdminProducts=[];
    $scope.adminProducts;
    //$scope.happy=[{name: "Ras", size: "M", amt: "1", price: "322.00", description: "The head of our creations. The perfection of the way"}];
    ////console.log(JSON.stringify($scope.happy));

   /* if(Auth.isLoggedIn()){

        Auth.getUser().then(function(data){
            //console.log(data.data.username);
            $scope.currentUser = data.data.username;
            User.getUserProfile(data.data.username).then(function(data){
                //console.log(data.data.user.loves.length);
               
            
                var unique = data.data.user.loves.filter(function(elem, index, self) {
                    return index == self.indexOf(elem);
                });
                 $rootScope.heartss = unique.length;
                User.findLove($scope.currentUser,$routeParams.name).then(function(data){

                    //console.log(data.data.success);
                    if(data.data.success){

                        $rootScope.heartactivated = true;
                        $window.localStorage.setItem($routeParams.name,$scope.addCookieHeart);
                        //console.log($rootScope.heartactivated);
                       
                        //console.log("loadme@!!!!");
                    }else{
                        $rootScope.heartactivated = false;
                        $window.localStorage.setItem($routeParams.name,$scope.removeCookieHeart);
                        //console.log($rootScope.heartactivated);
                    }

                })
                
            })

        });


    }

     if($window.localStorage.getItem($routeParams.name) == 1){
         $rootScope.heartactivated = true;
         //console.log($rootScope.heartactivated);
     }else{
        $rootScope.heartactivated = false;
        //console.log($rootScope.heartactivated);
     }
    ////console.log($rootScope.myLoves);

  //$rootScope.myLoves =[];
  //$window.localStorage.removeItem('myLoves');
  //$window.localStorage.setItem($routeParams.name,$scope.removeCookieHeart);
  //$window.localStorage.setItem('cookieHearts',$scope.removeCookieHeart);
    //$window.localStorage.setItem('cookieHearts',$scope.addCookieHeart);
   
  
 
 //var getShoes = function(){

 

  /*  Shop.getMensShoe($routeParams.name).then(function(data){
        $scope.mensShoe = data.data.allshoe[0];
        
        $rootScope.totalHearts = data.data.allshoe[0].hearts;
        //console.log(data.data.allshoe);
        //console.log("SCOPEHEARTACTIVATED");
        //console.log($scope.mensShoe.hearts);
        //console.log($scope.mensShoe.heartactivated);
        //console.log("loadme2 is running!");
        //$scope.loadme2 = true;
    });

 */
 /*
    $scope.checkoutFunc= function(){
       // //console.log(JSON.parse($window.localStorage.getItem('checkoutArray')));
       if($scope.amt == 0){

            $scope.noQty=true;

       }
       if($scope.amt !== 0 ){

             
        //console.log($scope.checkoutArray);
        $scope.shoppingCartNumber++
        $scope.checkout.name = $routeParams.name;
        $scope.checkout.size =  $scope.size;
        $scope.checkout.amt = $scope.amt;
        $scope.checkout.price = $scope.mensShoe.price+".00";
        $scope.checkout.description = $scope.mensShoe.description;
        $scope.checkout.available= $scope.mensShoe.available;
        $scope.checkout.image= $scope.mensShoe.perspectives[1];



        //console.log($scope.checkout);
        if(!Auth.isLoggedIn() && $window.localStorage.getItem('checkoutArray') != null){

                 $scope.checkoutArray= JSON.parse($window.localStorage.getItem('checkoutArray'));
                 $scope.checkoutArray.push($scope.checkout);
                 //console.log($scope.checkoutArray);
                 
                 $rootScope.cartItems = $scope.checkoutArray.length;
                 $scope.addedToCart = true;
                 $scope.itemAddedToCart = $routeParams.name;
                 $window.localStorage.setItem('checkoutArray',JSON.stringify($scope.checkoutArray));
                 $timeout(function(){

                        $scope.addedToCart = false;

                 },2500);

        }else if(!Auth.isLoggedIn() && $window.localStorage.getItem('checkoutArray') == null) {
            
                //$scope.checkoutArray= JSON.parse($window.localStorage.getItem('checkoutArray'));
                $scope.checkoutArray.push($scope.checkout);
                //console.log($scope.checkoutArray);
                $scope.addedToCart = true;
                $rootScope.cartItems = $scope.checkoutArray.length;
                $scope.itemAddedToCart = $routeParams.name;
                $window.localStorage.setItem('checkoutArray',JSON.stringify($scope.checkoutArray));
                $timeout(function(){

                        $scope.addedToCart = false;

                },2500);

        }
       
       //////  var unique = $rootScope.myLoves.filter(function(elem, index, self) {
       ///     return index == self.indexOf(elem);
        //});
       // $rootScope.myLoves = unique;
        /*Shop.addToCheckout($scope.checkout).then(function(data){

            //console.log(data.data.message);
            //console.log(data.data);

        });
        *//*

        //console.log("button pressed");
        //console.log($scope.size);
        //console.log($scope.amt);
        //console.log($scope.mensShoe.name);
        //console.log($routeParams.name);
        //console.log($scope.mensShoe.price+".00");
        $window.localStorage.setItem('shoppingCartNumber',$routeParams.name);

       }
        if(Auth.isLoggedIn() && $scope.amt !== 0){

            Auth.getUser().then(function(data){

                            //console.log("OY");
                    $scope.shoppingCartNumber++
                    $scope.checkout.name = $routeParams.name;
                    $scope.checkout.size =  $scope.size;
                    $scope.checkout.amt = $scope.amt;
                    $scope.checkout.price = $scope.mensShoe.price+".00";
                    $scope.checkout.description = $scope.mensShoe.description;
                    $scope.checkout.available= $scope.mensShoe.available;
                    $scope.checkout.image= $scope.mensShoe.perspectives[1];
                    $scope.checkout.username = data.data.username;
                    $scope.checkoutArray.push($scope.checkout);

                     User.addToShoppingBag( $scope.checkout).then(function(data){
                            //console.log(data.data);
                            $rootScope.cartItems = data.data.user.shoppingbag.length;
                                             $scope.addedToCart = true;
                 $scope.itemAddedToCart = $routeParams.name;
                            $timeout(function(){

                                $scope.addedToCart = false;

                            },2500);
                    });

                    User.getLoves()


            })



        Auth.getUser().then(function(data){

                    //console.log(data.data);

        });



    }
        //if($window.localStorage.getItem('checkoutArray') === null || $window.localStorage.getItem('checkoutArray') !== "" ){


           // //console.log("Not Null!");
            //$scope.checkoutArray = [];
            //$window.localStorage.setItem('checkoutArray', $scope.checkoutArray);

       // }//COME BACK AND CHECK FOR ERRORS
       /* if(JSON.parse($window.localStorage.getItem('checkoutArray'))!== null){ //JSON.parse($window.localStorage.getItem('checkoutArray'))
            //console.log($window.localStorage.getItem('checkoutArray'));
            $scope.checkoutArray = JSON.parse($window.localStorage.getItem('checkoutArray'));
            $rootScope.cartItems = $scope.checkoutArray.length;
            //console.log($scope.checkoutArray.length);
                   for(var i =0; i< $scope.checkoutArray.length; i++){
            //console.log($scope.checkoutArray[i].name );
           // //console.log($routeParams.name);
            if($scope.checkoutArray[i].name == $routeParams.name){
               $scope.checkoutArray.splice($scope.checkoutArray.indexOf($scope.checkoutArray[i]),1);
               //console.log("hello");
            }

        }
        }
        */


    
   /* Heart.isActivated($routeParams).then(function(data){

        //console.log("heartActivated "+data.data.success);
        //console.log(data.data);
                        if(data.data.active.heartactivated){
                    $scope.heartActivated = true;
                }else{
                     $scope.heartActivated = false;
                }
        //console.log("$scope.heartActivated "+$scope.heartActivated);

    });
    */
/*
    var changeTitle = function(){

        $rootScope.title ="HOJ | "+ $routeParams.name;

    }
    changeTitle();
    //console.log("$scope.heartActivated: "+$scope.heartActivated);
    $scope.imageChange = function(index){
        $scope.imageIndex = index;
        //console.log($scope.imageIndex);
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
            $scope.shippingSelection = 0;
        }else{
            $scope.selection = 0;
            $scope.shippingSelection = 1;
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
    */
    $scope.heartAdder = function(shoename){

        //console.log("new button press");
        

        $scope.open = true;
        //console.log($scope.loading);
        //console.log($window.localStorage.getItem('page'));
        //console.log($window.localStorage.getItem($routeParams.name));
  
        //console.log($rootScope.myLoves);
        
        Cookie.setHearto($scope.removeCookieHeart);  //Right now set to 0.. removeCookieHeart = 0;

 
        if($window.localStorage.getItem($routeParams.name) != 1){// IF THE VALUE OF THE ITEM(ROUTENAME) IN LOCALSTORAGE IS 0 SO CAN BE TURNED ON... 

                $rootScope.heartactivated = true;                // ACTIVATES FA FA-HEART "BLACK HEART" ICON (NG-SHOW)...
                //console.log($rootScope.heartactivated);
                $rootScope.myLoves.push($routeParams.name);      // PUSHES CURRENT ROUTE NAME INTO "myLoves" ARRAY. LOCATED IN THE ROOTSCOPE...

                    var unique = $rootScope.myLoves.filter(function(elem, index, self) {  //MAKES SURE THE "myLoves" ARRAY HAS NO DUPLICATES...
                        return index == self.indexOf(elem);
                     });
        
                    $rootScope.myLoves = unique;                // REPLACES OLD "myLoves" ARRAY WITH NEW FILTERED ARRAY...

              if($window.localStorage.getItem('myLoves')!= null && $window.localStorage.getItem('cookieHearts') <=1 ){ // IF THE 'myLoves' ARRAY IN LOCAL STORAGE EXISTS AND THE VALUE OF COOKIE HEARTS IS LESS THEN TWO..THIS ONLY WORKS IF THERE IS TWO ITEMS THOUGH. SO WILL NEED TO CHANGE.

                     if(Auth.isLoggedIn() && $rootScope.heartactivated){ //THE USER IS LOGGED IN...
                                               // "usernamey" IS THE USERNAME OF THE LOGGED IN USER WHICH IS RETRIEVED DURING THE EXECUTION OF MAINCTRL. AUTH.getUser()
                                 User.addLove($rootScope.usernamey,$routeParams.name).then(function(data){ //SEARCH FOR THE USER AND ADD STOREITEM(ROUTE) TO THE LOVES PROPERTY OF USER MODEL...
                                    //console.log(data.data.message); 
                                    //console.log(data.data);
                                                
                                     var unique = data.data.user.loves.filter(function(elem, index, self) {
                                            return index == self.indexOf(elem);
                                     });
                                     $rootScope.heartss = unique.length;
                                    //$rootScope.heartss= data.data.user.loves.length;
                                 });
                                            //RIGHT NOW THERE IS NO 'User.removeLove()' SERVICE FOR REMOVING OR DEACTIVATING HEART...
                            }

                    $rootScope.myLoves.push($window.localStorage.getItem('myLoves')); //SINCE THE LS'myLoves' ARRAY ISN'T NULL. PULL IT DOWN AND ADD IT TO LOCAL 'myLoves' ARRAY...
                    $window.localStorage.removeItem('myLoves');                       // REMOVE THE 'myLoves' ARRAY COMPLETELY FROM THE LOCAL STORAGE...

                        var unique = $rootScope.myLoves.filter(function(elem, index, self) { //REMOVE DUPLICATE ITEMS...
                            return index == self.indexOf(elem);
                        });

                    $rootScope.myLoves = unique;                                       // REPLACES OLD "myLoves" ARRAY WITH NEW FILTERED ARRAY...

                    $window.localStorage.setItem('myLoves',$rootScope.myLoves);        //SETS LS 'myLoves' TO LOCAL 'myLoves' ARRAY...
                    $window.localStorage.setItem($routeParams.name,$scope.addCookieHeart); //SETS STORE ITEM (FROM ROUTE) IN LS TO 1

                        Heart.activateHeart($routeParams).then(function(data){          // NOT SURE ABOUT THIS GUY MIGHT BE USELESS...

                            //console.log(data.data.shoe);
                            $scope.heartActivated = true;
                            //console.log("$scope.heartActivated "+$scope.heartActivated);

                        });
                

                            if(Auth.isLoggedIn() && $rootScope.heartactivated){ //THE USER IS LOGGED IN...
                                               // "usernamey" IS THE USERNAME OF THE LOGGED IN USER WHICH IS RETRIEVED DURING THE EXECUTION OF MAINCTRL. AUTH.getUser()
                                 User.addLove($routeParams.name,$rootScope.usernamey).then(function(data){ //SEARCH FOR THE USER AND ADD STOREITEM(ROUTE) TO THE LOVES PROPERTY OF USER MODEL...
                                    //console.log(data.data.message); 
                                    //console.log(data.data);
                                                
                                    var unique = data.data.user.loves.filter(function(elem, index, self) {
                                         return index == self.indexOf(elem);
                                    });
                                     $rootScope.heartss = unique.length;

                                 });
                                            //RIGHT NOW THERE IS NO 'User.removeLove()' SERVICE FOR REMOVING OR DEACTIVATING HEART...
                            }

                            
                    //DO THIS WHETHER LOGGED IN OR NOT..
                    $scope.cookieHearts = $window.localStorage.getItem('cookieHearts'); //GET cookieHeart VALUE FROM LOCALSTORAGE...
                    $scope.cookieHearts = Number($scope.cookieHearts);                  //CHANGE FROM STRING TO NUMBER...
                    //console.log($scope.cookieHearts+$scope.addCookieHeart);             
                    $scope.newCookieHeart = $scope.cookieHearts + $scope.addCookieHeart;//'newCookieHeart' VALUE EQUALS LOCALSTORAGE 'cookieHeart' PLUS 1...
                    $window.localStorage.setItem('cookieHearts',$scope.newCookieHeart); //SET LOCALSTORAGE 'cookieHearts' TO THE 'newCookieHeart' VALUE...
                        
                        //TOTAL HEARTS FOR STORE ITEM..
                        Shop.incrementHearts($routeParams.name).then(function(data){    //FIND STORE ITEM WITH ROUTE AND THEN INCREMENT HEARTS VALUE BY ONE...

                            //console.log(data.data.shoe);
                            //THERE DOESN'T SEEM TO BE A Shop.incrementHearts() SERVICE USED... THOUGH ONE EXISTS...
                                Shop.getMensShoe($routeParams.name).then(function(data){

                                        $scope.mensShoe = data.data.allshoe[0];
                                        //console.log(data.data.allshoe);
                                        //console.log($scope.mensShoe.hearts);
                                        $rootScope.totalHearts = data.data.allshoe[0].hearts;
                                       
        
                                });

                        });

                        //ADMIN VIEW OF PRODUCT LIKES WILL CHECK IF NECESSARY SINCE I WANT EVERYONE TO SEE THE LIKES.. SO COULD PULL FROM SHOP ITEMS' HEARTS VALUE..
                         User.getProducts().then(function(data){

                                $scope.adminProducts=data.data.user.products;
                                //console.log($scope.adminProducts[0].Ras);
                                //console.log($scope.adminProducts[0][$routeParams.name]+1);
                                $scope.adminProducts[0][$routeParams.name]= $scope.adminProducts[0][$routeParams.name]+1;
                                //console.log($scope.adminProducts[0][$routeParams.name]);
                                //console.log($scope.adminProducts[0]);
                                $scope.newAdminProducts.push($scope.adminProducts[0]);
                                
                                        User.updateAdminProducts($scope.adminProducts[0]).then(function(data){

                                                //console.log(data.data.user);

                                        });

                         });
                                 //$scope.adminProducts[0].$routeParams.name++;// DOESN'T APPEAR TO DO ANYTHING...

              }else{ //IF LOCALSTORAGE 'myLoves' IS NULL OR LOCALSTORAGE 'cookieHearts' IS LESS THAN OR EQUAL TO ONE THEN...
                   
                                                                                            //DON'T PULL FROM LOCALSTORAGE 'myLoves' ARRAY AND DON'T ADD TO LOCAL 'myLoves' ARRAY...
                    $window.localStorage.removeItem('myLoves');                             // CLEAR LOCALSTORAGE 'myLoves' ARRAY...
                    $window.localStorage.setItem('myLoves',$rootScope.myLoves);             // SET LOCALSTORAGE 'myLoves' ARRAY TO THE LOCAL 'myLoves' ARRAY...
                    $window.localStorage.setItem($routeParams.name,$scope.addCookieHeart);  // SET LOCALSTORAGE STORE ITEM TO 1..
                
                    //$timeout(function(){
                    $scope.open = true;
                    $rootScope.heartactivated = true;                                       //ACTIVATES FA FA-HEART-O "WHITE-HEART" ICON...
                    
                        Heart.activateHeart($routeParams).then(function(data){              //NOT SURE ABOUT THIS GUY...MIGHT BE USELESS...

                            //console.log(data.data.shoe);
                            $scope.heartActivated = true;
                            //console.log("$scope.heartActivated "+$scope.heartActivated);

                        });
                

                            if(Auth.isLoggedIn() && $rootScope.heartactivated){

                                     User.addLove($routeParams.name,$rootScope.usernamey).then(function(data){ //SEARCH FOR THE USER AND ADD STOREITEM(ROUTE) TO THE LOVES PROPERTY OF USER MODEL...
                                                //console.log(data.data.message);
                                                //console.log(data.data);
                                                            
                                                var unique = data.data.user.loves.filter(function(elem, index, self) {
                                                    return index == self.indexOf(elem);
                                                    });
                                                 $rootScope.heartss = unique.length;
                                     });
                            }

                    $scope.cookieHearts = $window.localStorage.getItem('cookieHearts');     // GET CURRENT 'cookieHearts' VALUE FROM LOCALSTORAGE..
                    $scope.cookieHearts = Number($scope.cookieHearts);                      // COERCE INTO A NUMBER...
                    //console.log($scope.cookieHearts+$scope.addCookieHeart);             
                    $scope.newCookieHeart = $scope.cookieHearts + $scope.addCookieHeart;    // 'newCookieHeart' VALUE EQUALS LOCALSTORAGE 'cookieHearts' PLUS 1...
                    $window.localStorage.setItem('cookieHearts',$scope.newCookieHeart);     // SET LOCALSTORAGE 'cookieHearts' TO 'newCookieHearts' VALUE...

                        Shop.incrementHearts($routeParams.name).then(function(data){

                            //console.log(data.data.shoe);
                                Shop.getMensShoe($routeParams.name).then(function(data){
                                        $scope.mensShoe = data.data.allshoe[0];
                                        //console.log(data.data.allshoe);
                                        //console.log($scope.mensShoe.hearts);
                                        $rootScope.totalHearts = data.data.allshoe[0].hearts;
                                        //console.log($scope.totalHearts);
        
                                });

                        });

                        User.getProducts().then(function(data){

                            $scope.adminProducts=data.data.user.products;
                            //console.log($scope.adminProducts[0].Ras);
                            //console.log($scope.adminProducts[0][$routeParams.name]+1);
                            $scope.adminProducts[0][$routeParams.name]= $scope.adminProducts[0][$routeParams.name]+1;
                            //console.log($scope.adminProducts[0][$routeParams.name]);
                            //console.log($scope.adminProducts[0]);
                            $scope.newAdminProducts.push($scope.adminProducts[0]);

                                User.updateAdminProducts($scope.adminProducts[0]).then(function(data){

                                    //console.log(data.data.user);

                                });
                         });

              }
              
        }else{
                //console.log($window.localStorage.getItem('myLoves'));
                if($window.localStorage.getItem('myLoves')!= null){

                $rootScope.heartactivated = false;              //ACTIVATES FA FA-HEART-0 "WHITE HEART" ICON (NG-SHOW)...
                //console.log($rootScope.heartactivated);
                $rootScope.localStorageMyLovesString = $window.localStorage.getItem('myLoves'); // RETRIEVES LOCALSTORATE 'myLoves'FROM LOCAL STORAGE AS STRING...
                //console.log($rootScope.localStorageMyLovesString);
                $rootScope.myLovesStringSplit = $rootScope.localStorageMyLovesString.split(",");// splits string into an array, with each shoe at its own index. Or returns shoe at zero index if one seperator exists WITH NO VALUE AFTER..
                //console.log($rootScope.myLovesStringSplit);
                //console.log($routeParams.name);
                $rootScope.myLovesStringSplit.splice($rootScope.myLovesStringSplit.indexOf($routeParams.name),1); // REMOVES CURRENT STORE ITEM (ROUTE) FROM myLovesStringSplit ARRAY...
                //console.log($rootScope.myLovesStringSplit);
                $window.localStorage.setItem('myLoves',$rootScope.myLovesStringSplit);                            // SETS LOCALSTORAGE 'myLoves' TO 'myLovesStringSplit' ARRAY... (MYLOVES MINUS STORE ITEM...)

                     if(Auth.isLoggedIn()){
                                               //IF USER IS LOGGED IN...
                             //console.log($rootScope.usernamey);
                             User.removeLove($rootScope.usernamey,$routeParams.name).then(function(data){        // FIND CURRENT USER AND PULLS CURRENT STORE ITEM(ROUTEPARAM) FROM LOVES ARRAY... 
                                    //console.log(data.data.message);
                                    //console.log(data.data.user.loves.length);
                                               
                                     var unique = data.data.user.loves.filter(function(elem, index, self) {
                                             return index == self.indexOf(elem);
                                        });
                                        $rootScope.heartss = unique.length;
                             });
                        }

                $window.localStorage.setItem($routeParams.name,$scope.removeCookieHeart);

                            Heart.deactivateHeart($routeParams).then(function(data){
                                    //console.log("did it work?");
                                    //console.log("activated");
                                    //console.log(data.data.success);
                                    //console.log(data.data.shoe);
                                    $scope.heartActivated = false;
                                    //console.log("$scope.heartActivated "+$scope.heartActivated);

                            });
            
                            Shop.decrementHearts($routeParams.name).then(function(data){

                                    //console.log(data.data.shoe);
                                Shop.getMensShoe($routeParams.name).then(function(data){
   
                                        $scope.mensShoe = data.data.allshoe[0];
                                        //console.log(data.data.allshoe);
                                        //console.log($scope.mensShoe.hearts);
                                        $rootScope.totalHearts = data.data.allshoe[0].hearts;
                                        //console.log($scope.totalHearts);
        
                                });

                            });
              
           // $rootScope.heartactivated = false;
                            //$timeout(function(){
                $scope.open = false;
                $rootScope.heartactivated = false;
                //},200);
            //$scope.heartactivated= false;
            ////console.log($scope.heartactivated);
            //$window.localStorage.setItem('cookieHearts',$scope.removeCookieHeart);
                $scope.cookieHearts = $window.localStorage.getItem('cookieHearts');
                $scope.cookieHearts = Number($scope.cookieHearts);
                //console.log($scope.cookieHearts+$scope.addCookieHeart);
                            if($scope.cookieHearts != 0){

                                 $scope.newCookieHeart = $scope.cookieHearts - $scope.addCookieHeart;
                                 $window.localStorage.setItem('cookieHearts',$scope.newCookieHeart);

                            }else{

                                 $window.localStorage.setItem('cookieHearts',$scope.removeCookieHeart);   

                            }
 
                        User.getProducts().then(function(data){

                                $scope.adminProducts=data.data.user.products;
                                //console.log($scope.adminProducts[0].Ras);
                                //console.log($scope.adminProducts[0][$routeParams.name]+1);
                                $scope.adminProducts[0][$routeParams.name]= $scope.adminProducts[0][$routeParams.name]-1;
                                //console.log($scope.adminProducts[0][$routeParams.name]);
                                //console.log($scope.adminProducts[0]);
                                //console.log($scope.adminProducts);

                                $scope.newAdminProducts.push($scope.adminProducts[0]);

                                 User.updateAdminProducts($scope.adminProducts[0]).then(function(data){

                                        //console.log(data.data.user);

                                 });
                         });
              
              
            ////console.log($window.localStorage.getItem('myLoves'));
            if($window.localStorage.getItem('myLoves') == ""){
                $window.localStorage.removeItem('myLoves');
                $rootScope.myLoves = [];
            }


                }else{

                    //console.log("NULLY SCULLY!");
                    
                    $rootScope.heartactivated = false;              //ACTIVATES FA FA-HEART-0 "WHITE HEART" ICON (NG-SHOW)...
                    $window.localStorage.setItem('myLoves',$rootScope.myLoves);                            // SETS LOCALSTORAGE 'myLoves' TO 'myLovesStringSplit' ARRAY... (MYLOVES MINUS STORE ITEM...)

                     if(Auth.isLoggedIn()){                      //IF USER IS LOGGED IN...
                            //console.log($scope.currentUser);
                            //console.log($rootScope.usernamey);
                             User.removeLove($scope.currentUser,$routeParams.name).then(function(data){        // FIND CURRENT USER AND PULLS CURRENT STORE ITEM(ROUTEPARAM) FROM LOVES ARRAY... 
                                    //console.log(data.data.message);
                                    //console.log(data.data);
                                               
                                    var unique = data.data.user.loves.filter(function(elem, index, self) {
                                            return index == self.indexOf(elem);
                                     });
                                     $rootScope.heartss = unique.length;
                             });
                    }

                $window.localStorage.setItem($routeParams.name,$scope.removeCookieHeart);
                        Heart.deactivateHeart($routeParams).then(function(data){
                    //console.log("did it work?");
                    //console.log("activated");
                    //console.log(data.data.success);
                    //console.log(data.data.shoe);
                     $scope.heartActivated = false;
                     //console.log("$scope.heartActivated "+$scope.heartActivated);

            });
            
                        Shop.decrementHearts($routeParams.name).then(function(data){

                    //console.log(data.data.shoe);
                                 Shop.getMensShoe($routeParams.name).then(function(data){
   
                                        $scope.mensShoe = data.data.allshoe[0];
                                        //console.log(data.data.allshoe);
                                        //console.log($scope.mensShoe.hearts);
                                        $rootScope.totalHearts = data.data.allshoe[0].hearts;
                                        //console.log($scope.totalHearts);
        
                                });

                        });
              
           // $rootScope.heartactivated = false;
                            //$timeout(function(){
                    $scope.open = false;
                    $rootScope.heartactivated = false;
                //},200);
            //$scope.heartactivated= false;
            ////console.log($scope.heartactivated);
            //$window.localStorage.setItem('cookieHearts',$scope.removeCookieHeart);
             $scope.cookieHearts = $window.localStorage.getItem('cookieHearts');
              $scope.cookieHearts = Number($scope.cookieHearts);
              //console.log($scope.cookieHearts+$scope.addCookieHeart);
              if($scope.cookieHearts != 0){
                $scope.newCookieHeart = $scope.cookieHearts - $scope.addCookieHeart;
              $window.localStorage.setItem('cookieHearts',$scope.newCookieHeart);
              }else{
                $window.localStorage.setItem('cookieHearts',$scope.removeCookieHeart);   
              }
                //Shop.decrementHearts($routeParams.name).then(function(data){

                    ////console.log(data.data.shoe);

                //});
                //User.decreaseAdminHearts($routeParams.name).then(function(data){

                   // //console.log(data.data.admin);

                //});
               User.getProducts().then(function(data){

    $scope.adminProducts=data.data.user.products;
    //console.log($scope.adminProducts[0].Ras);
    //console.log($scope.adminProducts[0][$routeParams.name]+1);
    $scope.adminProducts[0][$routeParams.name]= $scope.adminProducts[0][$routeParams.name]-1;
    //console.log($scope.adminProducts[0][$routeParams.name]);
    //console.log($scope.adminProducts[0]);
    //console.log($scope.adminProducts);

    $scope.newAdminProducts.push($scope.adminProducts[0]);
    User.updateAdminProducts($scope.adminProducts[0]).then(function(data){

            //console.log(data.data.user);

    });
   });
              
              
            //console.log($window.localStorage.getItem('myLoves'));
            if($window.localStorage.getItem('myLoves') == ""){
                $window.localStorage.removeItem('myLoves');
                $rootScope.myLoves = [];
            }


                }


        }
        
       // Heart.whoActivated().then

       //$scope.activatedByName =  $window.localStorage.getItem($routeParams.name);
       //console.log($routeParams.name);
        Heart.whoActivated().then(function(data){
            //console.log(data.data);

        });

        if( !$scope.heartActivated){

                Heart.activateHeart($routeParams).then(function(data){
                    ////console.log("did it work?");
                    ////console.log("shoe.heartactivated = true");
                    ////console.log(data.data.success);
                    //console.log(data.data.shoe);
                    $scope.heartActivated = true;
                    //console.log("$scope.heartActivated "+$scope.heartActivated);

                });
                   Heart.addHeart().then(function(data){
           //console.log(data.data.value);
           $scope.newHeartValue = true;
           

        });
                       Heart.getHearts().then(function(data){
        //console.log("getHearts has run...");
        //console.log(data.data.hearts[0].hearts);
                                                                         // $rootScope.heartss =$window.localStorage.getItem('cookieHearts');
       // $window.localStorage.setItem('cookieHearts',$rootScope.heartss);
       // $scope.loading = false;
    });

    }else {
            Heart.deactivateHeart($routeParams).then(function(data){
                    //console.log("did it work?");
                    //console.log("activated");
                    //console.log(data.data.success);
                    //console.log(data.data.shoe);
                     $scope.heartActivated = false;
                     //console.log("$scope.heartActivated "+$scope.heartActivated);

            });
  

            Heart.removeHeart().then(function(data){
                //console.log(data.data.success);
            })
            //$scope.newHeartValue = false;
                Heart.getHearts().then(function(data){
        //console.log("getHearts has run...");
        //console.log(data.data.hearts[0].hearts);
                                                                     //overriding isLoggedIn heartss getter   //$rootScope.heartss = $window.localStorage.getItem('cookieHearts');
       // $window.localStorage.setItem('cookieHearts',$rootScope.heartss);
        
       // $scope.loading = false;
    });
        }

       if( Auth.isLoggedIn()){
           //console.log("logged in");
       }else{
            //console.log("Not logged in!");
            $timeout(function(){
                $location.path('/login');

            },2000); 

       }


        
  
        ////console.log(Heart.hearts);
        //Heart.hearts = $scope.newHeartValue + Heart
        ////console.log($scope.newHeartValue);
      // $scope.newHeartValue = Heart.hearts++;
        ////console.log($scope.newHeartValue);



////console.log($route);
    }

});



}());
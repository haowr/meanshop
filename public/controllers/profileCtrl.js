(function () {

    var app = angular.module('profileController', ['userServices', 'heartServices', 'shopServices', 'authServices',]);

    app.config(function () {
        //console.log("profile controller loaded and initialized...");
    })

    app.controller('profileCtrl', function (Shop, Auth, User, $scope, $rootScope, $window, $routeParams) {

        $scope.user;
        $scope.whoisthis;
        $scope.currentUser;
        $scope.orders = [];
        $scope.orderWithTotal = {};
        $scope.orderData = {};
        $scope.orderArray = [];
        $scope.orderHistory = [];
        $scope.ordersDataArray = [];
        $scope.ordersGrouped = [];
        $scope.ordersGrouped2 = [];
        $scope.orderNumberAsTitle;
        $scope.singleOrder;
        $scope.orderNumber;
        $scope.loves = [];
        $scope.lovesLength;
        $scope.loveObjectArray = [];
        $scope.loveObjects = [];
        $scope.allShoes;
        $scope.grandTotal = $window.localStorage.getItem('grandTotal');
        //console.log($scope.grandTotal);
        $scope.totals = [];
        $scope.myLovesReady = true;
        $scope.openOrderr = false;
        $scope.addBillingDetails = false;
        $scope.wouldYouLikeToAddBillingDetails = false;
        $scope.addShippingDetails = false;
        $scope.wouldYouLikeToAddShippingDetails = false;
        $scope.addCCDetails = false;
        $scope.wouldYouLikeToAddShippingDetails = false;
        $scope.savedCongratulations = false;
        $rootScope.showButton = false;
        $rootScope.showButtonRemoveLove = false;
        //console.log($routeParams);
        var singleOrder = function (route) {

            $scope.singleOrder = $scope.ordersGrouped[$routeParams.number];
            $scope.orderNumberAsTitle = Number($routeParams.number) + 1;
            //console.log($scope.singleOrder);
            //console.log("singleOrder has run..");

        }
        /*
        User.getGroupedOrdersFromUser($routeParams.username).then(function (data) {
            User.getStoreOrdersForAdmin("ohrha").then(function () {

                //console.log(data.data);

                $scope.ordersGrouped2 = data.data.ordersgrouped.ordersgrouped;
                //console.log($scope.ordersGrouped2);

            })
            //console.log(data.data);
            //console.log(data.data.ordersgrouped.ordersgrouped);
            //console.log($scope.singleOrder);
            for (var i = 0; i < data.data.ordersgrouped.ordersgrouped.length; i++) {

                // $scope.orderData.timestamp = $scope.orders[0].timestamp;
                // $scope.orderData.items = data.data.ordersgrouped.ordersgrouped[$scope.orderNumber].length;
                //$scope.orderData.number = $scope.orderNumber;
                // $scope.orderData.grandTotal = $scope.totals;
                $scope.ordersDataArray.push(data.data.ordersgrouped.ordersgrouped[i]);


            }
            //console.log($scope.ordersDataArray);
        })
        */

        $scope.openOrder = function () {

            if ($scope.openOrderr) {
                $scope.openOrderr = false;
            } else {

                $scope.openOrderr = true;
            }

        };

        User.getProducts().then(function (data) {

            //console.log(data.data.user.products);

        })
        Auth.getUser().then(function (data) {

            //console.log(data.data.username);
            $scope.currentUser = data.data.username;

            $scope.whoisthis = data.data.username;
            User.getUserProfile($scope.whoisthis).then(function (data) {


                //console.log(data.data.user);
                //console.log(data.data.user.loves);
                //console.log(data.data.user.detailssaved);
                $scope.orderNumber = data.data.user.ordernumber;
                if (data.data.user.detailssaved) {
                    $scope.notSaved = false;
                    $scope.saved = true;
                } else {
                    $scope.notSaved = true;
                    $scope.saved = false;
                }
                $scope.loves = data.data.user.loves;


                $scope.lovesLength = $scope.loves.length;
                //console.log($scope.loves);
                //console.log($scope.lovesLength)
                $scope.user = data.data.user;
                Shop.getAllShoes().then(function (data) {

                    //console.log(data.data.allshoes);
                    $scope.allShoes = data.data.allshoes;
                    //console.log($scope.allShoes);
                    //console.log($scope.allShoes[0]);
                    //console.log($scope.allShoes.length);
                    //console.log($scope.allShoes[0].name);
                    for (var i = 0; i < $scope.allShoes.length; i++) {

                        $scope.loveObjects.push({
                            name: $scope.allShoes[i].name,
                            thumbnail: $scope.allShoes[i].perspectives[1],
                            available: $scope.allShoes[i].available,
                            description: $scope.allShoes[i].description
                        });

                        //console.log($scope.loveObjects);



                    }

                    for (var i = 0; i < $scope.loves.length; i++) {

                        for (var j = 0; j < $scope.loveObjects.length; j++) {

                            if ($scope.loveObjects[j].name == $scope.loves[i]) {

                                //console.log("I love " + $scope.loveObjects[j].name);
                                $scope.loveObjectArray.push($scope.loveObjects[j]);
                                $scope.myLovesReady = false;

                            }
                        }


                    }
                    var unique = $scope.loveObjectArray.filter(function (elem, index, self) {
                        return index == self.indexOf(elem);
                    })
                    $scope.loveObjectArray = unique;
                    $rootScope.heartss = $scope.loveObjectArray.length;
                    //console.log($scope.loveObjectArray.length);

                    if ($scope.loveObjectArray.length == 0) {
                        $scope.myLovesReady = false;
                    }

                });


                //console.log(data.data.user.orders);
                for (var i = 0; i < data.data.user.orders.length; i++) {

                    $scope.orders.push(data.data.user.orders[i]);



                }
                for (var i = 0; i < data.data.user.orderhistory.length; i++) {

                    $scope.orderHistory.push(data.data.user.orderhistory[i]);

                }
                for (var i = 0; i < data.data.user.ordersgrouped.length; i++) {

                    $scope.ordersGrouped.push(data.data.user.ordersgrouped[i]);

                }

                //console.log($scope.orderHistory);
                singleOrder($routeParams.number);
                //$scope.orderData.
                //console.log($scope.orders);
                User.getTotalsFromUser($scope.whoisthis).then(function (data) {

                    //console.log(data.data);
                    //console.log(data.data.history.totalhistory);

                    $scope.totals = data.data.history.totalhistory;

                    /* User.getGroupedOrdersFromUser($scope.whoisthis).then(function (data) {
 
                         //console.log(data.data);
                         //console.log(data.data.ordersgrouped.ordersgrouped);
                         for (var i = 0; i < data.data.ordersgrouped.ordersgrouped.length; i++) {
 
                             $scope.orderData.timestamp = $scope.orders[0].timestamp;
                             $scope.orderData.items = data.data.ordersgrouped.ordersgrouped[$scope.orderNumber].length;
                             $scope.orderData.number = $scope.orderNumber;
                             $scope.orderData.grandTotal = $scope.totals;
                             $scope.ordersDataArray.push($scope.orderData);
 
 
                         }
 
                     })*/

                    //console.log($scope.orderData);
                    //console.log($scope.orderData.number);

                })


            });
            $rootScope.hideModal = function () {

                $("#myModal").modal('hide');

            }
            $scope.showModal = function (option, index) {
                //console.log(option);
                $rootScope.index = index;
                $scope.choiceMade = false;
                $scope.areYouSure = false;
                $scope.modalHeader = undefined;
                $scope.modalBody = undefined;
                $scope.hideButton = false;
                if (option === 1) {
                    scope.modalHeader = "Timeout Warning";
                    scope.modalBody = "Your session will expire in 5 minutes... Would you like to keep shopping?";
                    $("#myModal").modal({ backdrop: "static" });
                    $timeout(function () {
                        if (!scope.choiceMade) scope.endSession(); // If no choice is made after 10 seconds, select 'no' for them
                    }, 10000);

                } else if (option === 2) {
                    $scope.hideButton = true;
                    $scope.modalHeader = "Logging Out...";
                    $("#myModal").modal({ backdrop: "static" });
                    for (var i = 0; i < $rootScope.personalMyLoves.length; i++) {
                        $window.localStorage.removeItem($rootScope.personalMyLoves[i]);
                    }
                    $timeout(function () {
                        $window.localStorage.clear();
                        $rootScope.heartss = 0;
                        $rootScope.cartItems = 0;
                        Auth.logout();

                        $location.path('/');
                        hideModal();
                        $route.reload();

                    }, 2000)
                    //scope.modalBody = "Your session will expire in 5 minutes... Would you like to keep shopping?";
                    //scope.choiceMade = false;
                } else if (option === 3) {
                    //console.log("here");
                    $rootScope.hideButton = true;
                    $rootScope.areYouSure = true;
                    $rootScope.showButton = false;
                    $rootScope.modalHeader = "Are You Sure...";
                    $rootScope.modalBody = "Items Deleted From Your Order History Are Unretrievable!";

                    $("#myModal").modal({ backdrop: "static" });


                } else if (option === 4) {
                    //console.log("here");
                    $rootScope.hideButton = true;
                    $rootScope.areYouSure = true;
                    $rootScope.showButtonRemoveLove = true;
                    $rootScope.modalHeader = "Are You Sure...?";
                    $rootScope.modalBody = "Click On The Heart Of The Item You Love, To Re-add to Your Loves!";

                    $("#myModal").modal({ backdrop: "static" });


                } else if (option === 5) {

                    //console.log("option 5");
                    $rootScope.areYouSure = false;
                    //console.log($rootScope.areYouSure);
                    $rootScope.showButtonRemoveLove = false;
                    $rootScope.hideButton = false;
                    $rootScope.showButton = false;
                    $rootScope.areYouSure2 = true;
                    $rootScope.modalHeader = "Are You Sure...";
                    $rootScope.modalBody = "Items Deleted From Your Order History Are Unretrievable!";

                    $("#myModal").modal({ backdrop: "static" });

                }

                //$timeout(function(){
                ////   if(!scope.choiceMade){

                //       hideModal();
                //}


                // },5000);



            };
            $scope.yourBillingFunc = function (yourDetails, valid) {
                //console.log(yourDetails);
                yourDetails.username = $scope.currentUser;
                //console.log($scope.currentUser);
                User.addYourBillingDetails(yourDetails).then(function (data) {
                    //console.log(data.data);
                    if (data.data.success) {
                        $scope.wouldYouLikeToAddShippingDetails = true;
                    }


                })
            }

            $scope.addShippingButton = function (answer) {
                //console.log(answer);
                if (answer == 1) {
                    $scope.wouldYouLikeToAddShippingDetails = false;
                    $scope.addBillingDetails = false;
                    $scope.addShippingDetails = true;
                } else {
                    $scope.wouldYouLikeToAddShippingDetails = false;
                    $scope.addBillingDetails = false;
                }


            }
            $scope.storeDetails = function (answer) {
                if (answer == 1) {
                    $scope.addBillingDetails = true;
                    $scope.saved = false;
                    $scope.notSaved = false;

                } else {
                    $scope.addBillingDetails = false
                    $scope.saved = false;
                    $scope.notSaved = false;
                }


            }
            $scope.addCCButton = function (answer) {
                //console.log(answer);
                if (answer == 1) {
                    $scope.wouldYouLikeToAddCCDetails = false;
                    $scope.addBillingDetails = false;
                    $scope.addShippingDetails = false;
                    $scope.addCCDetails = true;
                } else {
                    $scope.wouldYouLikeToAddShippingDetails = false;
                    $scope.addBillingDetails = false;
                    $scope.addShippingDetails = false;
                }


            }
            $scope.yourShippingFunc = function (yourDetails, valid) {
                //console.log(yourDetails);
                yourDetails.username = $scope.currentUser;
                //console.log($scope.currentUser);
                User.addYourShippingDetails(yourDetails).then(function (data) {
                    //console.log(data.data);
                    if (data.data.success) {
                        $scope.wouldYouLikeToAddCCDetails = true;

                    }


                })
            }
            $scope.yourCCFunc = function (yourDetails, valid) {
                //console.log(yourDetails);
                yourDetails.username = $scope.currentUser;
                //console.log($scope.currentUser);
                User.addYourCCDetails(yourDetails).then(function (data) {
                    //console.log(data.data);
                    if (data.data.success) {
                        $scope.savedCongratulations = true;
                        $scope.addCCDetails = false;

                    }

                })
            }
            $scope.removeOneLove = function (index) {


                //console.log(index);
                User.removeLove($scope.currentUser, $scope.loveObjectArray[index].name).then(function (data) {
                    //console.log($scope.currentUser);
                    //console.log(data.data);
                    Shop.decrementHearts($scope.loveObjectArray[index].name).then(function (data) {

                        //console.log(data.data);

                        $rootScope.heartss = $scope.loveObjectArray.length;

                    })
                    $scope.loveObjectArray.splice(index, 1);

                })


            }
            $rootScope.removeOrdersGroupedFromUser = function (index) {

                User.removeOrdersGroupedFromUser($scope.currentUser, $routeParams.number, index).then(function (data) {

                    //console.log(data.data.user.ordersgrouped);
                    //console.log(data.data.user.ordersgrouped[$routeParams.number].length);
                    $scope.singleOrder.splice(index, 1);
                    if (data.data.user.ordersgrouped[$routeParams.number].length == 0) {

                        User.removeOrderHistoryFromUser($scope.currentUser, $routeParams.number).then(function (data) {

                            //console.log(data.data.user.orderhistory);

                            // $scope.orderHistory = data.data.user.orderhistory;
                        })
                        User.removeOrdersGroupedArrayFromUser($scope.currentUser, index).then(function (data) {

                            //console.log(data.data);

                        });


                    }
                    // User.getUserProfile($scope.whoisthis).then(function(data){
                    //   //console.log(data.data.user.ordersgrouped);
                    //})

                })

            };
            $rootScope.removeOrder = function (index) {

                //console.log($scope.currentUser);
                //console.log(index);
                User.removeOrderHistoryFromUser($scope.currentUser, index).then(function (data) {

                    //console.log(data.data.user.orderhistory);
                    $scope.orderHistory = data.data.user.orderhistory;
                    User.removeOrdersGroupedArrayFromUser($scope.currentUser, index).then(function (data) {

                        //console.log(data.data.user.ordersgrouped)
                    })
                })
                /*User.removeOneOrder($scope.currentUser, index).then(function (data) {


                    //console.log(data.data.order);
                    //console.log($scope.orders);

                    //$scope.orders.splice(index,1);
                    //$scope.orders = data.data.order.orders;
                    ////console.log(data.data.)
                    //console.log($scope.orders);
                    $scope.orders = data.data.order.orders;



                })*/

            }
            $scope.clearLoves = function () {
                //console.log($scope.currentUser);
                User.clearHearts($scope.currentUser).then(function (data) {

                    //console.log(data.data.user.loves);
                    $rootScope.heartss = data.data.user.loves.length;
                    $scope.loveObjectArray = data.data.user.loves;
                    $rootScope.heartactivated = false;
                    //Shop.decrementHeartsBy()


                })

            }
            //console.log($scope.orders);

        });

        ////console.log($scope.whoisthis);
        /*
    */
    });



}());
(function () {

    var app = angular.module('shoppingBagController', ['shopServices', 'authServices', 'userServices']);

    app.config(function () {

        //console.log("shoppingBagController loaded and intialized...");

    });
    app.controller('shoppingBagCtrl', function ($scope, Shop, $window, $timeout, Auth, User, $rootScope) {

        $scope.shoppingBagShoes = [];
        $scope.individualTotals = [];
        $scope.total = false;
        $scope.discount = false;
        $scope.grandTotal = false;
        $scope.oldtotal = false;
        $scope.hello = "hello";
        $scope.number;
        $scope.shippingChoice = 0;
        $scope.shoppingBagReady = false;
        $scope.beginCheckout = false;
        $scope.fillcart = false;
        $scope.shippingTime = false;
        $scope.couponCodeError = false;
        $scope.couponCodeAdded = false;
        $scope.totalWithShipping = false;
        $scope.currentUser;
        $scope.totalaftercoupon = false;
        $scope.shoppingCartEmpty = false;
        $scope.newShoppingBagQty;
        //console.log($scope.chooseShipping);
        //console.log($scope.total);



        var changeTitle = function () {

            $rootScope.title = "HOJ | Shopping Bag";

        }
        changeTitle();


        $scope.hello = function () {
            //console.log("hello");
        }

        $scope.addCouponCode = function (couponCode, valid) {

            //console.log(couponCode.code);
            $scope.grandTotal = 0;
            if (couponCode.code == "ping") {
                if ($scope.oldtotal) {
                    $scope.discount = $scope.oldtotal * 0.1;
                    //console.log($scope.oldtotal);
                    //console.log($scope.oldtotal - $scope.oldtotal * 0.1);
                    //console.log((10 / 100) * $scope.oldtotal);
                    //console.log($scope.oldtotal * 0.1);
                    //console.log($scope.total);
                    ////console.log(discount);
                    //console.log($scope.oldtotal);
                    ////console.log(Number($scope.oldtotal) - Number(discount));
                    //console.log(6440 - 644);
                    $scope.total = $scope.oldtotal - $scope.discount.toFixed(2);
                    //console.log($scope.total);
                    $scope.couponCodeAdded = true;
                    $scope.totalaftercoupon = true;
                    if ($scope.beginCheckout) {

                        $scope.grandTotal = $scope.total + $scope.shippingChoice;
                        $window.localStorage.setItem('grandTotal',$scope.grandTotal);

                    }
                    if (Auth.isLoggedIn()) {


                        User.addTotalToUser($scope.currentUser, $scope.total).then(function (data) {
                            //console.log(data.data.user.totalaftercoupon);

                            $scope.total = data.data.user.totalaftercoupon;
                            $scope.totalaftercoupon = true;
                            couponCode.code = "...";
                        });
                    }
                } else {
                    $scope.fillcart = true;

                }
            } else {

                $scope.couponCodeError = true;
                $timeout(function () {
                    $scope.couponCodeError = false;
                }, 3000);
                //console.log($scope.couponCodeError);
            }
            //console.log(valid);
        }


        if (Auth.isLoggedIn()) {

            Auth.getUser().then(function (data) {
                $scope.currentUser = data.data.username;

                User.getShoppingBag(data.data.username).then(function (data) {

                    //console.log(data.data.user.shoppingbag);
                    $scope.shoppingBagReady = true;
                    if (data.data.success) {
                        $timeout(function () {
                            $scope.shoppingBagReady = false;
                            $scope.shoppingBagShoes = data.data.user.shoppingbag;
                            $rootScope.cartItems = data.data.user.shoppingbag.length;
                            for (var i = 0; i < $scope.shoppingBagShoes.length; i++) {
                                $scope.individualTotals.push($scope.shoppingBagShoes[i].amt * $scope.shoppingBagShoes[i].price);
                                // $scope.shoppingBagShoes[i].invTotal= $scope.individualTotals[i];
                                //console.log($scope.shoppingBagShoes[i].amt);

                            }
                            $scope.oldtotal = $scope.individualTotals.reduce(function (sum, value) {
                                return sum + value;

                            }, 0);
                            //console.log($scope.individualTotals);
                            //console.log($scope.oldtotal);


                        }, 2000);

                    } else {
                        $scope.shoppingBagReady = false;
                    }






                });


            })



        } else if (window.localStorage.getItem('checkoutArray') !== null) {

            $scope.shoppingBagReady = true;
            $timeout(function () {
                $scope.shoppingBagReady = false;
                //$scope.shoppingCartEmpty = false;
                $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));

                for (var i = 0; i < $scope.shoppingBagShoes.length; i++) {
                    $scope.individualTotals.push($scope.shoppingBagShoes[i].amt * $scope.shoppingBagShoes[i].price);
                    // $scope.shoppingBagShoes[i].invTotal= $scope.individualTotals[i];
                    //console.log($scope.shoppingBagShoes[i].amt);

                }
                $scope.oldtotal = $scope.individualTotals.reduce(function (sum, value) {
                    return sum + value;

                }, 0);
                //console.log($scope.individualTotals);
                //console.log($scope.oldtotal);

            }, 2000);

        }
        //console.log($scope.shoppingBagShoes);

        Shop.getAllShoes().then(function (data) {

            //console.log(data.data.allshoes);


        });
        // $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
        //console.log($scope.shoppingBagShoes);

        $scope.increaseQuantity = function (index, quantity) {
            //console.log(index, quantity);
            //console.log($scope.shoppingBagShoes);
            //console.log($scope.shoppingBagShoes[index]);
            //console.log($scope.shoppingBagShoes[index].amt);
            ////console.log($scope.newShoppingBagQty);
            //console.log(Auth.isLoggedIn());
            if (Auth.isLoggedIn()) {

                //console.log('increase@!');
                User.addOneItem($scope.currentUser, index).then(function (data) {

                    //console.log(data.data);
                    //console.log($scope.oldtotal);
                    $scope.shoppingBagShoes[index].amt = data.data.user.shoppingbag[index].amt;
                    if ($scope.grandTotal && $scope.total) {
                        $scope.oldtotal = $scope.oldtotal + Number($scope.shoppingBagShoes[index].price);
                        $scope.total = $scope.total + (Number($scope.shoppingBagShoes[index].price) - (Number($scope.shoppingBagShoes[index].price) * 0.1));

                        $scope.grandTotal = $scope.total + $scope.shippingChoice;
                    } else if ($scope.total) {
                        $scope.oldtotal = $scope.oldtotal + Number($scope.shoppingBagShoes[index].price);
                        $scope.total = $scope.total + (Number($scope.shoppingBagShoes[index].price) - (Number($scope.shoppingBagShoes[index].price) * 0.1));


                    } else {
                        $scope.oldtotal = $scope.oldtotal + Number($scope.shoppingBagShoes[index].price);

                    }
                    //console.log("shgie");
                })
            } else {
                if ($scope.grandTotal && $scope.total) {
                    //console.log("OY");
                    $scope.oldtotal = $scope.oldtotal + Number($scope.shoppingBagShoes[index].price);
                    $scope.total = $scope.total + (Number($scope.shoppingBagShoes[index].price) - (Number($scope.shoppingBagShoes[index].price) * 0.1));

                    $scope.grandTotal = $scope.grandTotal + $scope.shippingChoice;
                    $scope.shoppingBagShoes[index].amt++;
                    $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));
                    //$scope.total = $scope.total + ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                    //$scope.oldtotal = $scope.oldtotal + ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                    //$scope.grandTotal = $scope.grandTotal + ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);


                } else if ($scope.grandTotal) {
                    //console.log("grandTotal is truthy");
                    $scope.oldtotal = $scope.oldtotal + Number($scope.shoppingBagShoes[index].price);

                    $scope.grandTotal = $scope.grandTotal + $scope.shippingChoice;
                    $scope.shoppingBagShoes[index].amt++;
                    $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));

                } else if ($scope.total) {
                    //console.log("total is true");
                    $scope.oldtotal = $scope.oldtotal + Number($scope.shoppingBagShoes[index].price);
                    $scope.total = $scope.total + (Number($scope.shoppingBagShoes[index].price) - (Number($scope.shoppingBagShoes[index].price) * 0.1));



                    $scope.shoppingBagShoes[index].amt++;
                    $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));

                } else {

                    //console.log($scope.oldtotal);
                    //console.log($scope.shoppingBagShoes[index].price);
                    $scope.oldtotal = $scope.oldtotal + Number($scope.shoppingBagShoes[index].price);

                    $scope.shoppingBagShoes[index].amt++
                    $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));

                    //$scope.oldtotal= $scope.oldtotal +($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                    //console.log($scope.oldtotal);

                }
            }
        }
        $scope.reduceQuantity = function (index, quantity) {

            //console.log(quantity);
            //console.log(index);
            //console.log($scope.grandTotal);
            //console.log($scope.total);
            //console.log($scope.oldtotal);

            if (Auth.isLoggedIn() && quantity >= 2) {
                //console.log($scope.shoppingBagShoes[index].amt);
                //$scope.oldtotal = $scope.oldtotal- $scope.shoppingBagShoes[index].price;

                User.removeOneItem($scope.currentUser, index).then(function (data) {
                    //console.log(data.data);
                    $scope.shoppingBagShoes[index].amt = data.data.user.shoppingbag[index].amt;
                    //console.log(data.data);
                    //$scope.shoppingBagShoes[index].amt = data.data.user.shoppingbag[index].amt;
                    if ($scope.grandTotal && $scope.total) {
                        //console.log("grand and scope");
                        $scope.oldtotal = $scope.oldtotal - Number($scope.shoppingBagShoes[index].price);
                        $scope.total = $scope.total - (Number($scope.shoppingBagShoes[index].price) - (Number($scope.shoppingBagShoes[index].price) * 0.1));
                        $scope.grandTotal = $scope.total + $scope.shippingChoice;
                    } else if ($scope.total) {
                        //console.log("total only");
                        //console.log($scope.total);
                        //console.log($scope.oldtotal);
                        $scope.oldtotal = $scope.oldtotal - Number($scope.shoppingBagShoes[index].price);
                        $scope.total = $scope.total - (Number($scope.shoppingBagShoes[index].price) + (Number($scope.shoppingBagShoes[index].price) * 0.1));
                        $scope.grandTotal = $scope.total + $scope.shippingChoice;

                    } else {
                        $scope.oldtotal = $scope.oldtotal - Number($scope.shoppingBagShoes[index].price);

                    }

                });

            } else if (Auth.isLoggedIn() && quantity < 2) {

                //console.log("Hello");
                //console.log($scope.oldtotal);
                if ($scope.grandTotal && $scope.total) {

                    if ($scope.shoppingBagShoes.length < 2) {
                        //console.log("scope.totalÉ");
                        $scope.oldtotal = false;
                        $scope.total = false;
                        $scope.grandTotal = false;
                        $scope.totalaftercoupon = false;
                        $scope.couponCodeAdded = false;
                        $scope.totalWithShipping = false;
                        $scope.beginCheckout = false;
                    } else {
                        //console.log("subtractor");
                        $scope.oldtotal = $scope.oldtotal - Number($scope.shoppingBagShoes[index].price);
                        $scope.total = $scope.total - (Number($scope.shoppingBagShoes[index].price) + (Number($scope.shoppingBagShoes[index].price) * 0.1));
                        $scope.grandTotal = $scope.total + $scope.shippingChoice;
                    }


                    //$scope.oldtotal = $scope.oldtotal - Number($scope.shoppingBagShoes[index].price);
                    //$scope.total = $scope.total - Number($scope.shoppingBagShoes[index].price);
                    //$scope.grandTotal = $scope.grandTotal - Number($scope.shoppingBagShoes[index].price);
                } else if ($scope.total) {
                    //console.log("scope.total");
                    if ($scope.shoppingBagShoes.length < 2) {
                        //console.log("scope.totalÉ");
                        $scope.oldtotal = false;
                        $scope.total = false;
                        $scope.totalaftercoupon = false;
                    } else {
                        $scope.oldtotal = $scope.oldtotal - Number($scope.shoppingBagShoes[index].price);
                        $scope.total = $scope.total - (Number($scope.shoppingBagShoes[index].price) + (Number($scope.shoppingBagShoes[index].price) * 0.1));
                    }


                } else {
                    if ($scope.oldtotal == 0) {
                        $scope.oldtotal = false;
                    } else {
                        $scope.oldtotal = $scope.oldtotal - Number($scope.shoppingBagShoes[index].price);
                    }


                }
                User.pullOneItem($scope.currentUser, index).then(function (data) {
                    // $scope.shoppingBagShoes[index].amt = data.data.user.shoppingbag[index].amt;

                    //console.log(data.data.user.shoppingbag);
                    // $scope.total = $scope.total-$scope.shoppingBagShoes[index].price;

                    $scope.shoppingBagShoes = data.data.user.shoppingbag;

                    $rootScope.cartItems = $scope.shoppingBagShoes.length;

                })


            } else if (Auth.isLoggedIn() && quantity === 1) {
                //console.log("Less than one");
                User.pullOneItem($scope.currentUser, index).then(function (data) {

                    //console.log(data.data.user.shoppingbag);
                    $scope.shoppingBagShoes = data.data.user.shoppingbag;
                    $rootScope.cartItems = $scope.shoppingBagShoes.length;
                    $scope.total = $scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price;

                    // $scope.oldtotal = 0;
                })



            } else {
                //console.log("ELSEO!");
                if (!Auth.isLoggedIn() && quantity == 1 || !Auth.isLoggedIn() && quantity == 0) {

                    if ($scope.grandTotal && $scope.total) {
                        //console.log("OY");
                        //console.log("grandTotal is truthy");
                        $scope.oldtotal = $scope.oldtotal - $scope.shoppingBagShoes[index].price;
                        $scope.total = $scope.total - $scope.shoppingBagShoes[index].price;
                        $scope.grandTotal = $scope.total + $scope.shippingChoice;
                        $scope.shoppingBagShoes.splice(index, 1);
                        $rootScope.cartItems = $scope.shoppingBagShoes.length;
                        $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));
                        //if($scope.grandTotal == $scope.shippingChoice){
                        // $scope.grandTotal = false;
                        //}
                        if ($scope.oldtotal == 0) {
                            //$scope.total = false;
                            $scope.grandTotal = false;
                            $scope.oldtotal = false;

                            $scope.shoppingCartEmpty = true;
                            $scope.totalWithShipping = false;
                            $scope.couponCodeAdded = false;
                            $scope.beginCheckout = false;

                        }

                    } else if ($scope.grandTotal) {
                        //console.log("grandTotal is truthy");
                        $scope.oldtotal = $scope.oldtotal - $scope.shoppingBagShoes[index].price;
                        $scope.grandTotal = $scope.oldtotal + $scope.shippingChoice;
                        $scope.shoppingBagShoes.splice(index, 1);
                        $rootScope.cartItems = $scope.shoppingBagShoes.length;
                        $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));
                        if ($scope.grandTotal == $scope.shippingChoice) {
                            $scope.grandTotal = false;
                            $scope.beginCheckout = false;
                        }
                        //$scope.oldtotal = $scope.oldtotal- $scope.shoppingBagShoes[index].price;

                        //$scope.grandTotal = $scope.grandTotal- $scope.shoppingBagShoes[index].price;
                        // $scope.shoppingBagShoes[index].amt--;
                        // $window.localStorage.setItem('checkoutArray',JSON.stringify($scope.shoppingBagShoes));                                            

                    } else if ($scope.total) {
                        //console.log("total is true");
                        $scope.oldtotal = $scope.oldtotal - $scope.shoppingBagShoes[index].price;
                        $scope.total = $scope.total - $scope.shoppingBagShoes[index].price;
                        $scope.shoppingBagShoes.splice(index, 1);
                        $rootScope.cartItems = $scope.shoppingBagShoes.length;
                        $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));
                        if ($scope.oldtotal == 0) {
                            $scope.total = false;
                            $scope.grandTotal = false;

                        }
                        //$scope.total = $scope.oldtotal - ($scope.oldtotal * 0.1);



                        //$scope.shoppingBagShoes[index].amt--;
                        //$window.localStorage.setItem('checkoutArray',JSON.stringify($scope.shoppingBagShoes));

                    } else {
                        // $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
                        //console.log("shoppingBagShoes before Splice...");
                        //console.log(JSON.stringify($scope.shoppingBagShoes));
                        //console.log("HELLO!!!");
                        //console.log(index);
                        ////console.log($scope.oldtotal);
                        //$scope.total = $scope.total - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                        $scope.oldtotal = $scope.oldtotal - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                        $scope.total = $scope.oldtotal
                        //console.log($scope.oldtotal);

                        $scope.shoppingBagShoes[index].amt--;
                        //console.log($scope.shoppingBagShoes[index - 1]);
                        //console.log($scope.shoppingBagShoes[index]);
                        //console.log($scope.shoppingBagShoes[index + 1]);

                        //console.log(JSON.stringify($scope.shoppingBagShoes));
                        $scope.oldtotal = $scope.oldtotal - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price)
                        //$scope.total = 
                        $scope.shoppingBagShoes.splice(index, 1);
                        //console.log("shoppingBagShoes after Splice...");
                        //console.log(JSON.stringify($scope.shoppingBagShoes));
                        $rootScope.cartItems = $scope.shoppingBagShoes.length;
                        $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));
                    }
                } else {
                    //console.log("TOTALITY!");

                    if ($scope.grandTotal && $scope.total) {
                        //console.log("OY");
                        $scope.oldtotal = $scope.oldtotal - $scope.shoppingBagShoes[index].price;
                        $scope.total = $scope.oldtotal - ($scope.oldtotal * 0.1);

                        $scope.grandTotal = $scope.total + $scope.shippingChoice;
                        $scope.shoppingBagShoes[index].amt--;
                        $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));
                        //$scope.total = $scope.total + ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                        //$scope.oldtotal = $scope.oldtotal + ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                        //$scope.grandTotal = $scope.grandTotal + ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);


                    } else if ($scope.grandTotal) {
                        //console.log("grandTotal is truthy");
                        $scope.oldtotal = $scope.oldtotal - $scope.shoppingBagShoes[index].price;

                        $scope.grandTotal = $scope.grandTotal - $scope.shoppingBagShoes[index].price;
                        $scope.shoppingBagShoes[index].amt--;
                        $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));

                    } else if ($scope.total) {
                        //console.log("total is true");
                        $scope.oldtotal = $scope.oldtotal - $scope.shoppingBagShoes[index].price;
                        $scope.total = $scope.oldtotal - ($scope.oldtotal * 0.1);



                        $scope.shoppingBagShoes[index].amt--;
                        $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));

                    } else {
                        //console.log("Final Else");
                        //console.log($scope.oldtotal);
                        $scope.oldtotal = $scope.oldtotal - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                        //console.log($scope.oldtotal);
                        $scope.shoppingBagShoes[index].amt--;
                        //console.log($scope.shoppingBagShoes);
                        $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));
                        $scope.oldtotal = $scope.oldtotal + ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                        //console.log($scope.oldtotal);
                        //$scope.shoppingBagShoes = $window.localStorage.getItem('checkoutArray');
                        //console.log($scope.shoppingBagShoes);
                        //console.log($scope.shoppingBagShoes.length);
                        //console.log($scope.individualTotals);
                        //console.log($scope.individualTotals);
                        $scope.individualTotals = [];
                    }
                }



            }




        }

        $scope.clearShoppingBag = function () {

            if (Auth.isLoggedIn()) {


                User.clearShoppingBag($scope.currentUser).then(function (data) {

                    //console.log(data.data.success);
                    $rootScope.cartItems = 0;
                    $scope.shoppingBagShoes = data.data.user.shoppingbag;
                    $scope.shoppingCartEmpty = true;
                    $scope.total = false;
                    $scope.oldtotal = false;
                    $scope.grandTotal = false;
                    $scope.totalWithShipping = false;
                    $scope.couponCodeAdded = false;


                });
            } else {

                $scope.shoppingBagShoes = [];
                $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));
                $scope.shoppingCartEmpty = true;
                $scope.total = false;
                $scope.oldtotal = false;
                $scope.grandTotal = false;
                $scope.totalWithShipping = false;
                $scope.couponCodeAdded = false;
                $rootScope.cartItems = 0;

            }

        }
        $scope.removeOneItem = function (index) {
            //console.log(index);


            if (Auth.isLoggedIn()) {
                //$scope.oldtotal = $scope.oldtotal - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                //console.log($scope.grandTotal);
                //console.log("Is Logged in..");

                if ($scope.grandTotal && $scope.total) {
                    //console.log("OY");
                    //console.log($scope.total);
                    //console.log($scope.oldtotal);
                    //console.log($scope.grandTotal);
                    var couponSavings = $scope.oldtotal * 0.1;
                    $scope.oldtotal = $scope.oldtotal - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);

                    if ($scope.oldtotal == 0) {
                        $scope.oldtotal = false;
                    }
                    if (!$scope.oldtotal) {
                        $scope.total = false;
                        $scope.totalaftercoupon = false;
                        $scope.grandTotal = false;
                        $scope.totalWithShipping = false;
                        $scope.couponCodeAdded = false;

                    } else {
                        $scope.total = $scope.oldtotal - ($scope.oldtotal * 0.1);
                    }
                    //console.log($scope.grandTotal - ($scope.total + $scope.shippingChoice));
                    if (!$scope.total) {
                        $scope.grandTotal = false;
                        $scope.beginCheckout = false;
                    } else {
                        $scope.grandTotal = $scope.total + $scope.shippingChoice;

                    }

                    //$scope.oldtotal = $scope.oldtotal - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                    //$scope.grandTotal = $scope.total + $scope.shippingChoice;



                } else if ($scope.total) {
                    ////console.log($scope.shoppingBagShoes);
                    ////console.log($scope.shoppingBagShoes[index]);
                    //console.log("$scope.total is truthy.");

                    // $scope.total = $scope.total - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                    $scope.oldtotal = $scope.oldtotal - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                    if ($scope.oldtotal == 0) {
                        $scope.oldtotal = false;
                    }
                    if (!$scope.oldtotal) {
                        $scope.total = false;
                        $scope.couponCodeAdded = false;

                    } else {
                        //console.log("here i am");

                        $scope.total = $scope.oldtotal - ($scope.oldtotal * 0.1);
                        //$scope.couponCodeAdded = false;
                    }


                } else {

                    $scope.oldtotal = $scope.oldtotal - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                    if ($scope.oldtotal == 0) {
                        $scope.oldtotal = false
                    }

                }
                User.pullOneItem($scope.currentUser, index).then(function (data) {
                    //var newIndex = index - 1;
                    //console.log(data.data.user.shoppingbag);
                    //console.log(index);
                    $scope.shoppingBagShoes = data.data.user.shoppingbag;
                    $rootScope.cartItems = $scope.shoppingBagShoes.length;


                });


            } else {
                if ($scope.grandTotal && $scope.total) {
                    //console.log("OY");
                    //console.log("grandTotal is truthy");
                    $scope.oldtotal = $scope.oldtotal - $scope.shoppingBagShoes[index].price;
                    $scope.total = $scope.total - $scope.shoppingBagShoes[index].price;
                    $scope.grandTotal = $scope.total + $scope.shippingChoice;
                    $scope.shoppingBagShoes.splice(index, 1);
                    $rootScope.cartItems = $scope.shoppingBagShoes.length;
                    $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));
                    //if($scope.grandTotal == $scope.shippingChoice){
                    // $scope.grandTotal = false;
                    //}
                    if ($scope.shoppingBagShoes.length < 1) {
                        $scope.oldtotal = false;
                        $scope.grandTotal = false;
                        $scope.total = false;

                        $scope.shoppingCartEmpty = true;
                        $scope.totalWithShipping = false;
                        $scope.couponCodeAdded = false;
                        $scope.grandTotal = false;
                        $scope.beginCheckout = false;
                    }
                    if ($scope.oldtotal == 0) {
                        $scope.oldtotal = false;
                        $scope.total = false;
                        $scope.grandTotal = false;
                        $scope.shoppingCartEmpty = true;
                        $scope.totalWithShipping = false;
                        $scope.couponCodeAdded = false;
                        $scope.beginCheckout = false;

                    }

                } else if ($scope.grandTotal) {
                    //console.log("grandTotal is truthy");
                    $scope.oldtotal = $scope.oldtotal - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                    $scope.grandTotal = $scope.grandTotal - $scope.oldtotal;
                    ////console.log($scope.total);
                    $scope.shoppingBagShoes.splice(index, 1);

                    //console.log($scope.shoppingBagShoes);
                    $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));
                    $rootScope.cartItems = $scope.shoppingBagShoes.length;
                    if ($scope.shoppingBagShoes.length < 1) {
                        $scope.oldtotal = false;
                        $scope.grandTotal = false;
                        $scope.total = false;

                        $scope.shoppingCartEmpty = true;
                        $scope.totalWithShipping = false;
                        $scope.couponCodeAdded = false;
                        $scope.grandTotal = false;
                        $scope.beginCheckout = false;
                    }

                    if ($scope.grandTotal == $scope.shippingChoice) {
                        $scope.oldtotal = false;

                        $scope.shoppingCartEmpty = true;
                        $scope.totalWithShipping = false;
                        $scope.couponCodeAdded = false;
                        $scope.grandTotal = false;
                        $scope.beginCheckout = false;
                    }
                    //$scope.oldtotal = $scope.oldtotal- $scope.shoppingBagShoes[index].price;

                    //$scope.grandTotal = $scope.grandTotal- $scope.shoppingBagShoes[index].price;
                    // $scope.shoppingBagShoes[index].amt--;
                    // $window.localStorage.setItem('checkoutArray',JSON.stringify($scope.shoppingBagShoes));                                            

                } else if ($scope.total) {
                    //console.log("total is true");
                    $scope.oldtotal = $scope.oldtotal - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                    $scope.total = $scope.oldtotal - ($scope.oldtotal * 0.1);
                    ////console.log($scope.total);
                    $scope.shoppingBagShoes.splice(index, 1);

                    //console.log($scope.shoppingBagShoes);
                    $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));
                    $rootScope.cartItems = $scope.shoppingBagShoes.length;
                    if ($scope.shoppingBagShoes.length < 1) {
                        $scope.oldtotal = false;
                        $scope.grandTotal = false;
                        $scope.total = false;

                        $scope.shoppingCartEmpty = true;
                        $scope.totalWithShipping = false;
                        $scope.couponCodeAdded = false;
                        $scope.grandTotal = false;
                        $scope.beginCheckout = false;
                    }
                    if ($scope.oldtotal == 0) {
                        $scope.oldtotal = false;
                        $scope.total = false;
                        $scope.couponCodeAdded = false;
                        $scope.totalaftercoupon = false;

                        $scope.shoppingCartEmpty = true;
                        $scope.totalWithShipping = false;

                        //$scope.couponCodeAdded = false;
                        //$scope.grandTotal = false;

                    }
                    //$scope.total = $scope.oldtotal - ($scope.oldtotal * 0.1);



                    //$scope.shoppingBagShoes[index].amt--;
                    //$window.localStorage.setItem('checkoutArray',JSON.stringify($scope.shoppingBagShoes));

                } else {
                    $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
                    //console.log($scope.shoppingBagShoes);
                    $scope.oldtotal = $scope.oldtotal - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                    //console.log($scope.total);
                    $scope.shoppingBagShoes.splice(index, 1);

                    //console.log($scope.shoppingBagShoes);
                    $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));
                    $rootScope.cartItems = $scope.shoppingBagShoes.length;

                    if ($scope.shoppingBagShoes.length < 1) {
                        $scope.oldtotal = false;
                        $scope.grandTotal = false;
                        $scope.total = false;

                        $scope.shoppingCartEmpty = true;
                        $scope.totalWithShipping = false;
                        $scope.couponCodeAdded = false;
                        $scope.grandTotal = false;
                        $scope.beginCheckout = false;
                    }
                }



            }


        }
        $scope.chooseShipping = function (number) {
            if (number == 1) {
                $scope.shippingChoice = 7.95;
               /* if (Auth.isLoggedIn()) {
                    User.addShippingChoiceToUser($scope.currentUser, "1-7 Days Expedited").then(function (data) {

                        //console.log(data.data.user);

                    });

                } else {
*/
                    //$scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
                    $window.localStorage.setItem('shippingChoice', 7.95);


               // }


            } else {
                $scope.shippingChoice = 15.00;

               /* if (Auth.isLoggedIn()) {
                    User.addShippingChoiceToUser($scope.currentUser, "2days Xpresspost").then(function (data) {

                        //console.log(data.data.user);

                    });

                } else {*/

                    //$scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
                    $window.localStorage.setItem('shippingChoice', 15.00);



                //}
            }

            //console.log($scope.shippingChoice);
            //console.log(number);
            getTotal();
        };
        //THIS MIGHT BE MESSED UP... MIGHT NEED TO UNCOMMENT;
        /*
                 for(var i =0; i<$scope.shoppingBagShoes.length; i++){
                        $scope.individualTotals.push($scope.shoppingBagShoes[i].amt * $scope.shoppingBagShoes[i].price);
                        $scope.shoppingBagShoes[i].invTotal= $scope.individualTotals[i];
        
                }
            //console.log($scope.individualTotals);
            //console.log($scope.shoppingBagShoes);
            $window.localStorage.setItem('checkoutArrayy',JSON.stringify($scope.shoppingBagShoes));
                  //$scope.total= $scope.individualTotals.r
                  $scope.total=$scope.individualTotals.reduce(function(sum, value) {
                    return sum + value;
        
                }, 0);
        */

        var getTotal = function () {


            //console.log($scope.total);
            if (Auth.isLoggedIn()) {

            }
            if ($scope.total == 0) {
                if ($scope.beginCheckout) {
                    $scope.grandTotal = $scope.grandTotal - $scope.shippingChoice;
                    $scope.total = $scope.oldtotal - ($scope.oldtotal * 0.1);
                    $scope.grandTotal = $scope.total + $scope.shippingChoice;
                }
                $scope.grandTotal = $scope.oldtotal + $scope.shippingChoice;
            } else {
                $scope.grandTotal = $scope.total + $scope.shippingChoice;
            }
            //$scope.grandTotal = $scope.total + $scope.shippingChoice;
            $window.localStorage.setItem('grandTotal', $scope.grandTotal);
            $scope.totalWithShipping = true;
            $scope.beginCheckout = true;

        }


        var addShipping = function (total, shippingChoice) {

            var newTotal = total + shippingChoice;
            $window.localStorage.setItem('grandTotal', $scope.newTotal);



        }


    });




}());
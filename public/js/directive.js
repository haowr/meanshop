(function () {


    var app = angular.module('shop-directives', ['shopServices', 'authServices', 'userServices',]);

    app.directive('funcWrapper', function () {

        return {
            restrict: 'A',
            scope: {


            }
        }


    })

    app.directive('galleryZoom', function () {
        return {
            restrict: 'A',

            link: function (elem) {

                //$(elem).elevateZoom();
                $('.specificmainzoom').panzoom();
                $('.specificmainzoom').panzoom("zoom");
                //$(".specificmainzoom").panzoom({
                // minScale: 2,
                // maxScale:4,
                // $zoomRange: $("input[type='range']")
                //});

            }
        }




    });
    app.directive('zoomButton', function () {
        return {
            restrict: 'A',

            link: function (elem) {

                var $section = $('.mainshoeview');
                var $panzoom = $section.find('.specificmainzoom').panzoom({
                    $zoomIn: $(elem),
                    $zoomOut: $section.find(".zoom-out"),
                    // $zoomRange: $section.find(".zoom-range"),
                    $reset: $section.find(".reset"),
                    startTransform: 'scale(0.9)',
                    maxScale: 0.9,
                    increment: 0.1,
                    contain: true
                }).panzoom('zoom', true);


            }
        }




    });


    app.directive('stripeCheckoutJquery', function (Auth, Shop, User, $location, $window, $timeout, $rootScope) {

        return {
            restrict: 'A',
            require: 'form',
            scope: {
                'addCreditCardFunc': '&',
                'finalCheckoutData': '=',
                'totalAfterTax': '=',
                'taxX': '=',
                'grandTotal': '=',
                'paymentLoading': '='
            },
            link: function (scope, elem, attrs, formCtrl, $rootScope) {
                //On click
                console.log(formCtrl);
                $(elem).submit(function (event) {
                    scope.taxX = $window.localStorage.getItem('tax');
                    scope.totalAfterTax = $window.localStorage.getItem('grandTotal');
                    var tax = scope.taxX;
                    Stripe.setPublishableKey('pk_test_aE3UDuxFXzcslBrNanFIIi6Q');
                    $('#charge-error').addClass('hidden');
                    $('#charge-error').empty();
                    console.log($('#card-number').val());
                    $(elem).find('button').prop('disabled', true);
                    scope.paymentLoading = true;
                    Stripe.card.createToken({

                        number: "4242 4242 4242 4242",
                        cvc: $(elem).find('#card-cvc').val(),
                        exp_month: $(elem).find('#card-expiration-month').val(),
                        exp_year: $(elem).find('#card-expiration-year').val(),
                        name: $(elem).find('#card-name').val()


                    }, stripeResponseHandler);
                    return false;

                    function stripeResponseHandler(status, response) {

                        if (response.error) { // Problem!

                            // Show the errors on the form
                            scope.paymentLoading = false;
                            $('#charge-error').text(response.error.message);
                            $('#charge-error').removeClass('hidden');
                            $(elem).find('button').prop('disabled', false); // Re-enable submission

                        } else { // Token was created!

                            // Get the token ID:
                            var token = response.id;
                            console.log(token);

                            // Insert the token into the form so it gets submitted to the server:
                            $(elem).append($('<input type="hidden" name="stripeToken" />').val(token));
                            //return false;
                            // Submit the form:
                            console.log(elem);
                            console.log(elem.length);
                            console.log(elem[0]);
                            console.log(elem[0].assignedSlot);
                            console.log(elem[0][0].value)
                            console.log(elem[0][1].value);
                            console.log(elem[0][2].value);
                            console.log(elem[0][3].value);
                            console.log(elem[0][4].value);
                            console.log(elem[0][6].value);
                            console.log(scope.finalCheckoutData);
                            console.log(scope.totalAfterTax);
                            console.log(scope.totalAfterTax * 100);
                            var ccData = {
                                cardname: elem[0][0].value,
                                stripeToken: elem[0][6].value,
                                grandTotal: (scope.totalAfterTax * 100).toFixed(0)

                            };
                            var checkoutData = scope.finalCheckoutData;
                            checkoutData.push(ccData);
                            console.log(checkoutData);
                            Shop.stripeCheckout(checkoutData).then(function (data) {
                                console.log(data.data);
                                console.log(data.data.message);
                                console.log(data.data.charge);
                                if (data.data.success == true) {


                                    Shop.checkout(checkoutData).then(function (data) {

                                        console.log(data.data);
                                        console.log(data.data.message);
                                        console.log(data.data.order);
                                        //
                                        //$scope.$apply() 
                                    });
                                    if (Auth.isLoggedIn()) {

                                        Auth.getUser().then(function (data) {
                                            var order = {};
                                            var username = data.data.username;
                                            // console.log(checkoutArray);
                                            console.log(data);
                                            console.log(order);
                                            checkoutData.push(data.data.username);
                                            checkoutData.push([]);
                                            User.getShoppingBag(data.data.username).then(function (data) {

                                                checkoutData[4] = data.data.user.shoppingbag;
                                                var grandtotal = $window.localStorage.getItem('grandTotal');
                                                var d = new Date();
                                                var timestamp = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
                                                var orderHistory = {};
                                                orderHistory.timestammp = timestamp;
                                                orderHistory.grandTotal = grandtotal;
                                                orderHistory.items = checkoutData[4].length;
                                                orderHistory.username = username;
                                                console.log(orderHistory);
                                                User.addOrderHistoryToUser(orderHistory).then(function (data) {
                                                    console.log(data.data);
                                                })
                                                User.addStoreHistoryToAdmin(orderHistory).then(function (data) {
                                                    console.log(data.data);

                                                })
                                                checkoutData.push(timestamp);
                                                checkoutData.push(tax);
                                                console.log(grandtotal);
                                                console.log(username);
                                                console.log(checkoutData);
                                                checkoutData[4][0].timestamp = timestamp;
                                                User.addGroupedOrdersToUser(checkoutData[4]).then(function (data) {

                                                    console.log(data.data);
                                                    User.increaseOrderNumber(username).then(function (data) {
                                                        console.log(data.data.user);

                                                    })

                                                })
                                                User.addGroupedOrdersToAdmin(checkoutData[4]).then(function (data) {

                                                    console.log(data.data);

                                                })

                                                User.addTotalToUser(username, grandtotal).then(function (data) {

                                                    console.log(data.data);
                                                    console.log(data.data.message);
                                                    console.log(checkoutData);
                                                    User.addOrdersToUser2(checkoutData).then(function (data) {
                                                        console.log(data.data);
                                                        if (data.data.success) {
                                                            $window.localStorage.removeItem('checkoutArrayy');
                                                            User.clearShoppingBag(data.data.username).then(function (data) {

                                                                console.log(data.data);
                                                                //$rootScope.cartItems = data.data.user.shoppingbag;

                                                            });
                                                            console.log(checkoutData[0].email);
                                                            var images = [];
                                                            /* for(var i = 0; i < checkoutData[4].length; i++){
                                                                     images.push(checkoutData[4][i].image);  

                                                             }
                                                             console.log(images);*/
                                                            var grndtotal = checkoutData[2].grandTotal / 100;
                                                            console.log(checkoutData[3].grandTotal);
                                                            User.sendEmail(checkoutData[0].email, checkoutData[0].name, grndtotal, checkoutData[6]).then(function (data) {

                                                                console.log(data.data.message);

                                                            });

                                                            $timeout(function () {
                                                                $location.path('/shop/orderconfirmation');

                                                            }, 2000);


                                                        }

                                                    });

                                                });


                                            })


                                        })

                                    } else {
                                        console.log(checkoutData[0].name);
                                        console.log(checkoutData);
                                        console.log(scope.taxX);
                                        var tax = $window.localStorage.getItem('tax');
                                        $window.localStorage.setItem('guestName', checkoutData[0].name);
                                        var grndtotal = checkoutData[2].grandTotal / 100;
                                        var d = new Date();
                                        var timestamp = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
                                        checkoutData[0].timeStamp = timestamp;
                                        checkoutData[0].items = scope.finalCheckoutData.length;
                                        var orderHistory = {};
                                        orderHistory.username = checkoutData[0].name;
                                        orderHistory.items = scope.finalCheckoutData.length;
                                        orderHistory.timestammp = timestamp;
                                        orderHistory.grandTotal = grndtotal;
                                        console.log(orderHistory);
                                        var checkoutArray = JSON.parse($window.localStorage.getItem('checkoutArray'));
                                        checkoutArray[0].timestamp = timestamp;
                                        console.log(checkoutArray);
                                        User.addStoreHistoryToAdmin(orderHistory).then(function (data) {
                                            //console.log(data.data);
                                            User.addGroupedOrdersToAdmin(checkoutArray).then(function (data) {

                                                console.log(data.data);

                                            })

                                        })
                                        
                                        User.sendEmail(checkoutData[0].email, checkoutData[0].name, grndtotal, tax).then(function (data) {

                                            console.log(data.data.message);


                                        });
                                        $timeout(function () {
                                            $location.path('/shop/orderconfirmation');

                                        }, 2000);
                                    }
                                }


                            });
                            scope.addCreditCardFunc(creditForm.$valid);
                        }


                    };

                });

            }

        }

    });
    app.directive('backToTopJquery', function ($window, $document) {


        return {

            restrict: 'A',
            link: function (scope) {
                
                scope.backToTopJquery = function(){
                    console.log("hello");
                   // console.log($document);
                   // console.log($window);
                                   // When the user scrolls down 20px from the top of the document, show the button
               window.onscroll = function () { scrollFunction() };

                function scrollFunction() {
                   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                        document.getElementById("myBtn").style.opacity = 100;
                    } else {
                       document.getElementById("myBtn").style.opacity = 0;
                       document.getElementById("myBtn").style.backgroundColor = "#ffbbbc";
                   }
                }
                                // When the user clicks on the button, scroll to the top of the document
                function topFunction() {
                    document.body.scrollTop = 0; // For Chrome, Safari and Opera 
                    document.documentElement.scrollTop = 0; // For IE and Firefox
               }
                
 


            }
            }
        }

    })
    app.directive('stripeCheckoutJqueryOneClick', function (Auth, Shop, User, $location, $window, $timeout, $rootScope) {

        return {
            restrict: 'A',
            require: 'form',
            scope: {
                'addCreditCardFunc': '&',
                'finalCheckoutData': '=',
                'totalAfterTax': '=',
                'taxX': '=',
                'paymentLoading': '=',
                'storedFormData': '=',
                'grandTotal': '='
            },
            link: function (scope, elem, attrs, formCtrl, $rootScope) {
                //On click
                console.log(formCtrl);

                console.log();
                $(elem).submit(function (event) {
                    console.log(scope.storedFormData);
                    scope.taxX = $window.localStorage.getItem('tax');
                    //scope.totalAfterTax = $window.localStorage.getItem('grandTotal');
                      scope.totalAfterTax = $window.localStorage.setItem('showGrandTotal',$scope.totalAfterTax );
                    var tax = scope.taxX;
                    console.log(scope.totalAfterTax);

                    Stripe.setPublishableKey('pk_test_aE3UDuxFXzcslBrNanFIIi6Q');
                    $('#charge-error').addClass('hidden');
                    $('#charge-error').empty();
                    console.log($('#card-number').val());
                    $(elem).find('button').prop('disabled', true);
                    scope.paymentLoading = true;
                    Stripe.card.createToken({
                        /*number: $(elem).find('#card-number').val(),
                        cvc: $(elem).find('#card-cvc').val(),
                        exp_month: $(elem).find('#card-expiration-month').val(),
                        exp_year: $(elem).find('#card-expiration-year').val(),
                        name: $(elem).find('#card-name').val()
                        */

                        number: "4242 4242 4242 4242",
                        cvc: scope.storedFormData[2].securitycode,
                        exp_month: scope.storedFormData[2].expmonth,
                        exp_year: scope.storedFormData[2].expyear,
                        name: scope.storedFormData[2].cardname


                    }, stripeResponseHandler);
                    return false;

                    function stripeResponseHandler(status, response) {

                        if (response.error) { // Problem!

                            // Show the errors on the form
                            scope.paymentLoading = false;
                            $('#charge-error').text(response.error.message);
                            $('#charge-error').removeClass('hidden');
                            $(elem).find('button').prop('disabled', false); // Re-enable submission

                        } else { // Token was created!

                            // Get the token ID:
                            var token = response.id;
                            console.log(token);

                            // Insert the token into the form so it gets submitted to the server:
                            $(elem).append($('<input type="hidden" name="stripeToken" />').val(token));
                            //return false;
                            // Submit the form:
                            console.log(elem);
                            console.log(elem.length);
                            console.log(elem[0]);
                            console.log(elem[0].assignedSlot);
                            console.log(elem[0][0].value)
                            console.log(elem[0][1].value);
                            //console.log(elem[0][2].value);
                            //console.log(elem[0][3].value);
                            //console.log(elem[0][4].value);
                            //console.log(elem[0][6].value);
                            console.log(scope.finalCheckoutData);
                            console.log(scope.storedFormData);
                            console.log(scope.totalAfterTax);
                            console.log(scope.totalAfterTax * 100);
                            var ccData = {
                                cardname: scope.storedFormData[2].cardname,
                                stripeToken: elem[0][1].value,
                                grandTotal: (scope.totalAfterTax * 100).toFixed(0)

                            };
                            var checkoutData = scope.storedFormData;
                            checkoutData.push(ccData);
                            console.log(checkoutData);
                            Shop.stripeCheckout2(checkoutData).then(function (data) {
                                console.log(data.data);
                                console.log(data.data.message);
                                console.log(data.data.charge);
                                if (data.data.success == true) {


                                    Shop.checkout(checkoutData).then(function (data) {

                                        console.log(data.data);
                                        console.log(data.data.message);
                                        console.log(data.data.order);
                                        //
                                        //$scope.$apply() 
                                    });
                                    if (Auth.isLoggedIn()) {

                                        Auth.getUser().then(function (data) {
                                            var order = {};
                                            var username = data.data.username;

                                            // console.log(checkoutArray);
                                            console.log(data);
                                            console.log(order);
                                            checkoutData.push(data.data.username);
                                            checkoutData.push([]);
                                            User.getShoppingBag(data.data.username).then(function (data) {

                                                checkoutData[4] = data.data.user.shoppingbag;
                                                console.log(checkoutData[4]);
                                                var grandtotal = $window.localStorage.getItem('grandTotal');
                                                var d = new Date();
                                                var timestamp = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
                                                var orderHistory = {};
                                                orderHistory.timestammp = timestamp;
                                                orderHistory.grandTotal = grandtotal;
                                                orderHistory.items = checkoutData[4].length;
                                                orderHistory.username = username;
                                                console.log(orderHistory);
                                                User.addOrderHistoryToUser(orderHistory).then(function (data) {
                                                    console.log(data.data);
                                                })
                                                User.addStoreHistoryToAdmin(orderHistory).then(function (data) {
                                                    console.log(data.data);

                                                })
                                                checkoutData.push(timestamp);
                                                checkoutData.push(tax);
                                                console.log(grandtotal);
                                                console.log(username);
                                                console.log(checkoutData);
                                                checkoutData[4][0].timestamp = timestamp;
                                                checkoutData[4][0].grandTotal = grandtotal;
                                                User.addGroupedOrdersToUser(checkoutData[4]).then(function (data) {

                                                    console.log(data.data);
                                                    // User.increaseOrderNumber(username).then(function(data){
                                                    //     console.log(data.data.user);

                                                    //})

                                                })
                                                User.addGroupedOrdersToAdmin(checkoutData[4]).then(function (data) {

                                                    console.log(data.data);

                                                })

                                                User.addTotalToUser(username, grandtotal).then(function (data) {

                                                    console.log(data.data);
                                                    console.log(data.data.message);
                                                    User.addOrdersToUser(checkoutData).then(function (data) {
                                                        console.log(data.data);
                                                        if (data.data.success) {
                                                            $window.localStorage.removeItem('checkoutArrayy');
                                                            User.clearShoppingBag(data.data.username).then(function (data) {

                                                                console.log(data.data);
                                                                //$rootScope.cartItems = data.data.user.shoppingbag;

                                                            });
                                                            console.log(checkoutData[0].email);
                                                            var images = [];
                                                            /* for(var i = 0; i < checkoutData[4].length; i++){
                                                                     images.push(checkoutData[4][i].image);  

                                                             }
                                                             console.log(images);*/
                                                            var grndtotal = checkoutData[3].grandTotal / 100;
                                                            console.log(checkoutData[3].grandTotal);
                                                            User.sendEmail(checkoutData[0].email, checkoutData[0].name, grndtotal, checkoutData[7]).then(function (data) {

                                                                console.log(data.data.message);

                                                            });
                                                            $timeout(function () {
                                                                $location.path('/shop/orderconfirmation');

                                                            }, 2000);


                                                        }

                                                    });

                                                });


                                            })


                                        })

                                    } else {

                                        User.sendEmail(checkoutData[0].email,checkoutData[0].name,grndtotal, checkoutData[7]).then(function (data) {
                                            console.log(data.data.message);
                                            console.log(checkoutData[0].name);
                                            $window.localStorage('guestName', checkoutData[0].name);
                                            $window.localStorage.removeItem('checkoutArrayy');
                                            // $window.localStorage.setItem('checkoutArray',JSON.stringify([]));
                                            $timeout(function () {
                                                $location.path('/shop/orderconfirmation');

                                            }, 2000);


                                        })
                                    }
                                }


                            });
                            //scope.addCreditCardFunc( creditForm.$valid);
                        }


                    };

                });

            }

        }

    });

    app.directive('heartAdder', function () {

        return {

            restrict: 'E',
            templateUrl: '../views/directives/heart-adder.html'



        }
    });

    app.directive('landingGallery', function () {

        return {

            restrict: 'E',
            templateUrl: '../views/directives/landing-gallery.html'
        }

    });
    
    app.directive('landingGalleryShop', function () {

        return {

            restrict: 'E',
            templateUrl: '../views/directives/landing-gallery-shop.html'
        }

    });


}());
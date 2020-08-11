(function () {

    var app = angular.module("mainController", ['authServices', 'mainServices', 'userServices', 'titleServices', 'infinite-scroll', 'heartServices', 'shopServices', 'emailServices']);

    app.config(function () {

        //console.log("mainController module loaded");

    });


    app.controller('mainCtrl', function ($http, $location, $timeout, Auth, $rootScope, $interval, $window, Main, $route, $scope, User, AuthToken, Heart, Shop, Email) {


        var scope = this;
        scope.loadme = false;
        //scope.username="";

        $rootScope.commercials = ["../img/SummerSale.jpg", "../img/ADS.jpg", "../img/DSG.jpg"];
        $rootScope.slides = [
            { image: "../img/SummerSale.jpg", description: "Image 00" },
            { image: "../img/ADS.jpg", description: "Image 01" },
            { image: "../img/DSG.jpg", description: "Image 02" }
        ];
        $rootScope.commercial = ["../img/SummerSale.jpg"];

        $rootScope.currentIndex = 0;
        //$rootScope.commercial = 0;
        $rootScope.myLoves = [];
        $rootScope.personalMyLoves = [];
        $rootScope.usernamey;
        $scope.shoeThumbs = [];
        $scope.allShoes = [];
        $scope.looper = {};
        $scope.whatsNewThumbs = [];
        $scope.longAd = ["../img/longad80.jpg"];
        $scope.whatsNew = ["../img/blackshoeside.jpg", "../img/pinkshoeside.jpg", "../img/blackshoeside.jpg", "../img/pinkshoeside.jpg", "../img/blackshoeside.jpg", "../img/pinkshoeside.jpg", "../img/blackshoeside.jpg", "../img/pinkshoeside.jpg"];
        $scope.translate = 0;
        $scope.translateY = 0;
        $scope.emailLoading = false;
        $scope.emailEntryFailed = false;
        $scope.invalidEmail = false;
        $scope.joinOurEmailList = true;
        $scope.emailAdded = false;
        $rootScope.opacityOn = false;
        $rootScope.opacityOn2 = false;
        $rootScope.showButton = false;
        $rootScope.areYouSure = false;
        $scope.openSearchVar = false;
        $scope.openSearchVar2 = false;
        $scope.searchIcon = true;
        $scope.searchQuery = "R";
        $scope.i = 0;
/*
        const draggable = new Draggable(document.querySelectorAll('.logasha'), {
  draggable: '#logo',
});

draggable.on('drag:start', () => //console.log('drag:start'));
draggable.on('drag:move',  () => //console.log('drag:move'));
draggable.on('drag:stop',  () => //console.log('drag:stop'));
*/
        Shop.getAllShoes().then(function (data) {


            //console.log(data.data);
            $scope.allShoesIndex = data.data.allshoes;
            //console.log($scope.allShoesIndex);
            $timeout(function () {
                scope.loadme = true;
                //console.log("scope.loadme");

            }, 2000);

        });
        var clseResults = function(){
                  //console.log("searchiconmadefalse")
            $scope.searchIcon=true;
            $scope.openSearchVar2 = false;
                 $timeout(function () {
               
                

            }, 500);

            $timeout(function () {
                 //$scope.searchIcon = true;
                $scope.openSearchVar = false;
                

            }, 1000);
            //console.log("closeResults");


        }
        $scope.closeResults = function () {
        //console.log("searchiconmadefalse")
            $scope.searchIcon=true;
            $scope.openSearchVar2 = false;
                 $timeout(function () {
               
                

            }, 500);

            $timeout(function () {
                 //$scope.searchIcon = true;
                $scope.openSearchVar = false;
                

            }, 1000);
            //console.log("closeResults");

        };
        $scope.doSearch = function (query) {
            $scope.searchQuery = query;
              $timeout(function () {
                    $scope.openSearchVar2 = true;

                    //$scope.searchIcon = false;
                }, 1000);
        }

        $scope.openSearch = function (choice, query) {
            //console.log(choice);
            //console.log(query);
            if (choice && $scope.openSearchVar) {
                //$scope.openSearchVar = false;
                //console.log("firstcase");
                $scope.openSearchVar2 = false;
                //$scope.searchIcon = true;
                //$scope.openSearchVar = false;
                $scope.shopSearch.$$element[0][0].value = "";
                $scope.searchQuery = query;
                $timeout(function () {
                    $scope.openSearchVar = false;


                }, 1000);
                //console.log($scope.openSearchVar);
            } else if (choice && !$scope.openSearchVar) {
                
                $scope.shopSearch.$$element[0][0].value = "";

                $timeout(function () {
                    $scope.openSearchVar = true;

                    // $scope.searchIcon = true;
                }, 400);

                $scope.searchIcon = false;

                //console.log($scope.openSearchVar);
            }


        }
        $interval(function () {
            //$rootScope.commercial.push($rootScope.commercials[$scope.i]);
            ////console.log("i ran!");
            if ($scope.i == 0) {
                // commercial.shift();
                //$rootScope.commercial.push($rootScope.commercials[$scope.i]);
                $scope.i = 1;
                ////console.log($scope.i);
            } else if ($scope.i == 1) {
                $rootScope.commercial.shift();
                $rootScope.commercial.push($rootScope.commercials[$scope.i]);
                $scope.i = 2;
                ////console.log($scope.i);
            } else if ($scope.i == 2) {
                $rootScope.commercial.shift();
                $rootScope.commercial.push($rootScope.commercials[$scope.i]);
                $scope.i = 0;
                // //console.log($scope.i);
            }

        }, 4000);

        var changeTitle = function () {
            //console.log("changeTitle has run..");

            $rootScope.title = "HOJ | A House Of Jewels";
            //console.log($rootScope.title);

        }
        //changeTitle();
        $scope.chgTitle = function () {

            $rootScope.title = "Login";
        }
        $interval(function () {

            if ($rootScope.currentIndex === 0) {
                $rootScope.currentIndex = 1;
            } else if ($rootScope.currentIndex === 1) {
                $rootScope.currentIndex = 2;
            } else {
                $rootScope.currentIndex = 0;
            }


        }, 6000);
        $rootScope.setCurrentSlideIndexAdd = function () {
            //console.log($rootScope.currentIndex);
            $rootScope.opacityOn = true;
            if ($rootScope.currentIndex === 0) {
                $rootScope.currentIndex = 1;
            } else if ($rootScope.currentIndex === 1) {
                $rootScope.currentIndex = 2;
            } else {
                $rootScope.currentIndex = 0;
            }

            $timeout(function () {
                $rootScope.opacityOn = false;
            }, 200);
        };
        $rootScope.setCurrentSlideIndexSubtract = function () {
            //console.log($rootScope.currentIndex);
            $rootScope.opacityOn2 = true;
            if ($rootScope.currentIndex === 2) {
                $rootScope.currentIndex = 1;
            } else if ($rootScope.currentIndex === 1) {
                $rootScope.currentIndex = 0;
            } else {
                $rootScope.currentIndex = 2;
            }
            $timeout(function () {
                $rootScope.opacityOn2 = false;
            }, 200);
        };
        $rootScope.isCurrentSlideIndex = function (index) {
            return $rootScope.currentIndex === index;
        };



        $rootScope.EmailListEmail;


        //console.log($rootScope.myLoves);

        if (Auth.isLoggedIn()) {
            Auth.getUser().then(function (data) {

                //console.log(data.data);
                if (!data.data.username) {  //JUST ADDED THIS SEPT 26th
                    //console.log("logout has run...");
                    Auth.logout();
                } else {

                    User.getUserProfile(data.data.username).then(function (data) {
                        //console.log(data.data.user.loves.length);

                        var unique = data.data.user.loves.filter(function (elem, index, self) {
                            return index == self.indexOf(elem);
                        });
                        $rootScope.personalMyLoves = unique;
                        //console.log($rootScope.personalMyLoves);
                        $rootScope.heartss = $rootScope.personalMyLoves.length;
                        $rootScope.cartItems = data.data.user.shoppingbag.length;
                    });

                }


            });

        } else {

            $rootScope.heartss = $window.localStorage.getItem('cookieHearts');
            //console.log($window.localStorage.getItem('checkoutArray'));
            if (!$window.localStorage.getItem('checkoutArray') == "") {
                //console.log("OY");
                $rootScope.cartyItems = JSON.parse($window.localStorage.getItem('checkoutArray'));
                $rootScope.cartItems = $rootScope.cartyItems.length;
                //console.log($rootScope.cartItems);
            } else {
                $rootScope.cartyItems = [];
                $rootScope.cartItems = $rootScope.cartyItems.length;
                //console.log($rootScope.cartItems);

            }


        }



        if ($rootScope.myLoves[0] == null) {
            $rootScope.myLoves = [];
        }
        //console.log("LOL");
        //console.log($rootScope.myLoves);
        if ($rootScope.myLoves[0] != undefined) {
            $rootScope.myLovesSeparated = $rootScope.myLoves;

        }




        $scope.addToEmailList = function (emailListData, valid) {

            //console.log("form submitted");
            //console.log(valid);
            //console.log(emailListData);
            //nsole.log(emailListData.email);
            $rootScope.EmailListEmail = emailListData;

            if (valid) {
                Email.addToMailList(emailListData.email).then(function (data) {

                    $scope.emailLoading = true;
                    $scope.joinOurEmailList = false;
                    if (data.data.success) {

                        User.sendEmailEmailList(emailListData.email);

                        $timeout(function () {
                            $scope.emailAdded = true;
                            $scope.emailLoading = false;
                            $scope.joinOurEmailList = false;
                            $timeout(function () {
                                $scope.joinOurEmailList = true;
                                $scope.emailAdded = false;
                            }, 4000);

                        }, 2500);


                    } else {
                        $scope.emailLoading = false;
                        $scope.emailEntryFailed = true;
                        $timeout(function () {

                            $scope.emailEntryFailed = false;
                            $scope.joinOurEmailList = true;

                        }, 2500);
                    }
                    //console.log(data.data.message);
                    //console.log(data.data);
                });
            } else {
                $scope.invalidEmail = true;
                $timeout(function () {
                    $scope.invalidEmail = false;

                }, 2000);
            }

        };
        $rootScope.checkEmail = function (emailListData) {

            $rootScope.checkingEmail = true;
            $rootScope.emailMsg = false;
            $rootScope.emailInvalid = false;
            User.checkEmail($rootScope.EmailListEmail).then(function (data) {

                // //console.log(data);
                if (data.data.success) {
                    $rootScope.checkingEmail = false;
                    $rootScope.emailInvalid = false;
                    $rootScope.emailMsg = false;
                } else {
                    $rootScope.checkingEmail = false;
                    $rootScope.emailInvalid = true;
                    $rootScope.emailMsg = "You're already signed up!";
                    $timeout(function () {

                        $rootScope.emailMsg = false;
                    }, 500);
                }

            });
        }

        scope.checkSession = function () {

            if (Auth.isLoggedIn()) {

                scope.checkingSession = true;
                var interval = $interval(function () {
                    ////console.log("test");
                    var token = $window.localStorage.getItem('token');
                    if (token === null) {
                        $interval.cancel(interval);
                    } else {
                        self.parseJwt = function (token) {
                            var base64Url = token.split('.')[1];
                            var base64 = base64Url.replace('-', '+').replace('_', '/');
                            return JSON.parse($window.atob(base64));
                        }
                        var expireTime = self.parseJwt(token);
                        var timeStamp = Math.floor(Date.now() / 1000);// convert javascript date object into a timestamp
                        ////console.log(expireTime.exp);
                        ////console.log(timeStamp);

                        ////console.log(expireTime.exp - timeStamp);
                        var timeCheck = expireTime.exp - timeStamp;
                        // //console.log(timeCheck);
                        if (timeCheck < 200 && timeCheck > 0) {
                            ////console.log("Token has expired...");
                            showModal(1); // Open bootstrap modal and let user decide what to do
                            $interval.cancel(interval); // Stop interval
                        }
                        //else{
                        ////console.log("Token is not yet expired...")
                        //  showModal(2);
                        //}
                    }
                }, 2000);
            }

        };
        scope.checkSession();// INITIATE SESSION CHECKING....

        // Function to expire session and logout (activated when user presses 'no)
        $scope.endSession = function () {
            $scope.choiceMade = true; // Set to true to stop 10-second check in option 1
            // hideModal(); // Hide modal
            // After 1 second, activate modal option 2 (log out)
            $timeout(function () {
                showModal(2); // logout user
            }, 1000);
        };
        var showModal = function (option) {
            $scope.choiceMade = false;
            $rootScope.modalHeader = undefined;
            $rootScope.modalBody = undefined;
            $rootScope.hideButton = false;
            $rootScope.areYouSure = false;
            $rootScope.showButton = false;
            if (option === 1) {
                $rootScope.showButton = true;
                $rootScope.modalHeader = "Timeout Warning";
                $rootScope.modalBody = "Your session will expire in 5 minutes... Would you like to keep shopping?";
                $("#myModal").modal({ backdrop: "static" });
                $timeout(function () {
                    if (!$scope.choiceMade) $scope.endSession(); // If no choice is made after 10 seconds, select 'no' for them
                }, 10000);

            } else if (option === 2) {
                $rootScope.showButton = false;
                $rootScope.hideButton = true;
                //$rootScope.areYouSure = true;


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
                    hideModal();
                    $location.path('/');

                    $route.reload();

                }, 2000)
                //scope.modalBody = "Your session will expire in 5 minutes... Would you like to keep shopping?";
                //scope.choiceMade = false;
            } else if (option === 3) {
                //console.log("here");
                $rootScope.showButton = false;
                $rootScope.hideButton = true;
                $rootScope.areYouSure = true;
                $rootScope.modalHeader = "Are You Sure...";
                $rootScope.modalBody = "Items Deleted From Your Order History Are Unretrievable!";

                $("#myModal").modal({ backdrop: "static" });


            } else if (option === 4) {

                //console.log("option 4");
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


        };

        $rootScope.$on('$routeChangeStart', function () {
            if (!scope.checkingSession) scope.checkSession()

            if (Auth.isLoggedIn()) {
                scope.isLoggedIn = true;
                Auth.getUser().then(function (data) {
                    //console.log(data.data.username);
                    scope.username = data.data.username;
                    $rootScope.usernamey = data.data.username;
                    scope.useremail = data.data.email;
                    //scope.loadme = true;

                    /* User.getLoves($rootScope.usernamey).then(function (data) {
                         //console.log(data.data.message);
                         //console.log(data.data.loves);
                         var unique = data.data.loves.loves.filter(function (elem, index, self) {
                             return index == self.indexOf(elem);
                         });
                         //console.log(unique);
                         $rootScope.personalMyLoves = unique;
                         //$rootScope.personalMyLoves = data.data.loves.loves;
                         //$scope.looper.personalMyLoves = data.data.loves.loves;
                         $rootScope.heartss = $rootScope.personalMyLoves.length;
                         //console.log($rootScope.personalMyLoves);
                         //console.log(data.data.loves.loves);
                     });*/
                    //console.log($rootScope.personalMyLoves);
                    scope.loadme = true;
                    Shop.getThumbnails().then(function (data) {

                        //console.log(data.data.thumbnails);
                        for (var i = 0; i < $rootScope.myLoves.length; i++) {

                            for (var j = 0; j < data.data.thumbnails.length; j++) {
                                if (data.data.thumbnails[j].name == $rootScope.myLoves[i]) {
                                    $scope.shoeThumbs.push(data.data.thumbnails[j].thumbnail);
                                    // $scope.looper.shoeThumbs.push(data.data.thumbnails[j].thumbnail);
                                }

                            }

                        }
                    });


                    User.getPermission().then(function (data) {

                        if (data.data.permission == "admin" || data.data.permission == "moderator") {

                            scope.authorized = true;
                            //scope.loadme = true;
                            //console.log("getPermission admin mod true scope.loadme has run");
                            //closeResults();
                            clseResults();
                            
                        } else {
                            scope.authorized = false;
                            //scope.loadme = true;
                            //console.log("getPermission scope.loadme has run");
                           // closeResults();
                           clseResults();
                        }

                    });




                });
                //console.log('Success: User is logged in.');
            } else {

                changeTitle();
                //console.log('Failure: User is not logged in.')
                scope.username = "";
                scope.isLoggedIn = false;
                // scope.loadme = true;
                //console.log("user is not logged in loadme has run...");
                clseResults();
            }



        });



        /*
      
            $http.get('/api/shoes').then(function(response){
      
              //console.log("hello");
              //console.log(response);
      
            });
         */

        this.doLogin = function (loginData) {

            //console.log("form submitted");

            scope.errorMsg = false;
            scope.loading = true;
            scope.expired = false;
            scope.disabled = true;
            Auth.login(scope.loginData).then(function (data) {

                //console.log(data.data.success);
                //console.log(data.data.message);

                if (data.data.success) {
                    //CREATE SUCCESS MESSAGE
                    //REDIRECT TO HOMEPAGE  
                    Auth.getUser().then(function (data) {

                        //console.log(data.data);
                        User.getShoppingBag(data.data.username).then(function (data) {

                            //console.log(data.data);
                            //console.log(data.data.user.shoppingbag.length);
                            $rootScope.cartItems = data.data.user.shoppingbag.length;

                        });

                    });


                    scope.loading = false;
                    scope.successMsg = data.data.message + '...Redirecting';
                    $timeout(function () {
                        scope.loginData = {};
                        scope.success = false;
                        $location.path('/');
                        scope.loginData = {};
                        scope.successMsg = "";
                        scope.disabled = false;
                        scope.success = false;
                        scope.checkSession();

                    }, 2000);



                } else {
                    if (data.data.expired) {
                        scope.expired = true;
                        scope.loading = false;
                        scope.errorMsg = data.data.message + '...Redirecting';

                    } else {

                        scope.loading = false;
                        scope.disabled = false;
                        scope.errorMsg = data.data.message;
                        //$timeout(function(){
                        // $location.path('/login');

                        //},2000);

                    }
                    //CREATE ERROR MESSAGE


                }

            });

        };
        scope.logout = function () {
            showModal(2);
        };
        ////console.log("testing registration controller");

        $rootScope.renewSession = function () {
            $scope.choiceMade = true;
            User.renewSession(scope.username).then(function (data) {
                //console.log(data);
                if (data.data.success) {
                    AuthToken.setToken(data.data.token);
                    scope.checkSession();

                } else {
                    scope.modalBody = data.data.message;

                }
            });
            hideModal();
        };

        scope.endSession = function () {
            $scope.choiceMade = true;
            hideModal();
            $timeout(function () {
                showModal(2);
            }, 1000);

        };

        var hideModal = function () {
            $("#myModal").modal('hide');

        }


        $scope.commercialChange = function () {

            if ($scope.commercial === 0) {
                $scope.commercial = 1;
            } else if ($scope.commercial === 1) {
                $scope.commercial = 2;
            } else {
                $scope.commercial = 0;
            }

        };
        $scope.newChange = function () {
            //console.log($scope.translate);
            if ($scope.translate === 0) {
                $scope.translate = 1;
            } else {
                $scope.translate = 0;
            }


        }
        $scope.newChangeY = function () {
            //console.log($scope.translateY);
            if ($scope.translateY === 2) {
                $scope.translateY = 1;

            }
            else {
                $scope.translateY = 2;
            }


        }

    });





}());
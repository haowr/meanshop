(function () {

    var app = angular.module('productsController', ['shopServices', 'heartServices', 'authServices', "userServices", 'shopServices', 'cookieServices', 'ngAnimate']);

    app.config(function () {

        //console.log("shoesCtrl loaded");

    });

    app.controller('shoesCtrl', function (Shop, $scope, $rootScope, $window, Heart, Auth, $document,$timeout) {
        /*
            var pink =$window.localStorage.getItem('myLoves');
            //console.log(pink);
            //console.log($rootScope.myLoves[0]);
            if($rootScope.myLoves !== null || $rootScope.myLoves[0] != undefined){
                $window.localStorage.setItem('myLoves',$rootScope.myLoves);
            }
             */
        var changeTitle = function () {

            $rootScope.title = "HOJ | Shop";

        }
        changeTitle();
        var scope = this;
        var name = "Z!";
        scope.imageIndex = 0;
        scope.loading = true;
        //$rootScope.heartss =$window.localStorage.getItem('cookieHearts');
        scope.sort;
        $scope.allShoes = [];
        $scope.shoes = [];
        $scope.shoesPaginated;
        $scope.hearts = 1;
        scope.hearts = false;
        $scope.loadme = false;
        $scope.loadmeShop = false;
        $scope.shoeLoader = true;
       /* $scope.searchEl= document.querySelector("#input");
        $scope.labelEl = document.querySelector("#label");

        
    // register clicks and toggle classes
    $scope.labelEl.addEventListener("click",function(){
        if (classie.has($scope.searchEl,"focus")) {
            classie.remove($scope.searchEl,"focus");
            classie.remove($scope.labelEl,"active");
        } else {
            classie.add($scope.searchEl,"focus");
            classie.add($scope.labelEl,"active");
        }
    });

    // register clicks outisde search box, and toggle correct classes
    document.addEventListener("click",function(e){
        var clickedID = e.target.id;
        if (clickedID != "search-terms" && clickedID != "search-label") {
            if (classie.has($scope.searchEl,"focus")) {
                classie.remove($scope.searchEl,"focus");
                classie.remove($scope.labelEl,"active");
            }
        }
    });
        //console.log($scope.searchEl);
        */
        $scope.load = function () {

            //console.log("$scope.load works!");
            // When the user scrolls down 20px from the top of the document, show the button
            window.onscroll = function () { scrollFunction() };

            function scrollFunction() {
                //console.log("scrollFunction()");
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    document.getElementById("myBtn").style.opacity = 100;
                } else {
                    document.getElementById("myBtn").style.opacity = 0;
                    document.getElementById("myBtn").style.backgroundColor = "#ffbbbc";
                }
            }



        };

        $scope.topFunction = function () {

            //console.log("hello");
            document.body.scrollTop = 0; // For Chrome, Safari and Opera 
            document.documentElement.scrollTop = 0; // For IE and Firefox

        }
        // When the user clicks on the button, scroll to the top of the document
        // function topFunction() {
        //   //console.log("hello");
        //  document.body.scrollTop = 0; // For Chrome, Safari and Opera 
        //  document.documentElement.scrollTop = 0; // For IE and Firefox
        //}
        $scope.load();
        var _page = -3;

        if (Auth.isLoggedIn()) {
            Auth.getUser().then(function (data) {

                //console.log(data.data);
                User.getUserProfile(data.data.username).then(function (data) {
                    //console.log(data.data.user.loves.length);
                    $rootScope.heartss = data.data.user.loves.length;
                })

            });

        } else {

            $rootScope.heartss = $window.localStorage.getItem('cookieHearts');
        }


        function getShoes() {

            Shop.getAllShoes().then(function (data) {

                //console.log(data.data.allshoes);
                changeTitle();
                for (var i = 0; i < 8; i++) {
                    $scope.allShoes.push(data.data.allshoes[i]);

                }

                Shop.getShoes().then(function (data) {
                    //console.log("getshoes");
                    //console.log(data);
                    if (data.data.success) {
                        $scope.shoes = $scope.allShoes;
                        //$scope.shoesPaginated = data.data.shoes[0].pages;
                        ////console.log($scope.shoesPaginated);
                        // $scope.loadme = true;
                        getPages();
                       
                    } else {
                        //console.log("Something went wrong getting shoe filepaths...");
                        //console.log(data.data.message);
                    }
                });
            })



        };
        getShoes();


        function getPages() {

            Shop.getPages().then(function (data) {
                //console.log(data.data.page);
                $scope.shoeLoader = false;
                //console.log("shoeloaderfalse");
                $scope.shoesPaginated = data.data.page;
                //console.log("loadme is running!")
                
                $timeout(function(){
                    
                    
                    $scope.loadme = true;

                },500);
                 
            });
        };
        

        $scope.heartAdderShop = function (shoename, shoeindex) {

            //console.log(shoename);
            //console.log(shoeindex);
            //console.log($scope.shoes[0]);


            //TOTAL HEARTS FOR STORE ITEM..
            Shop.incrementHearts(shoename).then(function (data) {    //FIND STORE ITEM WITH ROUTE AND THEN INCREMENT HEARTS VALUE BY ONE...

                //console.log(data.data.shoe);
                //THERE DOESN'T SEEM TO BE A Shop.incrementHearts() SERVICE USED... THOUGH ONE EXISTS...
                Shop.getMensShoe(shoename).then(function (data) {

                    $scope.mensShoe = data.data.allshoe[0];
                    ////console.log(data.data.allshoe);
                    ////console.log($scope.mensShoe.hearts);
                    $rootScope.totalHearts = data.data.allshoe[0].hearts;
                    $scope.shoes[shoeindex].hearts = data.data.allshoe[0].hearts;

                });
                Heart.activateHeart(shoename).then(function (data) {

                    //console.log(data.data);

                    $scope.shoes[shoeindex].heartactivated = data.data.shoe.heartactivated;

                });

            });
        }

        $scope.heartSubtractorShop = function (shoename, shoeindex) {

            //console.log(shoename);
            //console.log(shoeindex);
            //console.log($scope.shoes[0]);

            //TOTAL HEARTS FOR STORE ITEM..
            Shop.decrementHearts(shoename).then(function (data) {    //FIND STORE ITEM WITH ROUTE AND THEN INCREMENT HEARTS VALUE BY ONE...

                //console.log(data.data.shoe);
                //THERE DOESN'T SEEM TO BE A Shop.incrementHearts() SERVICE USED... THOUGH ONE EXISTS...
                Shop.getMensShoe(shoename).then(function (data) {

                    $scope.mensShoe = data.data.allshoe[0];
                    ////console.log(data.data.allshoe);
                    ////console.log($scope.mensShoe.hearts);
                    $rootScope.totalHearts = data.data.allshoe[0].hearts;
                    $scope.shoes[shoeindex].hearts = data.data.allshoe[0].hearts;

                });



            });

            Heart.deactivateHeart(shoename).then(function (data) {
                //console.log(data.data);

                $scope.shoes[shoeindex].heartactivated = data.data.shoe.heartactivated;

            });
        }

        $scope.loadMoreo = function () {
            _page++;
            scope.loading = true;
            //console.log(_page);
            if ($scope.shoesPaginated[0].pages[_page] !== undefined) {
                //console.log($scope.shoesPaginated[0].pages[_page]);
                $scope.shoes = $scope.shoes.concat($scope.shoesPaginated[0].pages[_page]);
                // scope.loading = false;
            } else {
                //console.log("No more pages");
            }

        };

        //      function() {
        //	this.imageIndex = 0;
        $scope.currentImageChange = function (imageNumber) {
            //console.log("Hello");
            //console.log(imageNumber);
            $scope.imageIndex = imageNumber || 0;
        };

        $scope.sortOrder = function (order) {

            $scope.order = order;
            //console.log($scope.order);
        };


    });

    app.controller('galleryCtrl', function () {
        this.imageIndex = 0;

        this.currentImageChange = function (imageNumber) {
            //console.log("Hello");
            //console.log(imageNumber);
            this.imageIndex = imageNumber || 0;
        };

    });

    app.controller('heartCtrl', function () {
        this.hearts = 1;

        // this.currentImageChange = function(imageNumber) {
        // //console.log("Hello");
        //	//console.log(imageNumber);
        // this.imageIndex = imageNumber || 0;
        //};


    });
    

}());
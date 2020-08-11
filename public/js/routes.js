//console.log("routes.js loaded");

(function () {

    var app = angular.module('appRoutes', ['ngRoute', 'userServices', 'infinite-scroll']);



    app.config(function ($routeProvider, $locationProvider) {//Only providers in config phase... no $rootScope or any other instances...

        $routeProvider
            .when('/', {

                templateUrl: '../views/pages/home.html',
                name: "HOJ | Home",
                resolve: {
                    init: function ($route) {
                        //return function(){
                        //console.log($route.current.$$route.name);
                        //$rootScope.title = $route.current.$$route.name;
                        //}
                    }

                }

            })
            .when('/about', {

                templateUrl: '../views/pages/about.html',
                name: "HOJ | About"

            })
            .when('/register', {

                templateUrl: '../views/pages/users/register.html',
                controller: 'regCtrl',
                controllerAs: 'register',
                name: "HOJ | Register",
                authenticated: false

            })
            .when('/login', {

                templateUrl: '../views/pages/users/login.html',
                name: "HOJ | Login",
                authenticated: false


            })
            .when('/logout', {

                templateUrl: '../views/pages/users/logout.html',
                name: "HOJ | Logout",
                authenticated: true


            })
            .when('/profile/orderdetails/:number', {
                templateUrl: '../views/pages/users/orderdetails.html',
                controller: 'profileCtrl',
                controllerAs: 'profile',
                name: "HOJ | Order Details",
                authenticated: true


            })
            .when('/profile/orderdetails/:username/:number', {
                templateUrl: '../views/pages/users/orderdetailsforadmin.html',
                controller: 'profileCtrl',
                controllerAs: 'profile',
                name: "HOJ | Order Details",
                authenticated: true


            })
            .when('/profile', {

                templateUrl: '../views/pages/users/profile.html',
                controller: 'profileCtrl',
                controllerAs: 'profile',
                name: "HOJ | Your Profile",
                authenticated: true


            })
            .when('/shop', {

                templateUrl: '../views/pages/shop.html',
                controller: 'shoesCtrl',
                name: "HOJ | Shop",
                controllerAs: 'shoes'
            })
            .when('/shop/mens/:name', {
                templateUrl: '../views/mensshoes.html',
                controller: 'mensCtrl',

                controllerAs: 'mens'

            })
            .when('/shop/orderconfirmation', {
                templateUrl: '../views/orderconfirmation.html',
                controller: 'orderConfirmationCtrl',
                name: "HOJ | Order Confirmation",
                controllerAs: 'order'



            })
            .when('/shop/checkout/oneclick', {
                templateUrl: '../views/pages/oneclick.html',
                controller: 'checkoutCtrl',
                controllerAs: 'checkout',
                name: "HOJ | One Click Checkout",
                authenticated: true

            })
            .when('/faq', {

                templateUrl: '../views/pages/faq.html',
                controller: 'faqCtrl',
                name: "HOJ | FAQ",
                controllerAs: 'faq'

            })
            .when('/returns', {

                templateUrl: '../views/pages/returns.html',

                name: "HOJ | Returns"


            })
            .when('/contact', {

                templateUrl: '../views/pages/contact.html',

                name: "HOJ | Contact"


            })

            .when('/shop/checkout', {
                templateUrl: '../views/pages/checkout.html',
                controller: 'checkoutCtrl',
                name: "HOJ | Checkout",
                controllerAs: 'checkout'

            })
            .when('/shop/checkout/ordersummary', {
                templateUrl: '../views/pages/ordersummary.html',
                controller: 'checkoutCtrl',
                name: "HOJ | Order Summary",
                controllerAs: 'checkout'

            })
            .when('/shop/shoppingbag', {

                templateUrl: '../views/pages/shoppingbag.html',
                controller: 'shoppingBagCtrl',
                name: "HOJ | Shopping Bag",
                controllerAs: 'shoppingBag'


            })

            .when('/activate/:token', {
                templateUrl: '../views/pages/users/activation/activate.html',
                controller: 'emailCtrl',
                controllerAs: 'email',
                name: "HOJ | Account Activation",
                authenticated: false
            })
            .when('/resend', {
                templateUrl: '../views/pages/users/activation/resend.html',
                controller: 'resendCtrl',
                controllerAs: 'resend',
                name: "HOJ | Resend Account Activation Link",
                authenticated: false
            })
            .when('/resetusername', {
                templateUrl: '../views/pages/users/reset/username.html',
                controller: 'usernameCtrl',
                controllerAs: 'username',
                name: "HOJ | Reset Username",
                authenticated: false
            })
            .when('/resetpassword', {
                templateUrl: '../views/pages/users/reset/password.html',
                controller: 'passwordCtrl',
                controllerAs: 'password',
                name: "HOJ | Reset Password",
                authenticated: false
            })
            .when('/reset/:token', {
                templateUrl: '../views/pages/users/reset/newpassword.html',
                controller: 'resetCtrl',
                controllerAs: 'reset',
                name: "HOJ | Change Password",
                authenticated: false
            })
            .when('/management', {
                templateUrl: '../views/pages/management/management.html',
                controller: 'managementCtrl',
                controllerAs: 'management',
                name: "HOJ | Management",
                authenticated: true,
                permission: ["admin", "moderator"]
            })
            .when('/edit/:id', {
                templateUrl: '../views/pages/management/edit.html',
                controller: 'editCtrl',
                controllerAs: 'edit',
                name: "HOJ | Management",
                authenticated: true,
                permission: ["admin", "moderator"]
            })

            .when('/search', {
                templateUrl: '../views/pages/management/search.html',
                controller: 'managementCtrl',
                controllerAs: 'management',
                name: "HOJ | Management",
                authenticated: true,
                permission: ["admin", "moderator"]
            })
            .otherwise({ redirectTo: '/' });



        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }); //now no more # before route


    });
    app.run(['$rootScope', 'Auth', '$location', 'User', function ($rootScope, Auth, $location, User, $routeUpdate, $routeParams) {

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            //console.log(Auth.isLoggedIn());
            //console.log(next.$$route.name);
            $rootScope.title = next.$$route.name;
            if (next.$$route !== undefined) {

                if (next.$$route.authenticated == true) {
                    //console.log("Requires authentication!")
                    if (!Auth.isLoggedIn()) {
                        //console.log("You're not logged in dude!");
                        event.preventDefault();
                        $location.path('/login');
                    } else if (next.$$route.permission) {
                        User.getPermission().then(function (data) {
                            ////console.log(data);
                            if (next.$$route.permission[0] != data.data.permission) {
                                if (next.$$route.permission[1] != data.data.permission) {

                                    $location.path('/');
                                }
                            }
                        });

                    }

                } else if (next.$$route.authenticated == false) {

                    //console.log("Does not require authentication!")
                    if (Auth.isLoggedIn()) {
                        event.preventDefault();
                        $location.path('/profile');
                    }
                } else {
                    //console.log("Authenticated does not matter");
                    //$route.reload();
                }
                //console.log(next.$$route.authenticated);
            }

            //if($routeParams.name == )

        });


    }]);


}());
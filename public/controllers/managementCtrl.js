(function(){

    var app = angular.module('managementController',['userServices','emailServices','angularUtils.directives.dirPagination']);

    app.config(function(){

        //console.log("managementController loaded and initialized...");

    });

    app.controller('managementCtrl',function(User,$scope,Email){

        scope = this;
        scope.loading = false;
        scope.accessDenied = true;
        scope.errorMsg = false;
        scope.editAccess = false;
        scope.deleteAccess = false;
        scope.limit= 5;
        scope.successMsg = "";
        scope.errorMsg = false;
        scope.searchLimit = 0;
        $scope.emailList = [];
        $scope.storeOrders =[];
        $scope.storeHistory;
        $scope.inventory = [];
        //$scope.shoes;

function getUsers(){


        
        User.getUsers().then(function(data){
            if(data.data.success){
                //console.log(data.data.users);
                if(data.data.permission == 'admin' || data.data.permission == 'moderator'){
                    User.getStoreHistoryForAdmin("ohrha").then(function(data){
                        //console.log(data.data);
                        $scope.storeHistory = data.data.storehistory.storehistory;

                        //console.log($scope.storeHistory);
                        User.getStoreOrdersForAdmin("ohrha").then(function(data){

                        //console.log(data.data.storeorders.storeorders);
                        for (var i = 0; i<data.data.storeorders.storeorders.length; i++){

                            for( var j =0; j<data.data.storeorders.storeorders[i].length; j++){

                                $scope.inventory.push(data.data.storeorders.storeorders[i][j]);
                                /*for (var k = 0; k<data.data.storeorders.storeorders[i][j].length;k++){
                                    $scope.inventory.push(data.data.storeorders.storeorders[i][j][k]);
                                }*/

                            }
                        }
                        $scope.storeOrders = data.data.storeorders;
                        //console.log($scope.inventory);

                        })

                    })

                    scope.users = data.data.users;
                    scope.loading = false;
                    scope.accessDenied = false;
                    if(data.data.permission == 'admin'){
                        scope.editAccess = true;
                        scope.deleteAccess = true;
                        Email.getEmailList().then(function(data){


                            //console.log(data.data.emails);
                            $scope.emailList = data.data.emails;
                            //for(var i = 0; i< data.data.emails.emails.length; i++){

                               // $scope.emailList.push(data.data.emails.emails[0].emaillist[i]);
                            //}
                            ////console.log($scope.emailList);

                        });

                    }else if(data.data.permission == 'moderator'){

                        scope.editAccess = true;
                    }

                }else{
                    scope.errorMsg = "Insuffiecient permissions...";
                    scope.loading = false;

                }
            }else{

                    scope.errorMsg = data.data.message;
                    scope.loading = false;
                }
        });
};
getUsers();

    
    $scope.removeEmail = function(email,index){

        Email.removeEmail(email).then(function(data){


            ////console.log(data.data.emails.emaillist);
            if(data.data.success){
                $scope.emailList.splice(index);

            }
            

        })

    };
        scope.showMore = function(number){
            scope.showMoreError = false;

            if(number > 0){
                scope.limit = number;
                scope.loading = false;

            }else{
                
                scope.showMoreError = "Please enter a valid number...";
                scope.loading = false;
            }

        };
        scope.showAll = function(){
            scope.limit = undefined;
            scope.showMoreError = undefined;
            scope.number = undefined;

        };

   scope.deleteUser = function(username){
        //console.log('click');
        User.deleteUser(username).then(function(data){
            //console.log(data);
            if(data.data.success){

                getUsers();

            }else{

                app.showMoreError = data.data.message;
            }

        });

    };
        scope.search = function(searchKeyword, number){
        
        if(searchKeyword){

            if(searchKeyword.length > 0){
                scope.limit = 0;
                $scope.searchFilter = searchKeyword;
                scope.limit = number;

                
            }else{
                $scope.searchFilter = undefined;
                scope.limit = 0;

            }

        }else{
            //console.log("test");
            $scope.searchFilter = undefined;
            scope.limit = 0;
        }

    };

    scope.clear = function(){
        $scope.number = 'Clear';
        scope.limit = 0;
        $scope.searchKeyword = undefined;
        $scope.searchFilter = undefined;
        scope.showMoreError = false;
        

    };

    scope.advancedSearch = function(searchByUsername, searchByEmail, searchByName){
        $scope.searchByUsername = searchByUsername;
        $scope.searchByEmail = searchByEmail;
        $scope.searchByName = searchByName;
        if(searchByUsername || searchByEmail || searchByName){
            $scope.advancedSearchFilter = {};
            if(searchByUsername){
                $scope.advancedSearchFilter.username = searchByUsername; //field that we append has to match the property in the database..
            }
            if(searchByEmail){
                $scope.advancedSearchFilter.email = searchByEmail;
            }
            if(searchByName){
                $scope.advancedSearchFilter.name = searchByName;
            }
            scope.searchLimit = undefined;
        }else{
            scope.searchLimit = 0;
        }



    };
    scope.sortOrder = function(order){
        scope.sort = order;

    };


    });

 
app.controller('editCtrl',function($scope, User, $routeParams,$timeout){

 


    scope= this;
    $scope.nameTab = 'active';
    $scope.usernameTab ="";
    $scope.emailTab = '';
    $scope.permissionTab = '';
    scope.phase1 = true;
    scope.phase2 = false;
    scope.phase3 = false;
    scope.phase4 = false;



    User.getUser($routeParams.id).then(function(data){

            //console.log(data);
            if(data.data.success){
                $scope.newName = data.data.user.name;
                $scope.newEmail = data.data.user.email;
                $scope.newUsername = data.data.user.username;
                $scope.newPermission = data.data.user.permission;
                scope.currentUser = data.data.user._id;

            


            }else{

                scope.errorMsg = data.data.message;
            }

        });

    scope.namePhase = function(){
        $scope.usernameTab = 'default';
        $scope.nameTab = 'active';
        $scope.emailTab = 'default';
        $scope.permissionTab = 'default';
        scope.phase1 = true;
        scope.phase2 = false;
        scope.phase3 = false;
        scope.phase4 = false;
        scope.errorMsg =false;

    };

    scope.usernamePhase = function(){
        $scope.usernameTab = 'active';
        $scope.nameTab = 'default';
        $scope.emailTab = 'default';
        $scope.permissionTab = 'default';
        scope.phase1 = false;
        scope.phase2 = true;
        scope.phase3 = false;
        scope.phase4 = false;
        scope.errorMsg =false;



    };

    scope.emailPhase = function(){
        $scope.usernameTab = 'default';
        $scope.nameTab = 'default';
        $scope.emailTab = 'active';
        $scope.permissionTab = 'default';
        scope.phase1 = false;
        scope.phase2 = false;
        scope.phase3 = true;
        scope.phase4 = false;
        scope.errorMsg = false;

    };

    scope.permissionPhase = function(){
        $scope.usernameTab = 'default';
        $scope.nameTab = 'default';
        $scope.emailTab = 'default';
        $scope.permissionTab = 'active';
        scope.phase1 = false;
        scope.phase2 = false;
        scope.phase3 = false;
        scope.phase4 = true;
        scope.disableUser = false;
        scope.disableModerator = false;
        scope.disableAdmin = false;
        scope.errorMsg = false;
        if($scope.newPermission === 'user'){
            scope.disableUser = true;
        }else if($scope.newPermission === 'moderator'){
            scope.disableModerator = true;
        }else{
            scope.disableAdmin = true;
        }

    };
    scope.updateName= function(newName, valid){
        scope.errorMsg = false;
        scope.successMsg = false;
        scope.disabled = false;
        var userObject = {};
        

    if(valid){
            userObject._id = scope.currentUser;
            userObject.name = $scope.newName;

            User.editUser(userObject).then(function(data){
                //console.log(data);
                if(data.data.success){
                    scope.successMsg = data.data.message;
                    $timeout(function(){
                        scope.nameForm.name.$setPristine();
                        scope.nameForm.name.$setUntouched();
                        scope.successMsg = false;
                        scope.disabled = false;

                    },2000)

                }else{
                    scope.errorMsg = data.data.message;
                    scope.disabled = false;

                }
                //console.log(data);
            });


        }else{

            scope.errorMsg = "Please ensure form is completely filled in..";
            scope.disabled = false;
        }

    };
    scope.updateEmail= function(newEmail, valid){
        scope.errorMsg = false;
        scope.successMsg = false;
        scope.disabled = false;
        var userObject = {};
        

    if(valid){
            userObject._id = scope.currentUser;
            userObject.email = $scope.newEmail;
            User.editUser(userObject).then(function(data){
                //console.log(data);
                if(data.data.success){
                    scope.successMsg = data.data.message;
                    $timeout(function(){
                        scope.usernameForm.name.$setPristine();
                        scope.usernameForm.name.$setUntouched();
                        scope.successMsg = false;
                        scope.disabled = false;

                    },2000)

                }else{
                    scope.errorMsg = data.data.message;
                    scope.disabled = false;

                }
                //console.log(data);
            });


        }else{

            scope.errorMsg = "Please ensure form is completely filled in..";
            scope.disabled = false;
        }

    };
    scope.updateUsername= function(newUsername, valid){
        scope.errorMsg = false;
        scope.successMsg = false;
        scope.disabled = false;
        var userObject = {};
        

    if(valid){
            userObject._id = scope.currentUser;
            userObject.username = $scope.newUsername;
            User.editUser(userObject).then(function(data){
                //console.log(data);
                if(data.data.success){
                    scope.successMsg = data.data.message;
                    $timeout(function(){
                        scope.emailForm.name.$setPristine();
                        scope.emailForm.name.$setUntouched();
                        scope.successMsg = false;
                        scope.disabled = false;

                    },2000)

                }else{
                    scope.errorMsg = data.data.message;
                    scope.disabled = false;

                }
                //console.log(data);
            });


        }else{

            scope.errorMsg = "Please ensure form is completely filled in..";
            scope.disabled = false;
        }

    };
    scope.updatePermissions= function(newPermission){
        scope.errorMsg = false;
        scope.successMsg = false;
        scope.disabled = false;
        scope.disableUser = true;
        scope.disableAdmin = true;
        scope.disableModerator = true;
        var userObject = {};
        

    
            userObject._id = scope.currentUser;
            userObject.permission = newPermission;
            User.editUser(userObject).then(function(data){
                //console.log(data);
                if(data.data.success){
                    
                    scope.successMsg = data.data.message;

                    $timeout(function(){
                        scope.successMsg = false;
                                if(newPermission === 'user'){
                                        $scope.newPermission = 'user';
                                        scope.disableUser = true;
                                        scope.disableModerator = false;
                                        scope.disableAdmin = false;
                                 }else if(newPermission === 'moderator'){
                                        $scope.newPermission = 'moderator';
                                        scope.disableModerator = true;
                                        scope.disableUser = false;
                                        scope.disableAdmin = false;
                                 }else if(newPermission === 'admin'){
                                        $scope.newPermission = 'admin';
                                        scope.disableAdmin = true;
                                        scope.disableUser = false;
                                        scope.disableModerator = false;
                                 }


                    },2000)

                }else{
                    scope.errorMsg = data.data.message;
                    scope.disabled = false;

                }
                //console.log(data);
            });


        //}else{

           // scope.errorMsg = "Please ensure form is completely filled in..";
           // scope.disabled = false;
      //  }

    };
    





});



}());
//console.log("testing userCrtl");
(function(){

var app = angular.module("userControllers",['userServices']);

app.controller('regCtrl',function($http,$location,$timeout,User){
 var scope= this;
    

    this.regUser = function(regData, valid){

        //console.log("form submitted");
       
        scope.errorMsg=false;
        scope.loading= true;
        scope.disabled=true;

        if(valid){
                    User.create(scope.regData).then(function(data){

            console.log(data.data.success);
            console.log(data.data.message);
            
            if(data.data.success){
                //CREATE SUCCESS MESSAGE
                //REDIRECT TO HOMEPAGE  
                scope.loading= false;
                scope.successMsg= data.data.message;
                $timeout(function(){
                    $location.path('/');

                },2000);
                
                

            }else{
                //CREATE ERROR MESSAGE
                scope.loading=false;
                scope.disabled=false;
                scope.errorMsg=  data.data.message;
                $location.path('/register');
                

            }

        });

        }else{
            scope.loading = false;
            scope.disabled=false;
            scope.errorMsg = "Please ensure form is filled out properly";
        }

    };
    ////console.log("testing registration controller");
    this.checkUsername = function(regData){
            scope.checkingUsername = true;
            scope.usernameMsg = false;
            scope.usernameInvalid = false;

        User.checkUsername(scope.regData).then(function(data){

           //console.log(data);
           if (data.data.success){
               scope.checkingUsername = false;
               //scope.usernameInvalid = false;
               scope.usernameMsg = data.data.message;
           }else{
               scope.checkingUsername = false;
               scope.usernameInvalid = true;
               scope.usernameMsg = data.data.message;
               //console.log(scope.checkingUsername);
           }

        });
    }
      this.checkEmail = function(regData){

            scope.checkingEmail = true;
            scope.emailMsg = false;
            scope.emailInvalid = false;
        User.checkEmail(scope.regData).then(function(data){

           // //console.log(data);
           if (data.data.success){
               scope.checkingEmail = false;
               scope.emailInvalid = false;
               scope.emailMsg = data.data.message;
           }else{
               scope.checkingEmail = false;
               scope.emailInvalid = true;
               scope.emailMsg = data.data.message;
           }

        });
    }


});
app.directive('match',function(){

return {

    restrict: 'A',
    controller: function($scope){
        $scope.doConfirm = function(values){
            values.forEach(function(val){
                $scope.confirmed = false;

                if($scope.confirm == val){
                    $scope.confirmed = true;
                }else{
                    $scope.confirmed = false;
                }
                ////console.log($scope.confirm);
        });

            ////console.log(values);
            ////console.log($scope.confirm);
        };
    },
    link: function(scope, element, attrs){

        attrs.$observe('match',function(){
            scope.matches= JSON.parse(attrs.match);
            scope.doConfirm(scope.matches);

        });
        scope.$watch('confirm',function(){
            scope.matches= JSON.parse(attrs.match);
            scope.doConfirm(scope.matches);

        });

    }
};

});

app.config(function(){

    //console.log("testing new module");
    
});







}());
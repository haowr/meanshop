(function(){

    var app = angular.module('faqController',[]);

    app.controller('faqCtrl',function($scope,$rootScope){
              var changeTitle = function(){

        $rootScope.title ="HOJ | FAQ";

    }
    changeTitle();

        //console.log("faqCtrl is loaded and initialized...");
    
        $scope.showAnswer = false;
        $scope.showAnswer2 = false;
        $scope.showAnswer3 = false;
        $scope.showAnswer4 = false;
        $scope.showAnswer5 = false;

        //console.log($scope.showAnswer);

        $scope.showAnswerFunc = function(item){

            //console.log("button pressed");
            if(!$scope.showAnswer && item === 1){

                $scope.showAnswer = true;

            }else{

                $scope.showAnswer = false;
            }

            if(!$scope.showAnswer2 && item === 2){

                $scope.showAnswer2 = true;

            }else{

                $scope.showAnswer2 = false;
            }

            if(!$scope.showAnswer3 && item === 3){

                $scope.showAnswer3 = true;

            }else{

                $scope.showAnswer3 = false;
            }

            if(!$scope.showAnswer4 && item === 4){

                $scope.showAnswer4 = true;

            }else{

                $scope.showAnswer4 = false;
            }
            if(!$scope.showAnswer5 && item === 5){

                $scope.showAnswer5 = true;

            }else{

                $scope.showAnswer5 = false;
            }

        }



    });





}());
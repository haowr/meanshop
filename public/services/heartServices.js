////console.log("heartServices loaded...");
(function(){

    var app = angular.module('heartServices',[]);
    app.config(function(){

        ////console.log("heartServices loaded...");
    });
   

    app.factory('Heart',function($http){

        var heartFactory = {};
        //scope = this;
        //scope.hearts = 0;
        //heartFactory.hearts= 0;
        heartFactory.addHeart = function(newHeartValue){
            //scope.hearts++
           // ////console.log(newHeartValue);
            return $http.put('/api/hearts');


        }
        heartFactory.removeHeart = function(){

            return $http.put('/api/remhearts');
        }
        heartFactory.getHearts = function(){

            return $http.put('/api/findhearts');
        }
        heartFactory.activateHeart = function(shoename){
            return $http.put('/api/activateheart/'+shoename);
        }
        heartFactory.deactivateHeart = function(shoename){
            return $http.put('/api/deactivateheart/'+shoename);
        }
        heartFactory.isActivated = function(shoename){
            return $http.put('/api/isactivated',shoename);
        }
        heartFactory.whoActivated = function(){
            return $http.put('/api/whoactivated');
        }
        heartFactory.activatedBy = function(shoename){
            return $http.put('/api/activatedby',shoename)
        }

        return heartFactory;



    });





}());
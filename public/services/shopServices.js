(function(){


var app = angular.module('shopServices', []);

app.factory('Shop', function($http){

    shopFactory = {};

    //Shop.create();
    shopFactory.create = function(){
       return $http.post('/api/shoes');

    };

    //Shop.getShoes();
    shopFactory.getShoes = function(){

       return $http.put('api/shoes');


    };

    //Shop.getPages();
    shopFactory.getPages = function(){

        return $http.put('api/pages');
    };

    //Shop.getAllSHoes();
    shopFactory.getAllShoes = function(){

        return $http.put('/api/allshoes');

    };
    //Shop.getMyLoveThumbnails(name)
    //Shop.getMensShoe();
    shopFactory.getMensShoe = function(name){
        return $http.put('/api/shoes/mensshoes/'+name);

    };
    //Shop.getMultipleShoes();
    shopFactory.getMultipleShoes =function(shoes){
        return $http.put('/api/shoes/multiplemensshoes/'+shoes);
    };
    //Shop.getThumbnails();
    shopFactory.getThumbnails = function(){

        return $http.put('/api/thumbnails');
    }
    //Shop.addToCheckout();
    shopFactory.addToCheckout = function(newitem){

        return $http.post('/api/addtocheckout',newitem);

    }
    //Shop.checkout();
    shopFactory.checkout = function(checkoutData){

        return $http.post('/api/checkout', checkoutData);
        
    }
    //Shop.stripeCheckout(checkoutData);
    shopFactory.stripeCheckout = function(checkoutData){
        return $http.post('/api/stripecheckout',checkoutData);
    }
        //Shop.stripeCheckout2(checkoutData);
    shopFactory.stripeCheckout2 = function(checkoutData){
        return $http.post('/api/stripecheckout2',checkoutData);
    }
    //Shop.incrementHearts(shoename);
    shopFactory.incrementHearts = function(shoename){
        return $http.put('/api/incrementhearts/'+ shoename);

    }
    //Shop.decrementHearts(shoename);
    shopFactory.decrementHearts = function(shoename){
        return $http.put('/api/decrementhearts/'+ shoename);

    }
   // //Shop.decrementHeartsBy(shoename,loveslength);
   shopFactory.decrementHeartsBy= function(shoename,loveslength){

        return $http.put('/api/decrementheartsby/'+shoename+'/'+lovelength);

   }

return shopFactory;





});




}());
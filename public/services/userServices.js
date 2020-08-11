//console.log("userServices loaded");
(function(){

var app = angular.module('userServices',[]);

app.config(function(){

    //console.log("testing services module");

});

app.factory('User', function($http){  //a way to organize the code..

 userFactory ={};

//User.create(regData);
 userFactory.create = function(regData){

     return $http.post('/api/users',regData); //no need for "this.regData"
 }
 //User.checkUsername(regData);
  userFactory.checkUsername = function(regData){

     return $http.post('/api/checkusername',regData); //no need for "this.regData"
 }
 //User.checkEmail(regData);
  userFactory.checkEmail= function(regData){

     return $http.post('/api/checkemail',regData); //no need for "this.regData"
 }
 //User.activateAccount(token);
 userFactory.activateAccount= function(token){
     return  $http.put('/api/activate/'+token);
 }
 //User.checkCredentials(LoginData);
 userFactory.checkCredentials = function(loginData){

    return $http.post('/api/resend',loginData);

 }
  //User.resendLink(username);
  userFactory.resendLink = function(username){

    return $http.put('/api/resend',username);


 }
   //User.sendUsername(username);
  userFactory.sendUsername = function(userData){

    return $http.put('/api/resetusername/'+userData);

 }
    //User.sendPassword(resetData);
  userFactory.sendPassword = function(resetData){

    return $http.put('/api/resetpassword',resetData);

 }
     //User.sendPassword(resetData);
  userFactory.resetUser = function(token){

    return $http.put('/api/resetpassword/'+token);

 }
      //User.savePassword(regData);
  userFactory.savePassword = function(regData){

    return $http.put('/api/savepassword/',regData);

 }
    //User.renewSession(username);
  userFactory.renewSession= function(username){

    return $http.put('/api/renewtoken/'+username);

 }
   //User.getPermission();
 userFactory.getPermission= function(){

    return $http.put('/api/permission');

 }
 //User.getUsers();
  userFactory.getUsers= function(){

    return $http.put('/api/management');

 }
  //User.delete();
  userFactory.deleteUser= function(username){

    return $http.delete('/api/management/'+username);

 }
   //User.getUser(id);
  userFactory.getUser= function(id){

    return $http.put('/api/edit/'+id);

 }
   //User.getUser(username){
  userFactory.getUserProfile = function(username){

    return $http.put('/api/finduser/'+username);

  }
   
    //User.editUser(id);
  userFactory.editUser= function(id){

    return $http.put('/api/edit/',id);

 }
 //User.addLove(love,name);
  userFactory.addLove = function(love, name){
  return $http.put('/api/addlove/'+love+'/'+name);
  }
 //User.removeLove(love,name);
  userFactory.removeLove = function(love, name){
  return $http.put('/api/removelove/'+love+'/'+name);
  }

  //User.getLoves(username);
  userFactory.getLoves = function(username){

    return $http.put('/api/getloves/'+username);

  }
  userFactory.findLove = function(user,love){

    return $http.put('/api/findlove/'+user+'/'+love);

  }
  //User.getOrders(username);
  userFactory.getOrders = function(username){

    return $http.put('/api/getorders/'+username);

  }
  //User.addOrdertoUser(order);
  userFactory.addOrdersToUser = function(order){

    return $http.post('/api/addorderstouser',order);

  }
    //User.addOrdertoUser(order);
  userFactory.addOrdersToUser2 = function(order){

    return $http.post('/api/addorderstouser2',order);

  }
  //User.addYourShippingDetails(shipping);
  userFactory.addYourShippingDetails = function(shipping){

    return $http.post('/api/addyourshippingdetails',shipping);

  }
    //User.addYourCCDetails(cc);
  userFactory.addYourCCDetails = function(cc){

    return $http.post('/api/addyourccdetails',cc);

  }
  //User.addYourBillingDetails(billing);
  userFactory.addYourBillingDetails = function(billing){

    return $http.post('/api/addyourbillingdetails',billing);

  }
  //User.addGrandTotalToShoppingBag(username,grandtotal);
  userFactory.addGrandTotalToShoppingBag = function(username,grandtotal){

    return $http.put('/api/addgrandtotalshoppingbag/'+username+'/'+grandtotal);

  }
  //User.addTotalToUser(user,total);
  userFactory.addTotalToUser = function(user,total){

    return $http.put('/api/addtotaltouser/'+user+'/'+total);

  }
  //User.clearTotalsFromUser(username);
  userFactory.clearTotalsFromUser = function(username){

    return $http.put('/api/cleartotalsfromuser/'+username);

  }
  //User.addGroupedOrdersToUser(username,ordersgrouped);
  userFactory.addGroupedOrdersToUser = function(ordersgrouped){


    return $http.post('/api/addordersgroupedtouser',ordersgrouped);

  }
  //User.getGroupedOrdersFromUser(username);
  userFactory.getGroupedOrdersFromUser = function(username){

    return $http.put('/api/getordersgroupedfromuser/'+username);

  }
  //User.addGroupedOrderToAdmin(ordersgrouped);
  userFactory.addGroupedOrdersToAdmin = function(ordersgrouped){

    return $http.post('/api/addgroupedorderstoadmin/',ordersgrouped);

  }
  //User.getStoreOrdersForAdmin(ohrha);
  userFactory.getStoreOrdersForAdmin= function(admin){

    return $http.put('/api/getstoreordersforadmin/'+admin);

  }

  //User.removeOrdersGroupedFromUser(username,index);
  userFactory.removeOrdersGroupedFromUser = function(username, indexoforder,index){

    return $http.put('/api/removeordersgroupedfromuser/'+username+'/'+indexoforder+'/'+index);

  }
    //User.removeOrdersGroupedFromUser(username,index);
  userFactory.removeOrdersGroupedArrayFromUser = function(username, index){

    return $http.put('/api/removeordersgroupedarrayfromuser/'+username+'/'+index);

  }
  //User.clearOrdersGroupedFromUser(username);
  userFactory.clearOrdersGroupedFromUser = function(username){

    return $http.put('/api/clearordersgroupedfromuser/'+username);

  }
  //User.addOrderHistoryToUser(username);
  userFactory.addOrderHistoryToUser = function(orderhistory){
    return $http.post('/api/addorderhistorytouser/',orderhistory);
  }
  //User.addStoreHistoryToAdmin(orderhistory);
  userFactory.addStoreHistoryToAdmin = function(orderhistory){

    return $http.post('/api/addstorehistorytoadmin/',orderhistory);

  }
  //User.getStoreHistoryForAdmin(admin);
  userFactory.getStoreHistoryForAdmin = function(admin){

    return $http.put('/api/getstorehistoryforadmin/'+admin);

  }
  //User.getOrderHistoryFromUser(username);
  userFactory.getOrderHistoryFromUser = function(username){

    return $http.put('/api/getorderhistoryfromuser/:username');

  }
  //User.removeOrderHistoryFromUser(username,index);
  userFactory.removeOrderHistoryFromUser = function(username,index){

    return $http.put('/api/removeorderhistoryfromuser/'+username+'/'+index);

  }
  //User.increaseOrderNumber(username);
  userFactory.increaseOrderNumber= function(username){

    return $http.put('/api/increaseordernumber/'+username);

  }
  
  //User.getTotalsFromUser(user);
  userFactory.getTotalsFromUser = function(user){

    return $http.put('/api/gettotalsfromuser/'+user);
  }
  //User.sendEmail(email);
  userFactory.sendEmail = function(email,username,grandtotal,tax){

    return $http.put('/api/sendemail/'+email+'/'+username+'/'+grandtotal+'/'+tax);

  }
  //User.sendEmailEmailList(email);
  userFactory.sendEmailEmailList = function(email){

    return $http.put('/api/sendemailemaillist/'+email);

  }
  //User.increaseAdminHearts(ohrha); MIGHT NOT USE
  userFactory.increaseAdminHearts = function(shoename){

    return $http.put('/api/increaseadminhearts/'+shoename);

  }
    //User.decreaseAdminHearts(ohrha); MIGHT NOT USE
  userFactory.decreaseAdminHearts = function(shoename){

    return $http.put('/api/decreaseadminhearts/'+shoename);

  }
  userFactory.getProducts = function(){

    return $http.put('/api/getproducts');

  }
  userFactory.updateAdminProducts = function(newAdminProducts){

    return $http.post('/api/updateadminproducts',newAdminProducts);

  }
  userFactory.addToShoppingBag = function(shoppingBag){
    
    return $http.post('/api/addtoshoppingbag',shoppingBag);

  }
  userFactory.getShoppingBag = function(username){

    return $http.put('/api/getshoppingbag/'+username);

  }
  userFactory.addTotalToUser = function(username, newtotal){

    return $http.put('/api/addtotaltouser/'+username+'/'+newtotal);;

  }
  userFactory.addShippingChoiceToUser = function(username,shippingchoice){

    return $http.put('/api/addshippingchoicetouser/'+username+'/'+shippingchoice);

  }
  userFactory.clearShoppingBag = function(user, shoppingbag){

    return $http.put('/api/clearshoppingbag/'+user+'/'+shoppingbag);

  }
  userFactory.removeOneItem = function(user,index){

    return $http.put('/api/removeoneitem/'+user+'/'+index);

  }
  userFactory.addOneItem = function(user,index){

    return $http.put('/api/addoneitem/'+user+'/'+index);

  }
  userFactory.pullOneItem =function(user, index){


    return $http.put('/api/pulloneitem/'+user+'/'+index);

  }
  userFactory.clearHearts = function(user){

    return $http.put('/api/clearhearts/'+user);

  }
  userFactory.removeLove = function(username, shoename){

    return $http.put('/api/removeonelove/'+username+'/'+shoename);

  }
  userFactory.removeOneOrder = function(username,index){

    return $http.put('/api/removeoneorder/'+username+'/'+index);

  }


 return  userFactory;

});


}());
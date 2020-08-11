$(document).ready(function(){
     $('#container').html("<a href = '#' id='lok'><img src='1.JPG' alt ='picture' width = '800px' height= '800px'></a>").fadeIn(2000);
     $('#title').html(pictureList[1]).fadeIn(500);
     
    $("#right").on('click',pictureChanger);
    $("#switch").on('click',pictureChanger);
    console.log(pictureList.length);
    var latitude ="";
    var longitude ="";
    var wData = "";

    $.getJSON("https://ipapi.co/json/",function(data){
        
        console.log(data);
        console.log(data.latitude);
        latitude = data.latitude;
        longitude = data.longitude;
        
        var jsonUrl= "https://api.darksky.net/forecast/760814dc4eed8252f4bb99ca514238fd/"+latitude+","+longitude;
        
        $.ajax({
            
            type:'GET',
            
            url: jsonUrl,
            
            dataType:'jsonp',
            
            
        }).then(function(json){
            
            
            wData=json;
            console.log(wData);
            console.log(wData.currently.icon);
          if (wData.currently.icon =="rain"){
             $("i").addClass("wi-rain");
          }
          if (wData.currently.icon == "clear-day"){
            $("i").addClass("wi-day-sunny");
          }
          if (wData.currently.icon=="clear-night"){
            $("i").addClass("wi-night-clear");
          }
          if (wData.currently.icon=="partly-cloudy-day"){
            $("i").addClass("wi-night-partly-cloudy");
          }
          if (wData.currently.icon=="partly-cloudy-night"){
            $("i").addClass("wi-night-partly-cloudy");
          }
          if (wData.currently.icon=="cloudy"){
            $("i").addClass("wi-cloudy");
          }
          if (wData.currently.icon=="sleet"){
            $("i").addClass("wi-sleet");
          }
          if (wData.currently.icon=="snow"){
            $("i").addClass("wi-snow");
          }
          if (wData.currently.icon=="wind"){
            $("i").addClass("wi-windy")
          }
          if (wData.currently.icon=="fog"){
            $("i").addClass("wi-fog");
          }
          
            
           // $("i").addClass("wi-fog");
            $('#weather').html(wData.currently.temperature);
            
            
        });
        
        
        
    });
    
    
    
    
});


var pictureList = ["1.JPG","2.JPG","3.JPG","4.JPG","5.JPG","6.JPG","7.JPG"];
var i =1;
function sizeChanger(size){
    
    return function(){
        
        document.body.style.fontSize = size +"px";
        chigo = size;
        console.log(chigo);
        
    };
    
    
}

function pictureChanger(){
    
    document.getElementById("container").style.display = "none";
    document.getElementById("title").style.display= "none";
 //$('#container').html("<img src="+pictureList[i]+" alt ='picture' width = '800px' height= '800px'>").fadeOut(1000); 
         if(i<6){
            $('#container').html("<a href = '#' id='lok'><img src="+pictureList[i]+" alt ='picture' width = '800px' height= '800px'></a>").fadeIn(2000);
            //$('#lok').html("<a href = '#' id='lok'><img src="+pictureList[i]+" alt ='picture' width = '800px' height= '800px'></a>")
            $('#title').html(pictureList[i]).fadeIn(700);
            i++;
            
        }else{
            
            i=0;
            $('#container').html("<a href = '#' id='lok'><img src="+pictureList[i]+" alt ='picture' width = '800px' height= '800px'></a>").fadeIn(2000);
        }

 
    //return console.log(pictureList[i]);
    console.log(i);
        
}

function helloFunction(){
         
         
        $('#container').html("<img src= '1.JPG' alt ='picture' width = '800px' height= '800px'>");
        console.log("hello");

}



    
    

var chigo ="";
//var change = pictureChanger();
var size12 = sizeChanger(12);
var size20 = sizeChanger(20);
var size35 = sizeChanger(35);

//document.getElementById("right").onclick(pictureChanger());
  // pass a reference to a function not the function callbackitself pictureChanger()
console.log("change");



//document.getElementById("right").onclick = change;
document.getElementById("small").onclick = size12;
document.getElementById("medium").onclick = size20;
document.getElementById("large").onclick = size35;
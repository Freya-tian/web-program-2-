function addcity(){
    var value = document.getElementById("addcity").value;
    // alert(value)
    var classnames = document.getElementsByTagName("*");
    for (var i=0;i<classnames.length;i++){
        if(value == classnames[i].id){
            classnames[i].style.display = "block";
        }
    }
}
function closes1(){
    var clo = document.getElementById("closes1").parentNode.parentNode;
    
    clo.style.display = "none";
     
}
function closes2(){
    var clo = document.getElementById("closes2").parentNode.parentNode;
    
    clo.style.display = "none";
     
}
function closes3(){
    var clo = document.getElementById("closes3").parentNode.parentNode;
    
    clo.style.display = "none";
     
}
function closes4(){
    var clo = document.getElementById("closes4").parentNode.parentNode;
    
    clo.style.display = "none";
     
}
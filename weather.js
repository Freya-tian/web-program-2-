window.onload = getCurrentPosit;
var locations = [];
function getCurrentPosit() {
    if (window.navigator.geolocation) {
        var options = {
            enableHighAccuracy: true,
        };
        window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options)
    }
    else {
        alert("don't support html5 to get geolocation");
    }

}
function handleSuccess(position) {
    var lon = position.coords.longitude;
    var lat = position.coords.latitude;
    console.log("lon:", lon);
    console.log("lat:", lat);
    const url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=26a7dca7e46fbceb5fa3f089a727767c";
    fetch(url)
        .then(res=> {
        return res.json();
        }).then(result=>{
            console.log(result);
            var SPtemperature = document.getElementsByClassName('SPtemperature');
            var SPwind = document.getElementsByClassName('wind');
            var SPcloudy = document.getElementsByClassName('cloudy');
            var SPpressure = document.getElementsByClassName('pressure');
            var SPhumidity = document.getElementsByClassName('humidity');
            var SPcoordinates = document.getElementsByClassName('coordinates');
            var SP = document.getElementsByClassName("SP");
            SP.innerText = "<img src='png/叉号.png' height='25px' id='closes1'  alt=''>"
            // console.log(SP);
            // SP.innerText(result.wind);
            SPtemperature[0].innerHTML = "<h2>"+result.name+"</h2> <img class='img1' src='http://openweathermap.org/img/w/"+result.weather[0].icon+".png'; height='100px'/><b class='b'style='font-size: 7em; margin-left: 10%;'>"+parseInt(result.main.temp_max - 273) +"</b> <img class='img1' src='png/温度.png' height='120px' style='position: relative;top: 15px;filter: contrast(40%);'/>"
           
            console.log(SPtemperature);
            var img = document.createElement("img");
            img.setAttribute 
            
            console.log(result.weather[0].icon);     

            SPwind.item(0).innerHTML = "<h3>Ветер</h3> <h5>speed:"+result.wind.speed+"m/s</h5>";
            // SPwind.item(0).innerHTML = "<img class='img1' src='http://openweathermap.org/img/w/"+result.weather[0].icon+".png'; height='100px'> ";
            SPcloudy.item(0).innerHTML = "<h3>облачность</h3> <h5>Cloudiness:"+result.clouds.all+"%</h5>";
            SPpressure.item(0).innerHTML = "<h3>давление</h3> <h5> Atmospheric pressure:"+result.main.pressure+"hpa</h5>";
            SPhumidity.item(0).innerHTML = "<h3>влажность</h3> <h5> Humidity:"+result.main.humidity+"%</h5>";
            SPcoordinates.item(0).innerHTML = "<h3>координат</h3> <h5> lon:"+result.coord.lon+",latitude:"+result.coord.lat +"</h5>";
        })
}



function handleError() {
    log('error')
}

var id =0;
function findCity() {
    var findbCity = document.getElementById("addcity");
    const url = "http://api.openweathermap.org/data/2.5/weather?q="+findbCity.value+"&appid=26a7dca7e46fbceb5fa3f089a727767c";
    console.log(findCity.value)
    fetch(url)
        .then((res) => {
            // console.log(url+"&city=上海" );
            return res.json();

        }).then(result => {
            // console.log(result);
            // console.log(locations[1]);
            localStorage.setItem("city"+id,result.name);
            var other_cities = document.getElementById("other-cities")
            var divs = document.createElement("div")
            
            var city_name = document.createElement("ul")
            var temperature = document.createElement("li")

            other_cities.appendChild(divs);
            divs.setAttribute("class","city");
            divs.appendChild(city_name);
            city_name.appendChild(temperature);
            temperature.innerHTML="<span>"+result.name+"</span> <img class='img' src='http://openweathermap.org/img/w/"+result.weather[0].icon+".png''/><b class='iconfont'>"+parseInt(result.main.temp_max - 273) +"&#xe6ce;</b> <img src='png/叉号.png' height='25px' id='closes1'onclick = closes(this)  alt=''>"    ;
            var wind = document.createElement("li")
            var cloudy = document.createElement("li")
            var pressure = document.createElement("li")
            var humidity = document.createElement("li")
            var coordinates = document.createElement("li")
            city_name.appendChild(wind);
            city_name.appendChild(pressure);
            city_name.appendChild(humidity);
            city_name.appendChild(coordinates);
            city_name.appendChild(cloudy);
            wind.innerHTML = "<h3>Ветер</h3> <h5>speed:"+result.wind.speed+"m/s</h5>";
            // SPwind.item(0).innerHTML = "<img class='img1' src='http://openweathermap.org/img/w/"+result.weather[0].icon+".png'; height='100px'> ";
            cloudy.innerHTML = "<h3>облачность</h3> <h5>Cloudiness:"+result.clouds.all+"%</h5>";
            pressure.innerHTML = "<h3>давление</h3> <h5> Atmospheric pressure:"+result.main.pressure+"hpa</h5>";
            humidity.innerHTML = "<h3>влажность</h3> <h5> Humidity:"+result.main.humidity+"%</h5>";
            coordinates.innerHTML = "<h3>координат</h3> <h5> lon:"+result.coord.lon+",latitude:"+result.coord.lat +"</h5>";
            id +=1;

        })
    
}

function showCity() {

    // <div class="SPoterinfo">
    //             <div class="wind">
    //                 <h3>Ветер</h3>
    //                 <h5>123456</h5>
    //             </div>
    //             <div class="cloudy">
    //                 <h3>облачность</h3>
    //                 <h5>123456</h5>
    //             </div>
    //             <div class="pressure">
    //                 <h3>давление</h3>
    //                 <h5></h5>
    //             </div>
    //             <div class="humidity">
    //                 <h3>влажность</h3>
    //                 <h5></h5>
    //             </div>
    //             <div class="coordinates">
    //                 <h3>координат</h3>
    //                 <h5></h5>
    //             </div>
    //         </div>
    var wind = document.getElementsByClassName("wind");
    if (!locations) {
        console.log("error")
        return;
    }



    locations.forEach(item => {
        var wind = document.getElementsByClassName("wind");
        wind.innerText(item.win);

    });

}
function addcity() {
    var value = document.getElementById("addcity").value;
    // alert(value)
    var classnames = document.getElementsByTagName("*");
    for (var i = 0; i < classnames.length; i++) {
        if (value == classnames[i].id) {
            classnames[i].style.display = "block";
        }
    }
}
// function closes() {
//     var clo = document.getElementsByClassName("close").parentNode;
//     console.log(clo);
//     clo.style.display = "none";

// }

// var closebtn = document.getElementById("closes1");
// for(let i = 0;i<closebtn.length;i++){
//     closebtn[i].setAttribute("onclick","closes(this)")
// }
function closes(btn) {
    var clo = btn.parentNode.parentNode.parentNode;

    clo.style.display = "none";

}
function closes3() {
    var clo = document.getElementById("closes3").parentNode.parentNode;

    clo.style.display = "none";

}
function closes4() {
    var clo = document.getElementById("closes4").parentNode.parentNode;

    clo.style.display = "none";

}
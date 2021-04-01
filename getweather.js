
window.onload = function () {


    // window.onload = getCurrentPosit;

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
    function getinfor() {
        var allinfor = document.getElementById('allinfor');
        fetch('http://localhost:3000/favourites', {
            method: 'GET',
            // mode: 'cors',
        }).then((res) => {
            // console.log(error) 
            return res.json();
        })
            .then(json => {
                // var result = JSON.parse(json)
                // console.log(result);
                var data = "";
                for (var i = 0; i < json.length; i++) {
                    console.log(json[i].name);
                    data += "<div class = 'city'><ul><li><span>" + json[i].name + "</span><b class='iconfont'>" + json[i].tem + "&#xe6ce;</b><img src='png/叉号.png' height='25px' id='closes1'onclick = closes(this)  alt=''></li><li><h3>Wind</h3><h5>Speed:" + json[i].wind + "m/s </h5></li><li><h3>Clouds</h3><h5>Cloudness:" + json[i].clouds + " %</h5></li>" +
                        "<li><h3>Pressure</h3><h5>" + json[i].pressure + "hpa</h5> </li>" +
                        "<li><h3>Humidity</h3><h5>" + json[i].humidity + "%</h5></li>" +
                        "<li><h3>Coord</h3><h5>lon-" + json[i].lon + " ,lat-" + json[i].lat + "</h5></li></ul></div>";

                }
                allinfor.innerHTML = data;
            });
    }
    getCurrentPosit();
    getinfor();
};

// function getinfor(){
//     var allinfor = document.getElementById('allinfor');
//     $.ajax({
//         type: 'GET',
//         url: "http://localhost:3000/favourites",

//         dataType: 'json',
//         success: function (result) {
//             console.log(result);
//             var data ="";
//             for(var i = 0;i<result.length;i++){
//                 console.log(result[i].name);
//                 data +="<div class = 'city'><ul><li><span>"+result[i].name+ "</span><img src='png/叉号.png' height='25px' id='closes1'onclick = closes(this)  alt=''></li><li>wind:"+result[i].wind+"m/s </li><li>clouds:"+result[i].clouds+" %</li>"+
//                 "<li>pressure:"+result[i].pressure+"hpa </li>"+
//                 "<li>humidity:"+result[i].humidity+ "</li>"+
//                 "<li>coord:lon-"+result[i].lon+" ,lat-"+result[i].lat+"</li></ul></div>";

//             }
//             allinfor.innerHTML = data;

//         },
//         error: function (error) {
//             console.log(error);
//         }
//     });

// // window.onload = getCurrentPosit;

// function getCurrentPosit() {
//     if (window.navigator.geolocation) {
//         var options = {
//             enableHighAccuracy: true,
//         };
//         window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options)
//     }
//     else {
//         alert("don't support html5 to get geolocation");
//     }

// }


async function handleSuccess(position) {
    var lon = position.coords.longitude;
    var lat = position.coords.latitude;
    console.log("lon:", lon);
    console.log("lat:", lat);
    fetch(`http://localhost:3000?lat=${lat}&lon=${lon}`, {
        method: 'POST',
        // mode: 'cors',
    }).then((res) => {
        // console.log(error) 
        return res.json();
    })
        .then(result => {

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
            SPtemperature[0].innerHTML = "<h2>" + result.name + "</h2> <img class='img1' src='http://openweathermap.org/img/w/" + result.weather[0].icon + ".png'; height='100px'/><b class='b'style='font-size: 7em; margin-left: 10%;'>" + parseInt(result.main.temp_max - 273) + "</b> <img class='img1' src='png/温度.png' height='120px' style='position: relative;top: 15px;filter: contrast(40%);'/>"

            console.log(SPtemperature);
            var img = document.createElement("img");
            img.setAttribute

            console.log(result.weather[0].icon);

            SPwind.item(0).innerHTML = "<h3>Ветер</h3> <h5>speed:" + result.wind.speed + "m/s</h5>";
            // SPwind.item(0).innerHTML = "<img class='img1' src='http://openweathermap.org/img/w/"+result.weather[0].icon+".png'; height='100px'> ";
            SPcloudy.item(0).innerHTML = "<h3>облачность</h3> <h5>Cloudiness:" + result.clouds.all + "%</h5>";
            SPpressure.item(0).innerHTML = "<h3>давление</h3> <h5> Atmospheric pressure:" + result.main.pressure + "hpa</h5>";
            SPhumidity.item(0).innerHTML = "<h3>влажность</h3> <h5> Humidity:" + result.main.humidity + "%</h5>";
            SPcoordinates.item(0).innerHTML = "<h3>координат</h3> <h5> lon:" + result.coord.lon + ",latitude:" + result.coord.lat + "</h5>";

        })


}
function handleError() {
    alert('error')
    fetch("http://localhost:3000?cityname=beijing", {
        method: 'POST',
        // mode: 'cors',
    }).then((res) => {
        // console.log(error) 
        return res.json();
    }).then(result => {
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
        SPtemperature[0].innerHTML = "<h2>" + result.name + "</h2> <img class='img1' src='http://openweathermap.org/img/w/" + result.weather[0].icon + ".png'; height='100px'/><b class='b'style='font-size: 7em; margin-left: 10%;'>" + parseInt(result.main.temp_max - 273) + "</b> <img class='img1' src='png/温度.png' height='120px' style='position: relative;top: 15px;filter: contrast(40%);'/>"

        console.log(SPtemperature);
        var img = document.createElement("img");
        img.setAttribute

        console.log(result.weather[0].icon);

        SPwind.item(0).innerHTML = "<h3>Ветер</h3> <h5>speed:" + result.wind.speed + "m/s</h5>";
        // SPwind.item(0).innerHTML = "<img class='img1' src='http://openweathermap.org/img/w/"+result.weather[0].icon+".png'; height='100px'> ";
        SPcloudy.item(0).innerHTML = "<h3>облачность</h3> <h5>Cloudiness:" + result.clouds.all + "%</h5>";
        SPpressure.item(0).innerHTML = "<h3>давление</h3> <h5> Atmospheric pressure:" + result.main.pressure + "hpa</h5>";
        SPhumidity.item(0).innerHTML = "<h3>влажность</h3> <h5> Humidity:" + result.main.humidity + "%</h5>";
        SPcoordinates.item(0).innerHTML = "<h3>координат</h3> <h5> lon:" + result.coord.lon + ",latitude:" + result.coord.lat + "</h5>";


    })

}









var bt = document.getElementById('bt');
bt.onclick = function () {
    var value = document.getElementById('addcity').value;
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.onreadystatechange=function()
    // {
    //     if (xmlHttp.readyState==4 && xmlHttp.status==200)
    //     {
    //         console.log(xmlHttp.responseText) ;
    //     }
    // };


    // xmlHttp.open('POST', 'http://127.0.0.1:3000/', true); 
    // xmlHttp.send(value);      //吧input框中的value发送过去
    fetch(`http://localhost:3000/?cityname=${value}`, {
        method: 'POST',
        // mode: 'cors',
    }).then((res) => {
        // console.log(error) 
        return res.json();
    }).then(result => {

        // console.log(result);
        if (result.cod != 404) {
            var other_cities = document.getElementById("other-cities")
            var divs = document.createElement("div")

            var city_name = document.createElement("ul")
            var temperature = document.createElement("li")
            other_cities.appendChild(divs);
            divs.setAttribute("class", "city");
            divs.setAttribute("name", result.name)
            divs.appendChild(city_name);
            city_name.appendChild(temperature);
            temperature.innerHTML = "<span>" + result.name + "</span> <img class='img' src='http://openweathermap.org/img/w/" + result.weather[0].icon + ".png''/><b class='iconfont'>" + parseInt(result.main.temp_max - 273) + "&#xe6ce;</b> <img src='png/叉号.png' height='25px' id='closes1'onclick = closes(this)  alt=''>";
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
            wind.innerHTML = "<h3>Ветер</h3> <h5>speed:" + result.wind.speed + "m/s</h5>";
            // SPwind.item(0).innerHTML = "<img class='img1' src='http://openweathermap.org/img/w/"+result.weather[0].icon+".png'; height='100px'> ";
            cloudy.innerHTML = "<h3>облачность</h3> <h5>Cloudiness:" + result.clouds.all + "%</h5>";
            pressure.innerHTML = "<h3>давление</h3> <h5> Atmospheric pressure:" + result.main.pressure + "hpa</h5>";
            humidity.innerHTML = "<h3>влажность</h3> <h5> Humidity:" + result.main.humidity + "%</h5>";
            coordinates.innerHTML = "<h3>координат</h3> <h5> lon:" + result.coord.lon + ",latitude:" + result.coord.lat + "</h5>";
        } else {


            alert(result.cod + result.message);
        }





    });
};

function closes(btn) {
    var clo = btn.parentNode.parentNode.parentNode;
    var bro = btn.parentNode.children[0]
    var value = bro.innerText;
    // console.log(value);
    fetch(`http://localhost:3000/?cityname=${value}`, {
        method: 'DELETE',
        // mode: 'cors',
    }).then((res) => {
        // console.log(error) 
        return res.text();
    }).then(data => {
        // var data = JSON.parse(result);

        if (data == "deleted") {
            clo.style.display = "none";
        }
        alert(data);
        console.log("ok");

    });


}


// var getinfo = document.getElementsByClassName("getinfo")


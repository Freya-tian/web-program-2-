const { MongoClient } = require('mongodb');
var http = require('http');
const url = require("url");
const querystring = require("querystring");


const dburl = 'mongodb://127.0.0.1:27017';

const dbname = 'lab3';

const client = new MongoClient(dburl, { useUnifiedTopology: true });

client.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('连接成功');
})

const db = client.db(dbname);


const server1 = http.createServer((req, res) => {

  let { query } = url.parse(req.url, true);
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  console.log(req);
  if (req.method == 'DELETE' || req.method == 'OPTIONS') {
    console.log(req);
    
    let cityname = query.cityname;
    db.collection('cities').deleteOne({name:cityname},(err,data)=>{
      if (err) throw err;
      console.log("文档删除成功");
      res.write("deleted");
      res.end();
    })
    console.log(cityname + "ol");
    console.log("ok");



  } else if (req.method == 'POST') {
    if (query.lat != null & query.lat != undefined) {
      let lat = query.lat;
      let lon = query.lon;
      console.log(lat);
      console.log(lon);
      let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=26a7dca7e46fbceb5fa3f089a727767c`
      http.get(apiUrl, function (res1) {
        let jsonData = "";

        res1.on("data", function (data) {
          // console.log(data);
          jsonData += data.toString("utf8");
        });

        res1.on("end", function () {
          res.setHeader('Access-Control-Allow-Origin', '*');
          // var clll = JSON.parse(jsonData)
          // console.log(clll.coord)


          // console.log(jsonData.name);
          res.write(jsonData);
          res.end();
        });
      });


    } else {
      let cityname = query.cityname;
      console.log(cityname);
      let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=26a7dca7e46fbceb5fa3f089a727767c`
      http.get(apiUrl, function (res1) {
        let jsonData = "";

        res1.on("data", function (data) {
          jsonData += data.toString("utf8");
        })

        res1.on("end", function () {
          res.setHeader('Access-Control-Allow-Origin', '*');
          var clll = JSON.parse(jsonData)
          console.log(clll.coord)
          db.collection('cities').insertOne({
            "name": clll.name,
            "wind": clll.wind.speed,
            "clouds": clll.clouds.all,
            "pressure": clll.main.pressure,
            "humidity": clll.main.humidity,
            "lon": clll.coord.lon,
            "lat": clll.coord.lat,
            "tem":parseInt(clll.main.temp_max - 273)
          }, function (err, res) {
            if (err) throw err;
            console.log("文档插入成功");

          });

          console.log(jsonData);
          res.write(jsonData);
          res.end();
        });
      });

    }
  }else if (req.method == "GET" & req.url == "/favourites") {
    console.log(req.method);

    db.collection('cities').find({}).toArray((err, data) => {
      console.log(JSON.stringify(data));
      res.write(JSON.stringify(data));
      res.end();
      // client.close();
    })
  }





})

server1.listen(3000);



// const server2 = http.createServer((req, res) => {
//   if (req.type == 'DELETE') {
//     let { query } = url.parse(req.url, true);
//     let cityname = query.cityname;
//     console.log(cityname);
//     res.on("ok");
//   }
// })
// server2.listen(5000);
const { MongoClient } = require('mongodb');
const express = require('express')
const url = require("url");
const fetch = require("node-fetch");
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')




const app = express();
const server = express();

const swaggerOptions = {
    swaggerDefinition: {
        info:{
            title: 'Weathet Of City',
            version:'1.0.0'
        }
    },
    apis: ['app.js'],
};

const swaggerDoc = swaggerJsDoc(swaggerOptions);

 
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

app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
})

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc));
/**
 * @swagger
 * /city:
 *   post:
 *     description: find city from API and add it to Mongodb
 *     parameters:
 *          
 *     - name: cityname
 *       description: name of city
 *       in: query
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Success
 */
app.post('/city', (req, res) => {
    let reqs = req.query
    const cityname = reqs.cityname
    console.log(reqs.cityname)
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=26a7dca7e46fbceb5fa3f089a727767c`
    fetch(apiUrl)
        .then(resu => {
            return resu.json();
        }).then((data) => {
            console.log(data)
            db.collection('cities').insertOne({
                "name": data.name,
                "wind": data.wind.speed,
                "clouds": data.clouds.all,
                "pressure": data.main.pressure,
                "humidity": data.main.humidity,
                "lon": data.coord.lon,
                "lat": data.coord.lat,
                "tem": parseInt(data.main.temp_max - 273)
            }, function (err, result) {
                if (err) throw err;
                console.log("文档插入成功");

            });

            console.log(data);
            res.json(data);
            res.end();
        })
})

/**
 * @swagger
 * /location:
 *   post:
 *     description: find city by coord from API and add it to Mongodb
 *     parameters:
 *          
 *     - name: lat
 *       description: latitude of city
 *       in: query
 *       required: true
 *       type: string
 *     - name: lon
 *       description: lontitude of city
 *       in: query
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Success
 */
app.post('/location', (req, res) => {
    let reqs = req.query
    const lat = reqs.lat
    const lon = reqs.lon
    console.log(lat,lon)
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=26a7dca7e46fbceb5fa3f089a727767c`
      
    fetch(apiUrl)
        .then(resu => {
            return resu.json();
        }).then((data) => {
            // console.log(data)           

            console.log(data);
            res.json(data);
            res.end();
        })
})

/**
 * @swagger
 * /delete:
 *   delete:
 *     description: delete city by cityname from Mongodb
 *     parameters:
 *          
 *     - name: cityname
 *       description: name of city
 *       in: query
 *       required: true
 *       type: string
 *     
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Wrong
 */
app.delete('/delete', (req, res) => {
    let reqs = req.query  
    
    let cityname = reqs.cityname;
    db.collection('cities').deleteOne({name:cityname},(err,data)=>{
      if (err) throw err;
      console.log("文档删除成功");
      res.send("deleted");
      res.end();
    })
    console.log(cityname + "ol");
    console.log("ok");

    
})
/**
 * @swagger
 * /favourites:
 *   get:
 *     description: get all city from  Mongodb
 *     responses:
 *       200:
 *         description: Success
 */
app.get('/favourites', (req, res) => {
    console.log(req.method);

    db.collection('cities').find({}).toArray((err, data) => {
      console.log(JSON.stringify(data));
      res.send(JSON.stringify(data));
      res.end();
      // client.close();
    })

    
})
app.get('/favourites', (req, res) => {
    console.log(req.method);

    db.collection('cities').find({}).toArray((err, data) => {
      console.log(JSON.stringify(data));
      res.send(JSON.stringify(data));
      res.end();
      // client.close();
    })

    
})



app.listen(5000, () => console.log("listen on http://127.0.0.1:5000 "))

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const fs = require('fs')
const dirTree = require("directory-tree");
const axios = require('axios')

const app = express();
const PORT = process.env.PORT;
const BACKUP_DIR = path.join(process.env.BACKUP_DIR)
   || path.join(__dirname, '/files')

const airlyKey = process.env.AIRLY_KEY
const weatherKey = process.env.WEATHER_KEY

if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);

app.use(bodyParser.raw({ limit: '50mb', type: 'application/*.*' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

app.get('/air', (req, res) => {
   const { lat, lng } = req.query;
   axios.get('https://airapi.airly.eu/v2/measurements/nearest', {
      params: { lat, lng, maxDistanceKM: 10, indexType: 'AIRLY_CAQI', apikey: airlyKey },
      headers: { 'Accept-Language': 'pl' }
   }).then(air => {
      res.json({
         pm25: air.data.current.values[1].value,
         pm10: air.data.current.values[2].value,
         description: air.data.current.indexes[0].description,
         color: air.data.current.indexes[0].color
      })
   }).catch(err => { res.send(err) })
})

app.get('/weather', (req, res) => {
   const { lat, lng } = req.query;
   axios.get('http://api.openweathermap.org/data/2.5/forecast', {
      params: { lat, lon: lng, units: 'metric', lang: 'pl', APPID: weatherKey }
   })
      .then(weather => {
         // console.log(weather)
         const temp = weather.data.list[0].main.temp;
         const { icon, description } = weather.data.list[0].weather[0];
         const forecast = weather.data.list.filter(
            ({ dt_txt }) => {
               let dt15 = dt_txt.split(" ")
               return dt15[1] === "15:00:00"
            })
         res.json({
            weather: { icon, description, temp },
            forecast
         })
         //   res.json({ description, temp, icon })
      }).catch(err => res.send(err))
})

app.post('/upload', (req, res) => {
   const { data, dir, name, size } = req.body
   console.log(req.body.name);
   let file = data.split(';base64,').pop();
   let fullPath = path.join(BACKUP_DIR, dir)
   if (!fs.existsSync(fullPath))
      fs.mkdirSync(fullPath, { recursive: true });
   try {
      fs.writeFile(path.join(fullPath, name), file, 'base64', function () {
         res.send({ success: 'files uploded!', size })
      })
   } catch (err) {
      console.log(err)
      throw err;
   }
});

app.get('/download', (req, res) => {
   res.json(dirTree(BACKUP_DIR))
})

app.post('/file', (req, res) => {
   let dirPath = req.body.filePath
   res.download(path.join(dirPath))
})

app.listen(PORT) 

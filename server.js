require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const fs = require('fs')
const fileupload = require("express-fileupload");
const dirTree = require("directory-tree");
const axios = require('axios')

const app = express();
const PORT = process.env.PORT;
const BACKUP_DIR = path.join(__dirname, process.env.BACKUP_DIR)
   || path.join(__dirname, '/files')
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);

app.use(bodyParser.json())
app.use(bodyParser.raw({ type: 'application/*.*' }))
app.use(bodyParser.text({ type: 'text/html' }))
app.use(express.urlencoded({ extended: true }))

app.use(fileupload({ parseNested: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

app.get('/air', (req, res) => {
   const { lat, lng } = req.query;
   axios.get('https://airapi.airly.eu/v2/measurements/nearest', {
      params: { lat, lng, maxDistanceKM: 10, indexType: 'AIRLY_CAQI', apikey: process.env.AIRLY_KEY },
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
      params: { lat, lon: lng, units: 'metric', lang: 'pl', APPID: process.env.WEATHER_KEY }
   })
      .then(weather => {
         const { icon, description } = weather.data.list[0].weather[0]
         const temp = weather.data.list[0].main.temp
         res.json({ description, temp, icon })
      }).catch(err => res.send(err))
})

app.get('/download', (req, res) => {
   res.json(dirTree(BACKUP_DIR))
})

app.post('/file', (req, res) => {
   let dirPath = req.body.filePath
   res.download(path.join(dirPath))
})

app.post('/upload', (req, res) => {
   let files = req.files.upload.length > 1 ? req.files.upload : [req.files.upload];
   let paths = Array.isArray(req.body.paths) ? req.body.paths : [req.body.paths];
   files.forEach((file, index) => {
      let dir = path.join(BACKUP_DIR, paths[index])
      if (!fs.existsSync(dir)) {
         fs.mkdirSync(dir);
      }
      file.mv(dir + file.name, (err) => {
         console.log('err0:  ', err)
         if (err) throw err;
      })
   })

   res.send({ success: 'files uploded!' })
})
app.listen(PORT) 

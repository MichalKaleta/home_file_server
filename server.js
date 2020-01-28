const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const env = require('dotenv')
const fs = require('fs')
const fileupload = require("express-fileupload");
const dirTree = require("directory-tree");

env.config()
const app = express();

const PORT = process.env.PORT || 5000;
const BACKUP_DIR = process.env.BACKUP_DIR || path.join(__dirname, '/files')

// parse various different custom JSON types as JSON
app.use(bodyParser.json())
app.use(bodyParser.raw({ type: 'application/*.*' }))
app.use(bodyParser.text({ type: 'text/html' }))
app.use(express.urlencoded({ extended: true }))

app.use(fileupload({ parseNested: true }));
app.use(express.static(path.join(__dirname, 'client/build')));
//app.use(express.static(BACKUP_DIR));
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
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

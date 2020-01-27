const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const env = require('dotenv')
const fs = require('fs')
const fileupload = require("express-fileupload");
env.config()
const app = express();
const PORT = process.env.PORT || 5000;
const BACKUP_DIR = process.env.BACKUP_DIR || path.join(__dirname, '/files')

app.use(bodyParser())
app.use(fileupload({ parseNested: true }));
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
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
let arr = []
/////////
const readBackup = (dir) => {

   fs.readdirSync(BACKUP_DIR + dir).forEach(file => {
      let subDir = dir + '//' + file;
      if (fs.lstatSync(BACKUP_DIR + subDir).isDirectory()) {
         dir[file] = [];
         readBackup(subDir)
      } else {
         if (!arr[dir]) arr[dir] = []
         arr[dir].push(file)
      }
   });
}
readBackup('')
console.log(arr)
app.listen(PORT) 

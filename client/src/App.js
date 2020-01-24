import React, { useState } from 'react';
import axios from 'axios'
import './App.scss';

function App() {

   let [uploadDisabled, setUploadDisabled] = useState(true)
   let [filesInfo, setFilesInfo] = useState({ amount: 0, size: 0 })
   let [files, setFiles] = useState([])

   function submitUpload(e) {
      e.preventDefault()
      var formData = new FormData(e.target);
      for (let file of files) {
         let dir = file.webkitRelativePath;
         dir = dir.slice(0, -file.name.length)
         formData.append("paths", dir);
      }
      axios.post('/upload', formData)
         .then(res => {
            if (res.data) {
               console.log('res:  ', res.data)
            } else {
               //  throw err
            }
         }).catch(err => {
            console.log('catched: ', err)
         })
   }

   function handleFilesAdd(e) {
      let files = e.target.files
      let size = 0;
      Array.prototype.forEach.call(files, (file) => size += file.size)
      size = parseInt(size / 10000) / 100 + ' MB'
      setFiles(files)
      setFilesInfo({
         size,
         amount: files.length
      })
      setUploadDisabled(false)
   }
   let labelFor = uploadDisabled ? 'upload-form__input-browse' : 'upload-form__input-upload'

   return (
      <div className="App">
         <div
            className='file-info'
         >{filesInfo.amount} files chosen <br />{filesInfo.size} total size
         </div>
         <form
            className='upload-form'
            method='POST'
            action='/upload'
            encType="multipart/form-data"
            onSubmit={submitUpload}
         >
            <label
               className='upload-form__label'
               htmlFor={labelFor}
            >{
                  (uploadDisabled && <p>wybierz<br />folder</p>)
                  || (<p>wyślij</p>)
               }</label>
            <input
               id='upload-form__input-browse'
               className='upload-form__input-browse'
               name='upload'
               type='file'
               webkitdirectory="true"
               mozdirectory="true"
               onChange={handleFilesAdd}
            />
            <input
               id='upload-form__input-upload'
               className='upload-form__input-upload'
               type='submit'
               disabled={uploadDisabled}
            />
         </form>
      </div>
   );
}

export default App;

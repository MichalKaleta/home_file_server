import React, { useState } from 'react';
import axios from 'axios'
import qs from 'qs'
import Counter from './Counter'
import './Upload.scss'
function Upload() {

   let [uploadDisabled, setUploadDisabled] = useState(true)
   let [filesInfo, setFilesInfo] = useState({ amount: 0, size: 0 })
   let [files, setFiles] = useState([])
   let [sizeUploaded, setSizeUploaded] = useState(0);

   let syncedSize = sizeUploaded;

   function submitUpload(e) {
      e.preventDefault()
      function sendFile(file) {
         axios.post('/upload', qs.stringify(file), {
            headers: {
               'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
         }).then(res => {
            if (res.data.success) {
               let floatSize = parseFloat(res.data.size)
               syncedSize += floatSize;
               /* console.log('newSize:', newSize,'=res:',floatSize,'+state:', sizeUploaded) */
               setSizeUploaded(syncedSize)
               // newFileUploaded(true)
            } else { throw res }
         }).catch(err => console.log('catched: ', err.response.data))
      }
      Array.prototype.map.call(files, (file) => {
         const reader = new FileReader();
         const dir = file.webkitRelativePath.slice(0, -file.name.length)
         const name = file.name
         const size = parseInt(file.size / 10000) / 100;
         reader.onload = function () {
            sendFile({
               data: reader.result,
               dir,
               name,
               size
            })
         }
         reader.readAsDataURL(file)
      })
   }

   function handleFilesAdd(e) {
      let files = e.target.files
      let size = 0;
      Array.prototype.forEach.call(files, (file) => size += parseInt(file.size / 10000) / 100)
      size += ' MB'
      setFilesInfo({
         size,
         amount: files.length
      })
      setFiles(files)
      setUploadDisabled(false)
   }
   let labelFor = uploadDisabled ? 'upload-form__input-browse' : 'upload-form__input-upload'

   return (
      <div className="Upload">
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
         <Counter
            sizeLeft={syncedSize}
            totalSize={filesInfo.size}
         />
      </div>
   );
}

export default Upload;

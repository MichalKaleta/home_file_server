import React, { useState, useEffect, createElement } from 'react';
import axios from 'axios'
import './Download.scss'

function Download() {

   let [directories, setDirectories] = useState({ children: [] })

   useEffect(() => {
      axios.get('/download')
         .then(res => {
            if (res.data) {
               setDirectories(res.data)
            } else {
               throw res
            }
         }).catch(err => {
            console.log('catched: ', err.data)
         })
   }, [])

   function downloadFile(path) {
      //TODO : force download , directory download///
      axios.post(`/file`, { filePath: path }, {
         headers: {
            responseType: 'blob'

         }
      })
         .then(res => {
            console.log(res.data)
         }).catch(err => {
            console.log('catched: ', err.data)
         })
   }
   function toggleDirectoryExpand(e) {
      e.stopPropagation()
      let currentVlass = e.currentTarget.className;
      e.currentTarget.className = (currentVlass === `download-list__folder folder--closed`)
         ? 'download-list__folder folder--open'
         : 'download-list__folder folder--closed'

   }


   function renderDirectories(directories) {

      let dirArr = [],
         fileArr = []
      directories.children.map((item, i) => {
         if (item.type === 'directory') {
            dirArr.push(
               <ul
                  className={`download-list__folder folder--closed`}
                  key={item.path}
                  onClick={toggleDirectoryExpand}
               ><p
                  onClick={() => { }}
               >{item.name}
                  </p>
                  {renderDirectories(item)}
               </ul >
            )
         } else {
            fileArr.push(
               <li
                  className={'download-list__files'}
                  key={item.path}
                  onClick={() => { downloadFile(item.path) }}
               ><p><em>{item.name}</em></p></li>
            )
         }
      })
      return [...dirArr, ...fileArr]
   }

   return (
      <div className="Download">
         <ul
            className={'download-list'}
         >{
               renderDirectories(directories)
            }</ul>
      </div>
   );
}

export default Download;

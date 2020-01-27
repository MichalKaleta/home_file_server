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

      axios.get('/file/?path1=' + path)
         .then(res => {
            console.log(res.data)
            return res.data
         }).catch(err => {
            console.log('catched: ', err.data)
         })
   }
   function renderDirectories(directories) {
      return directories.children.map((item, i) => {
         if (item.type === 'directory') {

            return (<ul


               key={item.path}
            >  &#x27A5;{item.name}</ul >
            )
         } else {
            return (
               <li
                  key={item.path}
                  onClick={() => { downloadFile(item.path) }}
               >{item.name}</li>
            )
         }
      })
   }

   return (
      <div className="Download">
         <ul>{
            renderDirectories(directories)
         }</ul>
      </div>
   );
}

export default Download;

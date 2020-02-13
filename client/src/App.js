import React, { useState, useEffect } from 'react';
import './App.scss';
import AirQuality from './AirQuality/airQuality'
import Weather from './Weather'
import Download from './Download/Download';
import Upload from './Upload/Upload';
import Forecast from './Weather/Forecast';

function App() {

   let [newFiles, setNewFiles] = useState(false)
   let [location, setLocation] = useState({
      latitude: 50.0438756,
      longitude: 19.957271
   })

   useEffect(() => {
      navigator.geolocation.getCurrentPosition(res => {
         const { latitude, longitude } = res.coords
         setLocation({ latitude, longitude })
      })
   }, [])
   function newFileUploaded(bool) {
      setNewFiles(true)
   }

   return (
      <div className="App">
         {location && (
            <div className="outside-data__contaier">
               <AirQuality
                  location={location}
               />
               <Weather
                  location={location}
               />
            </div>)}
         <Forecast />
         <Upload
            newFileUploaded={newFileUploaded}
         />
         <Download
            newFiles={newFiles}
         />
      </div>
   );
}

export default App;

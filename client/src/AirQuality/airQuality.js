import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './airQuality.scss';

const emojis = ['😻', '🙂', '😑', '😬', '🙊', '😤', '🤬', '🤢', '💀', '💀', '💀', '💀', '💀', '💀', '💀', '💀', '💀', '💀', '💀', '💀']

export default function AirQuality({ location }) {

   const [time, setTime] = useState()
   const [smogData, setSmogData] = useState()
   const [errorMessage, setErrorMessage] = useState()

   useEffect(() => {
      const apiCallInterval = setInterval(() => {
         setTime(new Date())
      }, (1000 * 60 * 20))
      getAirQuality(location.latitude, location.longitude)
      return () => clearInterval(apiCallInterval)
   }, [location, time])

   function getAirQuality(lat, lng) {
      axios.get('/air', { params: { lat, lng } })
         .then(res => setSmogData(res.data))
         .catch(err => { setErrorMessage(err.message) })
   }
   return (
      (smogData && (
         <div className='air-quality__container'>
            <div
               className='air-quality__description'
               style={{ color: smogData.color }}
            >{`${smogData.description} ${emojis[Math.floor(smogData.pm10 * 2 / 50)]}`}
            </div>
            <div>
               PM10<span style={{ color: smogData.color }}>{` ${Math.round(smogData.pm10 * 2)}% `}</span>
               | PM2.5<span style={{ color: smogData.color }}>{` ${Math.round(smogData.pm25 * 4)}%`}</span>
            </div>
         </div>
      )) || (errorMessage && <div>{errorMessage}</div>)
      || (<div></div>)
   )
}


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.scss';


export default function AirQuality({ location }) {

   const [weather, setWeather] = useState()
   const [time, setTime] = useState()
   const [errorMessage, setErrorMessage] = useState()

   useEffect(() => {
      const apiCallInterval = setInterval(() => {
         setTime(new Date())
      }, (1000 * 60 * 60))
      getWeather(location.latitude, location.longitude)
      return () => clearInterval(apiCallInterval)
   }, [location, time])

   function getWeather(lat, lng) {
      axios.get(`/weather`, { params: { lat, lng } })
         .then(res => {
            console.log(res);
            setWeather(res.data)
         })
         .catch(err => {
            console.log(err);
            setErrorMessage(err.message)
         })
   }
   return (
      (weather && (
         <div className='weather__container'>
            <div className='weather__temperature'>{Math.round(weather.temp)}&#176;</div>
            <div className='weather__aura'>
               <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
               <div className='weather__description'>{weather.description}</div>
            </div>
         </div>
      )) || (errorMessage && <div>{errorMessage}</div>)
      || (<div></div>)
   )
}


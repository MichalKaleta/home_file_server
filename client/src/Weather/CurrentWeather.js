import React from 'react';
import { useSelector } from 'react-redux'
import './CurrentWeather.scss';

function CurrentWeather() {

   const { temp, description, icon } = useSelector(state => state.weather) || {}
   return (
      (temp &&
         < div className='weather-current__container' >
            <div className='weather-current__temperature'>{Math.round(temp)}&#176;</div>
            <div className='weather-current__aura'>
               <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
               <div className='weather-current__description'>{description}</div>
            </div>
         </div >) || (<div>Loading...</div>)
   )
}
export default CurrentWeather
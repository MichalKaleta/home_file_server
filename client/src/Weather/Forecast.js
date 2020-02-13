import React from 'react';
import { useSelector } from 'react-redux'
import './Forecast.scss';

function Forecast() {

   const forecast = useSelector(state => state.forecast) || null
   let path;
   if (forecast) {
      const temperatures = forecast.map(day => Math.round(day.main.temp))
      const minTemp = Math.min(...temperatures);
      const maxTemp = Math.max(...temperatures);
      const unitY = 100 / (maxTemp - minTemp);
      const unitX = 100 / (temperatures.length - 1);
      const startPosY = minTemp * unitY + 100;
      path = `M 0 ${startPosY} `;
      temperatures.map((temp, i) => path += `L${unitX * i},${startPosY - temp * unitY} `);
   }

   return (
      forecast && path && (
         <div className="weather-forecast__container" >
            <svg
               className="weather-forecast__graph"
               viewBox="0 0 100 102"
               preserveAspectRatio="none"
               height="100"
            >
               <path d={path} />
            </svg>
            <div
               className="weather-forecast__temperatures"
            >{forecast.map(day => (
               <span
                  key={day.dt_txt}
               >{Math.round(day.main.temp)}&#176;
               </span>
            ))}
            </div >
         </div>
         || (<div> sdfsdf</div>)
      )
   )
}

export default Forecast
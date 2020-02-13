import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getWeather } from './redux/actions'
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

function Weather({ location }) {
   const dispatch = useDispatch();
   const [time, setTime] = useState()
   const [errorMessage, setErrorMessage] = useState()

   useEffect(() => {
      const apiCallInterval = setInterval(() => {
         setTime(new Date())
      }, (1000 * 60 * 20))
      dispatch(getWeather(location.latitude, location.longitude))
      return () => clearInterval(apiCallInterval)
   }, [location, time])

   return (
      <React.Fragment>
         <CurrentWeather />
      </React.Fragment>
   )
}

export default Weather
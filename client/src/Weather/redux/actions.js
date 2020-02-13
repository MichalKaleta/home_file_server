import axios from 'axios';

export const getWeather = (lat, lng) => (dispatch) => {
   axios.get(`/weather`, { params: { lat, lng } })
      .then(res => dispatch({
         type: 'FETCH_WEATHER_SUCCESS',
         payload: res.data
      }))
      .catch(err => dispatch({
         type: 'FETCH_WEATHER_FAILURE',
         payload: err.message
      }))
}

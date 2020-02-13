export function weatherReducer(state = {}, { type, payload }) {
   switch (type) {
      case 'FETCH_WEATHER_SUCCESS':
         return {
            weather: payload.weather,
            forecast: payload.forecast,
            error: null,
            loading: null,
         }
      case 'FETCH_WEATHER_FAILURE':
         return {
            weather: null,
            forecast: null,
            loading: null,
            error: payload
         }
      default:
         return state
   }
}
import axios from 'axios'

const getAllCountries = () => {
  const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
  return request.then((response) => response.data)
}

const getCapitalWeather = (latlng) => {
  const weatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API;
  const {lat,lon} = {lat:latlng[0],lon:latlng[1]}
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric
  `)
  return request.then((response) => response.data)
}

export default {getAllCountries, getCapitalWeather}
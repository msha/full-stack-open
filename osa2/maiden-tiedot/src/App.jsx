import { useState, useEffect } from 'react';
import countryLookupService from './services/countries';



const Countries = ({countrylist, filter, getCountry, countrySetter}) => {
  if(filter === '') return (<div>enter filter</div>)
  
  let filteredCountries = countrylist.filter((c) => c.name.common.toLowerCase().includes(filter.toLowerCase()))
  if(getCountry) {
    filteredCountries = countrylist.filter((c) => c.name.common === getCountry);
  }
  if(filteredCountries.length === 1) {
    return (<Country country={filteredCountries[0]}></Country>)
  }
  if (filteredCountries.length > 10 && filter !== '') return (<div>too many matches, specify another filter</div>)
  return (filteredCountries.map(country => <div key={country.name.official}>{country.name.common}<button onClick={() => {countrySetter(country.name.common)}}>show</button></div>));
}

const Weather = ({weather}) => {
  if(weather === null) return (<div>Loading Weather</div>)
  return (<><h2>Weather in {weather.name}</h2>
  <div>temperature {weather.main.temp} Celcius</div>
  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
  <div>wind {weather.wind.speed} m/s</div></>)
}

const Country = ({country}) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const res = countryLookupService.getCapitalWeather(country.capitalInfo.latlng);
    res.then((response) => setWeather(response))
  },[])
  
  return (
    <>
  <h1>{country.name.common}</h1>
  <div>capital {country.capital[0]}</div>
  <div>area {country.area}</div>
  <h2>languages</h2>
  {Object.values(country.languages).map((lan) => <li key={lan}> {lan} </li>)}
  <br/>
  <img src={country.flags.png}></img>
  <Weather weather={weather}></Weather>
  </>)
}

const Filter = ({filter, filterSetter}) => {
  return (<div>find countries <input value={filter} onChange={filterSetter}></input></div>);
}

function App() {

  const [countrylist, setCountrylist] = useState([]);
  const [filter, setFilter] = useState('');
  const [getCountry, setGetCountry] = useState('');

  const hook = () => {
    countryLookupService
  .getAllCountries()
  .then(countries => {
    setCountrylist(countries)
  })
  }

  const filterSetter = (event) => {
    setFilter(event.target.value)
    setGetCountry('')
  }

  const countrySetter = (name) => {
    setGetCountry(name)
  }

  

  useEffect(hook, [])

  return (
    <>
      <Filter filter={filter} filterSetter={filterSetter}></Filter>
      <Countries countrylist={countrylist} filter={filter} getCountry={getCountry} countrySetter={countrySetter}></Countries>
    </>
  )
}

export default App;

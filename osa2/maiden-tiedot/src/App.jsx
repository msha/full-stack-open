import { useState, useEffect } from 'react';
import countryLookupService from './services/countries';



const Countries = ({countrylist, filter, setCountry}) => {
  if(filter === '') return (<div>enter filter</div>)
  if(setCountry) {
    filter = setCountry;
  }
  const filteredCountries = countrylist.filter((c) => c.name.common.toLowerCase().includes(filter.toLowerCase()))
  if(filteredCountries.length === 1) {
    return (<Country country={filteredCountries[0]}></Country>)
  }
  if (filteredCountries.length > 10 && filter !== '') return (<div>too many matches, specify another filter</div>)
  return (filteredCountries.map(country => <div key={country.name.official}>{country.name.common}<button >show</button></div>));
}

const Country = ({country}) => {
  console.log(country);
  return (
    <>
  <h1>{country.name.common}</h1>
  <div>capital {country.capital[0]}</div>
  <div>area {country.area}</div>
  <h2>languages</h2>
  {Object.values(country.languages).map((lan) => <li key={lan}> {lan} </li>)}
  <img src={country.flags.png}></img>
  </>)
}

const Filter = ({filter, filterSetter}) => {
  return (<div>find countries <input value={filter} onChange={filterSetter}></input></div>);
}

function App() {

  const [countrylist, setCountrylist] = useState([]);
  const [filter, setFilter] = useState('');

  const hook = () => {
    countryLookupService
  .getAllCountries()
  .then(countries => {
    setCountrylist(countries)
  })
  }

  const filterSetter = (event) => {
    setFilter(event.target.value)
  }

  

  useEffect(hook, [])

  return (
    <>
      <Filter filter={filter} filterSetter={filterSetter}></Filter>
      <Countries countrylist={countrylist} filter={filter}></Countries>
    </>
  )
}

export default App;

import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [query, setQuery] = useState('')
  const [shownCountries, setShownCountries] = useState([])
  const [countries, setCountries] = useState([])

  const handleQueryChange = (event) => {
    const newQuery = event.target.value
    setQuery(newQuery)
    if (newQuery === '') {
      setShownCountries([])
    } else {
      const newShownCountries = countries.filter(country => 
        country.name.toLowerCase().includes(newQuery.toLowerCase()))
      setShownCountries(newShownCountries)
    }
  }

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const countries = response.data.map(country => ({
          name: country.name.common,
          capital: country.capital,
          area: country.area,
          languages: country.languages ? Object.values(country.languages) : [],
          flag: country.flags.png
        }))
        setCountries(countries)
        console.log(countries.slice(0, 3))
      })
      .catch(error => console.error('Error fetching countries:', error))
  }, [])

  return (
    <div>
      <Search query={query} handleQueryChange={handleQueryChange} />
      <CountriesList shownCountries={shownCountries} setShownCountries={setShownCountries} />
    </div>
  )
}

const Search = ({ query, handleQueryChange }) => {
  return (
    <div>
      find countries <input onChange={handleQueryChange} value={query} />
    </div>
  )
}

const CountriesList = ({ shownCountries, setShownCountries }) => {
  return (
    <div>
      {shownCountries.length > 10
        ? <p>Too many matches, specify another filter</p>
        : shownCountries.length > 1
          ? shownCountries.map(country => 
          <p 
            key={country.name}>{country.name} 
            <button onClick={() => setShownCountries([country])}>show</button>
          </p>
          )
          : shownCountries.length === 1
            ? <Country country={shownCountries[0]} />
            : null
      }
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      capital {country.capital}
      <br/>area {country.area}
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flag} width="100" />
    </div>
  )
}

export default App
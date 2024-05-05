import Filter from "./components/Filter"
import { useEffect, useState } from 'react'
import countryService from './services/countries'
import Country from "./components/Country"

const App = () => {
  const [searchedCountry, setSearchedCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [shownCountry, setShownCountry] = useState(null)
  

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleSearchedChange = (event) => {
    console.log(event.target.value)
    setSearchedCountry(event.target.value)
  }

  const handleShowCountry = (country) => {
    setShownCountry(country === shownCountry ? null : country);
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchedCountry.toLowerCase())
  );

  return (
    <div>
      <Filter searchedCountry={searchedCountry} handleChange={handleSearchedChange} />

      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length > 1 ? (
        filteredCountries.map(country => (
          <div key={country.name.official}>
            <p>{country.name.common}</p>
            <button onClick={() => handleShowCountry(country)}>show</button>
            {shownCountry === country && (
              <Country
                name={country.name.common}
                capital={country.capital}
                languages={Object.values(country.languages)}
                area={country.area}
                flag={country.flags.png}
              />
            )}
          </div>
        ))
      ) : filteredCountries.length === 1 ? (
        <Country
          name={filteredCountries[0].name.common}
          capital={filteredCountries[0].capital}
          area={filteredCountries[0].area}
          languages={Object.values(filteredCountries[0].languages)}
          flag={filteredCountries[0].flags.png}
        />
      ) : null
      }
    </div>
  )
}

export default App

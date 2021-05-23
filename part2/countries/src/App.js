import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDetail from './CountryDetail.js';

function App() {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const countriesToShow = filter
  ? countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
  : countries

  const shouldShow = countriesToShow.length < 10 && countriesToShow.length > 1 ? true : false

  const detailToShow = countriesToShow.length === 1
  ? countriesToShow[0]
  : null

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleOnChange = event => {
    setFilter(event.target.value)
  }

  const handleShow = event => {
    setFilter(event.target.value)
  }

  return (
    <div className="App">

      <form>
        <label htmlFor="filter"></label><input name="filter" value={filter} onChange={handleOnChange} />
      </form>
      {shouldShow
      ?
        <table>
          <tbody>
            {countriesToShow.map(c => {
              return (
                <tr key={c.alpha2Code} >
                  <td>{c.name}</td>
                  <td><button value={c.name} onClick={handleShow} >Show</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      : detailToShow
      ? <CountryDetail country={countriesToShow[0]} />
      : <p>The result is too large, please choose a more specific query</p>
      }
    </div>
  );
}

export default App;

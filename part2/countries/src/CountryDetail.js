import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetail = ({country}) => {
  const [weather, setWeather] = useState({})
  useEffect(() => {
      axios
        .get('https://api.weatherstack.com/current',{
          params:{
            access_key:process.env.REACT_APP_API_KEY,
            query:country.capital
          }
        })
        .then(response => {
          const data = response.data.current
          setWeather({
            temp:data.temperature,
            wind_speed:data.wind_speed,
            wind_direction:data.wind_direction,
            img:data.weather_icons[0]
          })
        })
        .catch(err => alert("Error retrieving weather data, try checking your API key"))
    }, [])
  return (
      <div>
          <h2>{country.name}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h3>Languages</h3>
          {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
          <br/>
          <img src={country.flag} style={{maxWidth:200}} alt="flag" />
          <h2>Weather in {country.capital}</h2>
          <img src={weather.img} alt="weather" />
          <p>Temperature {weather.temp} degrees Celsius</p>
          <p>Wind Speed: {weather.wind_speed}mph</p>
          <p>Wind Direction: {weather.wind_direction}</p>
      </div>
  )
}

export default CountryDetail
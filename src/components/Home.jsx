import React from 'react'
// import Gallery from './Gallery'
// import About from './About'
// import WeatherCard from "./WeatherCard";  // weather component
import axios from 'axios'; // API Calls
import { useState } from "react"; // State Management
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import './Home.css';



function Home() {

  const [cityName, setCityName] = useState(""); // State for city name input
  const [data, setData] = useState(null);  // State for storing API response data

  let formatTime = (unix) => {
  return new Date(unix * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}
  let submitHandler = async (e) => { // Function to handle form submission and API call
    e.preventDefault(); // prevent refreshing the page on form submit

    try 
    { // Try block to handle API call and response
      let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=771fa99984f7f60bcda45e1ae02c85c9&units=metric`); // API call to OpenWeatherMap with city name and API key
      setData(response.data); // Update state with API response data
      console.log(response.data.weather[0].description); // Log weather description to console
    } 
    catch (error) {
      console.log("error in api call: ", error);
    }
  }

  return (
 <div className="weather-page">
    <div className="weather-card">

      <div className="weather-header">
        <h1>Weather App</h1>
        <p>Enter a city to get current weather</p>
      </div>

      <input
        className="city-input"
        type="text"
        placeholder="e.g. Lahore, Cardona, New York..."
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />

      <Button className="search-btn" onClick={submitHandler}>
        Get Weather
      </Button>

      {data && (
        <>
          <div className="divider" />
          <div className="weather-result">
            <h2 className="city-name">{data.name}</h2>
            <div className="info-row">
              <span className="info-label">Weather</span>
              <span className="info-value">{data.weather[0]?.description}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Temperature</span>
              <span className="info-value">{data.main?.temp}°C</span>
            </div>
            <div className="info-row">
              <span className="info-label">Humidity</span>
              <span className="info-value">{data.main?.humidity}%</span>
            </div>
            <div className="info-row">
              <span className="info-label">Wind Speed</span>
              <span className="info-value">{data.wind?.speed} m/s</span>
            </div>
            <div className="info-row">
              <span className="info-label">Feels Like</span>
              <span className="info-value">{data.main?.feels_like}°C</span>
            </div>
            <div className="info-row">  
              <span className="info-label">Sunrise</span>
              <span className="info-value">{formatTime(data.sys?.sunrise)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Sunset</span>
              <span className="info-value">{formatTime(data.sys?.sunset)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Visibility</span>
              <span className="info-value">{data.visibility} meters</span>
            </div>
              <div className="info-row">
              <span className="info-label">Country</span>
              <span className="info-value">{data.sys.country} </span>

            </div>
            
          </div>
        </>
      )}
    </div>
  </div>
)
}
export default Home;
import React, { useEffect, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

// Define the structure of the weather data
interface WeatherData {
  humidity: number;
  windSpeed: number;
  temperature: number;
  location: string;
  icon: string;
}

interface OpenWeatherResponse {
  main: {
    humidity: number;
    temp: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    icon: string;
  }[];
  name: string;
}

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>(''); // State for the input city

  const allIcons: { [key: string]: string } = {
    '01d': clear_icon,
    '01n': clear_icon,
    '02d': cloud_icon,
    '02n': cloud_icon,
    '03d': humidity_icon,
    '03n': humidity_icon,
    '04d': rain_icon,
    '04n': rain_icon,
    '05d': snow_icon,
    '05n': snow_icon,
    '06d': wind_icon,
    '06n': wind_icon,
  };

  // Fix the city type by explicitly typing it as a string
  const search = async (city: string) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data: OpenWeatherResponse = await response.json();

      if (response.ok) {
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        // Set proper weather data using the WeatherData type
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });
      } else {
        alert(`City not found: ${data.name}`);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    search('New York'); 
  }, []);


  return (
    <div className='weather'>
      <div className='search-bar'>
        <input type='text'placeholder='Search'/>
        <img src={search_icon} alt=''/>
      </div>
          <img src={weatherData?.icon} alt='Weather icon'/>
          <p className='temperature'>{weatherData?.temperature}°C</p>
          <p className='location'>{weatherData?.location}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData?.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt='Wind icon' />
              <div>
                <p>{weatherData?.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        (
        <p>Loading weather data...</p>
      )
    </div>
  );
};

export default Weather;

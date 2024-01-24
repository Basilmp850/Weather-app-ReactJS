import './App.css';
import { Search, MapPin, Wind } from 'react-feather';
import getWeather from './api/api';
import { useEffect, useState } from 'react';
import dateFormat from 'dateformat';
import { Audio } from 'react-loader-spinner';

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const supportedPlaces = [
    'London',
    'New York',
    'Tokyo',
    'Paris',
    'Sydney',
    'Los Angeles',
    'Berlin',
    'Mumbai',
    'Toronto',
    'Rio de Janeiro',
    'Dubai',
    'Rome',
    'Seoul',
    'Cape Town',
    'Moscow',
    'Beijing',
    'San Francisco',
    'Amsterdam',
    'Singapore',
    'Mexico City',
    // Add more cities as needed
  ];
  useEffect(() => {
    const randomValue = Math.floor(Math.random() * supportedPlaces.length);
    const randomCity = supportedPlaces[randomValue];

    const getWeatherbyCity = async () => {
      setLoading(true);
      const weatherData = await getWeather(randomCity);
      setWeather(weatherData);
      setCity("");
      setLoading(false);
    };

    getWeatherbyCity();
  }, []);

  const getW = async () => {
    setLoading(true);
    const weatherData = await getWeather(city);
    setWeather(weatherData);
    setCity('');
    setLoading(false);
  };

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  }
  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)}
          placeholder='Enter City Name' />
        <button onClick={() => getW()}>
          <Search></Search>
        </button>
      </div>

      {loading ? (
        <div className="loader">
          <Audio type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <>
          {weather && weather.weather &&
            <div className="content">

              <div className="location d-flex">
                <MapPin></MapPin>
                <h2>{weather.name} <span>({weather.sys.country})</span></h2>
              </div>
              <p className="datetext">{renderDate()}</p>

              <div className="weatherdesc d-flex flex-c">
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                <h3>{weather.weather[0].description}</h3>
              </div>

              <div className="tempstats d-flex flex-c">
                <h1>{weather.main.temp} <span>&deg;C</span></h1>
                <h3>Feels Like {weather.main.feels_like} <span>&deg;C</span></h3>
              </div>

              <div className="windstats d-flex">
                <Wind></Wind>
                <h3>Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;</h3>
              </div>

            </div>
          }
        </>
      )}





      {
        (!loading && !weather.weather) && <div className="content">
          <h4>No Data found !</h4>
        </div>
      }



    </div >
  );
}

export default App;



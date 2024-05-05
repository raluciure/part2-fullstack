import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Country = (props) => {
    const [weather, setWeather] = useState(null);
    const api_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

    console.log(props.capital)
    console.log(api_key)

    useEffect(() => {
        const getWeather = async () => {
          try {
            console.log('fetch weather');
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${props.capital}&appid=${api_key}&units=metric`
            );
            setWeather(response.data);
          } catch (error) {
            console.log(error);
          }
        };
      
        if (props.capital && api_key) {
          getWeather();
        }
      }, [props.capital, api_key]);

    console.log(weather)

    return (
        <div>
            <h2>{props.name}</h2>
            <p> capital {props.capital}</p>
            <p> area {props.area}</p>
            <p> <b>languages:</b> </p>
            <ul>
                {props.languages.map(language =>
                    <li key={language}>{language}</li>
                )}
            </ul>
            <img src={props.flag} />
            <h2>Weather in {props.capital}</h2>
            {weather && (
                <div>
                    <p>temperature {weather.main.temp} Celsius</p>
                    <img
                        src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                    />
                    <p>wind {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    )
}

export default Country
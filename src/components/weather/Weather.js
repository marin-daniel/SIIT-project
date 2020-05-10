import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {

    const [globalErrorMessage, setGlobalError] = useState('');

    const tempFromLocalStorage = localStorage.getItem('prefDegree');
    const [prefTemp, setPrefTemp] = useState(tempFromLocalStorage);
    const [tempSymbol, setTempSymbol] = useState('')
    const [tempConverted, setTempConverted] = useState('');
    const [tempFeelsLike, setTempFeelsLike] = useState('');
    const [city, setCity] = useState('');
    const [emptyString, setEmptyString] = useState(false);

    const apiKey = '&appid=64bdb603a3b2a01882213cfbc58712ef';
    const [weatherData, setWeatherData] = useState([]);
    const defaultCity = localStorage.getItem('city');
    const defaultUrl = `http://api.openweathermap.org/data/2.5/weather?q=${defaultCity},ro&lang=ro` + apiKey;
    const [url, setUrl] = useState(defaultUrl);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const coordURL = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=ro` + apiKey;
            setUrl(coordURL);
        });
    } else {
        alert('Geolocation not suported by the browser');
    }  

    async function getWeather() {
        try{
            const res = await axios(url);
            const response = res.data;
            setWeatherData(response)
        } 
        catch(e){
            setGlobalError(e.response.data.message);
        }
    }

    useEffect(() => {
        getWeather()
        const interval = setInterval(getWeather, 600000);
        return () => clearInterval(interval); 
    }, [url]);
    
    function handleSetDefaultLocation(){
        localStorage.setItem('city', city);
    }

    function handleChange(e) {
        if (e.currentTarget.name === 'prefTemp') {
            localStorage.setItem('prefDegree', e.target.value);
            setPrefTemp(e.target.value);
        }        
    }    
    
    function handleCityChange(e){
        setCity(e.currentTarget.value);
        setEmptyString(true);
        setGlobalError('');
    }
    

    function handleSubmit(e){        
        e.preventDefault();        
        setUrl('http://api.openweathermap.org/data/2.5/weather?&lang=ro&q=' + city + apiKey);        
    }       

    //set pref temp for the first load of page when local storage is empty
    (function () {        
        if (tempFromLocalStorage === null) {
            localStorage.setItem('prefDegree', 'celsius');
            setTempSymbol('°C');
            setPrefTemp('celsius');
        }

        if(defaultCity === null){
            localStorage.setItem('city', 'Brasov');
        }

    })();

    useEffect(() => {
        if (weatherData.length !== 0) {
            if (prefTemp === 'fahrenheit') {
                setTempConverted((weatherData.main.temp * (9 / 5) - 459.67).toFixed(1));
                setTempFeelsLike((weatherData.main.feels_like * (9 / 5) - 459.67).toFixed(1));
                setTempSymbol('°F');
            } else {
                setTempConverted((weatherData.main.temp - 273.15).toFixed(1));
                setTempFeelsLike((weatherData.main.feels_like - 273.15).toFixed(1));
                setTempSymbol('°C');
            }
        }

    }, [prefTemp, weatherData])

    return (
        <section className='weather-section'>
            <div className='side-container'>
                {weatherData.length !== 0 ?
                    <>
                        <div>
                            <form onSubmit={handleSubmit} autocomplete='off' className='weather-form flex-container'>
                                <div>
                                    <div>                                        
                                        <input onChange={handleChange}
                                            type="radio" id="celsius"
                                            name="prefTemp"
                                            value="celsius"
                                            checked={prefTemp === 'celsius'} />
                                        <label htmlFor="celsius">°C</label>
                                    </div>
                                    <div>                                        
                                        <input onChange={handleChange}
                                            type="radio"
                                            id="fahrenheit"
                                            name="prefTemp"
                                            value="fahrenheit"
                                            checked={prefTemp === 'fahrenheit'} />
                                        <label htmlFor="fahrenheit">°F</label>
                                    </div>
                                </div>
                                <div className='flex-container'>
                                    <input className='search-input'
                                        onChange={handleCityChange}
                                        value={city}
                                        type="text"
                                        id="search-city"
                                        placeholder="Search city"
                                    />
                                    <button type="submit" className='search-button' disabled={!emptyString}>
                                        <img src='/images/top_search_submit_bg_new.png' alt='search-button'></img>
                                    </button>
                                </div>                                 
                                <button onClick={handleSetDefaultLocation} className={(city ? 'set-city' : 'button-hidden')}>
                                     Set city                                        
                                </button>                               
                            </form>
                        </div>
                        { (globalErrorMessage ?
                            <h4 className='invalid-feedback'> { globalErrorMessage.charAt(0).toUpperCase() + globalErrorMessage.slice(1) } </h4> : null) }

                        <table className='weather-info'>
                            <tbody>
                                <tr>
                                    <td colSpan='2' className='location'>Weather in {weatherData.name}</td>
                                </tr>
                                <tr>
                                    <td><img src={'http://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png'} alt='weather-icon'></img></td>
                                    <td>
                                        <span className='temp'>{tempConverted}{tempSymbol}</span>
                                        <br />
                                        <span className='description'>{weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <table className='weather-table'>
                                <tbody>
                                    <tr>
                                        <td><h3>Feels like</h3></td>
                                        <td>{tempFeelsLike} {tempSymbol}</td>
                                    </tr>
                                    <tr>
                                        <td><h3>Wind</h3></td>
                                        <td>{weatherData.wind.speed} m/s</td>
                                    </tr>
                                    <tr>
                                        <td><h3>Pressure</h3></td>
                                        <td>{weatherData.main.pressure} hpa</td>
                                    </tr>
                                    <tr>
                                        <td><h3>Humidity</h3></td>
                                        <td>{weatherData.main.humidity} %</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </>
                    : 'Loading weather data...'
                }
            </div>
        </section>
    )
}

export default Weather;
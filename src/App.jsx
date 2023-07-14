import { useState } from 'react'
import {api} from  "./keys"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
// import "bootstrap/dist/css/bootstrap.min.css"
function App() {
  const [city,setCity] = useState('');
  const [weather,setWeather] =useState([]);
  const search=(e)=>{
    if(e.key==="Enter"){
      fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api.key}`)
      .then((r) => { 
        if (!r.ok) {
          const msz = "Error! Can't fetch latitude and longitude for the city";
          throw new Error(msz);
        }
        return r.json(); 
      })
      .then((res) => {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${res[0].lat}&lon=${res[0].lon}&appid=${api.key}`); 
      })
      .then((res) => {
        if (!res.ok) {
          const msz = "Error! Can't fetch weather for the city at this time";
          throw new Error(msz);
        }
        return res.json(); 
      })
      .then((result) => {
        setCity("");
        setWeather(result);
      })
      .catch((error) => {
        toast.error(error.message); // Display error message using React-Toastify
      });    
    }
  }
  return (
    <div className=
        {(typeof weather.main!="undefined"?
        ((weather.main.temp-273>18)?"hot":"cold"):"App")
        }>
      <main>
        <div className='logo-holder'>
          <div className='logo-1'>
            <h3 >naForcast</h3>
            <p>weather for you</p>
          </div>
        </div>
        <div className='search-container'>
          <input
            type="text" 
            placeholder='search city'
            className='search-bar'
            onChange={(e)=>setCity(e.target.value)}
            onKeyDown={search}  
          >
          </input>
          </div>
        {
          ( typeof weather.main!= "undefined")?(
           <div>
           <div className='location-container'>
              {weather.name} , {weather.sys.country}<br/>
              <div className='date'>{new Date().toLocaleString("en-US",{month:"short"})},{new Date().toLocaleString("en-US",{day:"2-digit"})},{new Date().getFullYear()}</div>
            </div>
            <div className='weather-container'>
             <div className='temperature'>{Math.round(weather.main.temp-273.15)}°C</div>
             <div className='weather'>{weather.weather[0].main}</div>
            </div>
            </div>
        ):( <div>
          <ToastContainer /> {/* Add this line to display the ToastContainer */}
        </div>)
        }
      </main>
    </div>
  )
}

export default App

import React, { useState } from 'react';
import {useEffect} from 'react';
import './WeatherApp.css'
import search_icon from '../Assets/search.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';
  const WeatherApp = () => {
    const days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const date=new Date();
    let weekday = days[date.getDay()];
    let hour=date.getHours();
    let min=date.getMinutes();
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let today=date.getDate();
    let api_key="21ab6c5a75b02939b11e5dd7b8af349e";
    const [wicon, setWicon]=useState('01d');
    const search= async()=>{
        const element=document.getElementsByClassName('cityInput');
        if(element[0].value==='')
        {
            return 0;
        }
        console.log(element[0]);
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;
        console.log(url);
        let response = await fetch(url);
        let data= await response.json();
        if (data.cod==='404'){
            alert("City not found");
            return 0;
        }
        console.log(data);
        const humidity=document.getElementsByClassName('humidity');
        const wind=document.getElementsByClassName('wind');
        const temperature=document.getElementsByClassName('weather-temp');
        const location=document.getElementsByClassName('weather-location');
        const time=document.getElementsByClassName('time');
        const day=document.getElementsByClassName('day');
        const date=document.getElementsByClassName('date');
        humidity[0].innerHTML=data.main.humidity+'%';
        wind[0].innerHTML=Math.floor(data.wind.speed)+'km/h';
        temperature[0].innerHTML=Math.floor(data.main.temp)+'°C';
        location[0].innerHTML=data.name;
        time[0].innerHTML=hour+':'+min;
        day[0].innerHTML=weekday;
        date[0].innerHTML=today+'/'+month+'/'+year;
        const icon=data.weather[0].icon;
        setWicon(icon);
        console.log(data.weather[0].icon);
        console.log(wicon);
    }
    useEffect(() => {
        const keyDownHandler = event => {
          console.log('User pressed: ', event.key);
    
          if (event.key === 'Enter') {
            event.preventDefault();
            search();
          }
        };
    
        document.addEventListener('keydown', keyDownHandler);
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
      }, []);
  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='Enter your city...'/>
            <div className="search" onClick={search}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="display">
            <div className="left">
                <div className="time">12:00</div>
                <div className="calender">
                    <div className="day">
                        Sunday
                    </div>
                    <div className="date">
                        1/1/2024
                    </div>
                </div>
                <div className="weather-temp">24°C</div>
                <div className="weather-location">London</div>
            </div>
            <div className="right">
                <div className="weather-img">
                <img src={`http://openweathermap.org/img/w/${wicon}.png`} />
                </div>
                <div className="data-container">
                    <div className="element">
                        <img src={humidity_icon} alt=""/>
                        <div className="data">
                            <div className="humidity">64%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={wind_icon} alt="" />
                        <div className="data">
                            <div className="wind">18km/h</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default WeatherApp;

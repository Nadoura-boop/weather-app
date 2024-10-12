import React from 'react'
import { useState } from 'react';
import './style.css';
import axios from 'axios';

function Home() {
  const [data ,setData] = useState ({
    celcius: 10,
    humidity: 50,
    speed: 10,
    name: 'London',
})
const [name,setName]= useState ('');
const [error,setError]= useState ('');

  
 const handleClick =()=>{
  if (name !==""){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=f03a36787fc068d617af2c2cb77fdc0e&&units=metric`; 
    axios.get(apiUrl)
    .then(res => {
      setData({...data,celcius:res.data.main.temp, name:res.data.name,humidity:res.data.main.humidity,speed:res.data.wind.speed
      })
      setError('');
    })
    .catch(err=> {
      if(err.response.status === 404){
        setError("Invalid City Name ")
      }else{
        setError('');
      }
      console.log(err);
    })
     
  }
 }

  return (
    <div className='container'>
        <div className="weather">
            <div className="search">
                <input type="text" placeholder='Enter City Name' onChange={e => setName(e.target.value)}/>
              <button><i class="fa-solid fa-magnifying-glass" onClick={handleClick}></i></button>  
            </div>
            <div className="error">
              <p>{error}</p>
            </div>
            <div className="winfo">
                  <img src="/Images/cloud1.png"  className="icon" alt=''/>
                  <h1>{Math.round(data.celcius)}°C</h1>
                  <h2>{data.name}</h2>
                <div className="details">
                  <div className="col">
                    <img src='/Images/humidity.png' alt=''/>
                      <div className='humidity'>
                        <p>Humidity</p>
                        <p>{Math.round(data.humidity)}%</p>
                      </div>
                  </div>
                  <div className="col">
                    <img src='/Images/wind (1).png' alt=''/>
                    <div className='wind'>
                      <p> {Math.round(data.speed)}km/h</p>
                        <p>wind</p>
                    </div>
                  </div>
                </div>
              </div>
        </div>
    </div>
  )
}

export default Home
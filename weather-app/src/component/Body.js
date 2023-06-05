import { useEffect, useState } from 'react';


const Body = () =>{

    const [Weatherdata , setWeatherData] = useState({})
    const [searchText , setSearchText] = useState("mumbai")
    const [display_data , setDisplay_Data] = useState(false)

    let percentage = "%"
    let degree = "°C"
    let speed = " km/h"
  

    useEffect(()=>{ 
       getWeather(searchText)
    },[])  

    async function getWeather(city){
    try{
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1750c3433a0df097355e4e02c80d42fe`)
         const api_data = await data.json();
          console.log(api_data);
         setWeatherData(api_data)
         console.log(Weatherdata)
         setDisplay_Data(true)
    }catch(e){
        console.log(e)
    }
}
    return (
        <>
            <div >
            <input type="text"
            placeholder='Enter the City'
                    value={searchText}
                    onChange={(e)=>{
                        setSearchText( e.target.value);
                    }}
                />
                <button onClick={()=>{
                    getWeather(searchText);
                    
                }}>Search</button> 

          {display_data ?  <div className='data_div'>
                <h2 style={{marginLeft : "50px"}}>{Weatherdata?.name }{" "}<span>{Weatherdata?.sys?.country}</span></h2>
                <h4> Temp : {Weatherdata?.main?.temp }{degree}</h4>
                <h4>Humidity : {Weatherdata?.main?.humidity}{percentage}</h4>
                <h4>Wind Speed : {Weatherdata?.wind?.speed}{speed}</h4>

            </div> : <div></div>}
            </div>
        </>
    )
}

export default Body;



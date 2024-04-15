import { useState } from "react"

const apiAccessKey = "7fa49df185d68f18d8ae6fe15a2f5738"

function WeatherApp(){
    const [weather,setWeather] = useState({
        image: "https://openweathermap.org/img/wn/10d@2x.png",
        temparature: "0",
        city: "Undefined",
        humidity: "0",
        speed: "0"
    })

    function getWeather(event){
        event.preventDefault()

        let city = event.target.city.value

        if(!city){
            alert("Please enter a city name ! ")
            return
        }


        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiAccessKey)
        .then((response) => {
            if(!response.ok){
                throw new Error()
            }
            
            console.log(response)
            return response.json()
        
        })

        .then((data) => {
            console.log(data.weather[0].icon)
            setWeather({
                image: "https://openweathermap.org/img/wn/" + data.weather[0].icon +"@2x.png",
                temparature: data.main.temp,
                city: data.name,
                humidity: data.main.humidity,
                speed: data.wind.speed
            })
        })

        .catch((error) => {
            console.log(error)
            alert("Invalid city entered ! ")
        })

    }
    return(
      <div className="container my-5">
        <div className="mx-auto rounded-4 border text-center text-white p-4" style={{backgroundColor: "#578bc6", maxWidth: "510px"}}>
            <h2 className="fw-bold mb-5">
              Weather Forecast 
            </h2>

            <form className="d-flex mb-4" onSubmit={getWeather}>
              <input className="form-control me-2 rounded-4" placeholder="Please enter the City" name="city"/>
              <button className="btn text-white rounded-4" type="submit">Search</button>
            </form>

            <img src={weather.image} alt="weather-default" />

            <h1 className="display-4 fw-medium">{weather.temparature} °C</h1>
            <h1 className="mb-5">{weather.city}</h1>

            <div className="row mb-4">
              <div className="col">
                <i className="bi bi-moisture mr-2"></i>
                Humidity<br />
                {weather.humidity} %
              </div>

              <div className="col">
                <i className="bi bi-wind mr-3"></i>
                Wind Speed<br />
                {weather.speed} km/h

              </div>
            </div>
    

        </div>
      </div>  

    )


}
export default WeatherApp
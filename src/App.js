import React, { Component } from 'react'
import './App.css';

// Importing my weather, banner and form component
import Weather from './Components/Weather'
import Form from './Components/Form'
import Banner from './Components/Banner'

// Importing BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css'

// Importing WEATHER ICONS 
import { WiThunderstorm, WiSnow, WiShowers, WiRain, WiFog, WiDaySunny, WiDayFog } from 'react-icons/wi';

// This is the API key for my weather info
const API_key = '3873fe8cb4e9a425124dc5cd1719f582'



export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      city: undefined,
      country: undefined,
      temperature: undefined,
      temp_min: undefined,
      temp_max: undefined,
      icon: undefined,
      description: '',
      error: false,
      icons: undefined
    }

    this.weatherIcons = {
      Thunderstorm: <WiThunderstorm className='display-1' />,
      Drizzle: <WiShowers className='display-1' />,
      Rain: <WiRain className='display-1' />,
      Snow: <WiSnow className='display-1' />,
      Atmosphere: <WiFog className='display-1' />,
      Clear: <WiDaySunny className='display-1' />,
      Clouds: <WiDayFog className='display-1' />
    }
  }

  getCelsius(temp) {
    let cel = Math.floor(temp - 273.15)
    return cel
  }

  getWeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icons: this.weatherIcons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icons: this.weatherIcons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icons: this.weatherIcons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icons: this.weatherIcons.Snow });
        break;
      case rangeId >= 700 && rangeId <= 781:
        this.setState({ icons: this.weatherIcons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icons: this.weatherIcons.Clear });
        break;
      case rangeId >= 800 && rangeId <= 804:
        this.setState({ icons: this.weatherIcons.Clouds });
        break;
      default:
        this.setState({ icons: this.weatherIcons.Clouds });
    }
  }

  getWeather = async (e) => {

    e.preventDefault()

    const city = e.target.city.value;
    const country = e.target.country.value;

    if (city && country) {
      const api_call = await fetch(`//api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

      const response = await api_call.json();
      console.log(response)

      this.setState({
        city: response.name,
        country: response.sys.country,
        temperature: this.getCelsius(response.main.temp),
        temp_min: this.getCelsius(response.main.temp_min),
        temp_max: this.getCelsius(response.main.temp_max),
        description: response.weather[0].description,
        error: false
      });

      this.getWeatherIcon(this.weatherIcons, response.weather[0].id);
    } else {
      this.setState({
        error: true
      })
    }
  }


  render() {
    return (
      <div className="App">
        <Banner />
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather city={this.state.city} country={this.state.country} description={this.state.description}
          temp_max={this.state.temp_max} temp_min={this.state.temp_min} temperature={this.state.temperature}
          weatherIcons={this.state.icons} />
      </div>
    )
  }
}



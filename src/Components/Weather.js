import React, { Component } from "react";


export default class Weather extends Component {

  minMaxTemp(min, max) {
    if (min && max) {
      return (
        <h3>
          <span className="px-4">{min}&deg; </span>
          <span className="px-4"> {max}&deg; </span>
        </h3>
      )
    }
  }
  render() {
    const { city, country, description, temperature, temp_min, temp_max, weatherIcons } = this.props
    return (
      <div className="container">
        <div className="cards pt-5">
          <h1>{city} {country}</h1>

          <h5 className="py-3">
            {weatherIcons}
          </h5>

          {temperature ? (<h1 className="py-2">{temperature}&deg;</h1>) : null}

          {this.minMaxTemp(temp_min, temp_max)}

          <h4 className="py-3">{description}</h4>

        </div>
      </div>
    );
  }
}

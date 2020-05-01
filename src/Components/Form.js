import React, { Component } from 'react'

// Importing CSS file for the form component
import './form.style.css'


export default class Form extends Component {

    error() {
        return (
            <div className="alert alert-danger mx-5" role='alert'>Please Enter City and Country</div>
        )
    }
    render() {

        return (

            <div className="container">
                <div> {this.props.error ? this.error() : null} </div>
                <form onSubmit={this.props.loadWeather}>
                    <div className="row">
                        <div className="col-md-3 offset-md-2">
                            <input type="text" name='city' placeholder='city' autoComplete='off' autoCapitalize='on' className="form-control" />
                        </div>

                        <div className="col-md-3">
                            <input type="text" name='country' placeholder='country' autoComplete='off' autoCapitalize='on' className="form-control" />
                        </div>

                        <div className="col-md-3 mt-md-0 py-2 text-md-left">
                            <button type='submit' className="btn btn-outline-dark">Get Weather</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
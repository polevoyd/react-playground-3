
import {config} from './config'
import React from 'react';
import ReactDOM from 'react-dom';
import LocationInput from './components/LocationInput';
import './index.css';
import MapContainer from './components/MapContainer';

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      // set initial location to current location and load it on mount
      // 'Seattle' - only for a testing simplicity
      location: 'Seattle',
      locationLngLat: []
    }

    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  /* ------------------------------------------------------------------------------------------- */

  // request a location by name and get back a lang and lat of that location on a map
  requestLocationGeocode(locationName) {

    // Building request and based on response create a map
    const linkToRequest = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.location}.json?access_token=${config.REACT_APP_MAPS_KEY}`;
    
    // Sending a request
    fetch(linkToRequest)
      .then(results => results.json())
      .then((results) => {

        // For just take first and most relevant result
        // results.features - array of locations
        this.setState({
          location: results.features[0].place_name,
          locationLngLat: results.features[0].center
        })
      })
  }

  /* ------------------------------------------------------------------------------------------- */
  //          on submit - change location in a state after user clicked 'Submit'
  /* ------------------------------------------------------------------------------------------- */

  handleLocationSubmit(event) {

    event.preventDefault();

    // TODO: checking if input is actually a location
    // by sending request and get response
    // if yes, then change state.location to a new one

    this.requestLocationGeocode(this.state.location)
  }

  /* ------------------------------------------------------------------------------------------- */
  //           on change - will alternate status as well
  /* ------------------------------------------------------------------------------------------- */

  handleLocationChange(event) {
    this.setState({
      location: event.target.value
    })
  }

  /* ------------------------------------------------------------------------------------------- */
  //           on submit - search for a tweets
  /* ------------------------------------------------------------------------------------------- */

  searchForTweets() {

    const request = require('request');
    const consumer_key = config.REACT_APP_TWITTER_KEY;
    const consumer_secret = config.REACT_APP_TWITTER_SECRET_KEY;
    const encode_secret = new Buffer(consumer_key + ':' + consumer_secret).toString('base64');

    const options = {

      url: 'https://api.twitter.com/oauth2/token',
      headers: {
        'Authorization': 'Basic ' + encode_secret,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: 'grant_type=client_credentials'
      };

    request.post(options, (error, response, body) => {

      console.log(body)
    });
  }
  

  /* ------------------------------------------------------------------------------------------- */

  // Entry point
  render() {

    return (
      <div>
        <LocationInput handleLocationSubmit={this.handleLocationSubmit} handleLocationChange={this.handleLocationChange} />
        <MapContainer coordinates={this.state.locationLngLat} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));





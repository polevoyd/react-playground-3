
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
    
    // starting to search for tweets
    this.searchForTweets();
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

  searchForTweets(locationToSearch) {

    const request = require('request');
    const twitter_api = 'https://api.twitter.com/1.1/search/tweets.json?q=kutuza';
    const bearer_token = config.REACT_APP_TWITTER_BEARER_TOKEN_TEXT;

    
    // request({ url: twitter_api,
    //     method:'GET',
    //     qs:{"screen_name":"stadolf"},
    //     json:true,
    //     headers: {
    //         "Authorization": "Bearer " + bearer_token
    //     }
    
    // }, function(err, resp, body) {
    
    //     console.dir(body);
    
    // });


    // fetch(twitter_api, {
    //   headers: {
        
    //   }
    // }).then(response => {
    //   console.log(response)
    // })
  
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





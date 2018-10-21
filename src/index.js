
import {config} from './config'
import React from 'react';
import ReactDOM from 'react-dom';
import LocationInput from './components/LocationInput';
import './index.css';
import MapContainer from './components/MapContainer';

/* ------------------------------------------------------------------------------------------- */
//          getting a user location and setting up a map center
/* ------------------------------------------------------------------------------------------- */


    // get user location

    let userLocation = [];
    navigator.geolocation.getCurrentPosition(position => {

      
      userLocation = [position.coords.latitude, position.coords.longitude]
      console.log(userLocation)
      
    });

    console.log(userLocation)


/* ------------------------------------------------------------------------------------------- */
//          Main component of an app
/* ------------------------------------------------------------------------------------------- */

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      // set initial location to current location and load it on mount
      // 'Seattle' - only for a testing simplicity
      location: '',
      locationLngLat: [] // [-122.3447, 47.6151]
    }

    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }
  

  /* ------------------------------------------------------------------------------------------- */
  //        request a location by name and get back a lang and lat of that location on a map
  /* ------------------------------------------------------------------------------------------- */

  requestLocationGeocode() {

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
      });
      // .then(this.searchForTweets());
  }

  /* ------------------------------------------------------------------------------------------- */
  //          on submit - change location in a state after user clicked 'Submit'
  /* ------------------------------------------------------------------------------------------- */

  handleLocationSubmit(event) {

    event.preventDefault();
    this.requestLocationGeocode(this.state.location)

    // starting to search for venue
    this.searchForTweets();
  }

  /* ------------------------------------------------------------------------------------------- */
  //           on change - will alternate status as well
  /* ------------------------------------------------------------------------------------------- */

  handleLocationChange(event) {

    // console.log(userLocation)
    
    this.setState({

      location: event.target.value,
    })
  }

  /* ------------------------------------------------------------------------------------------- */
  //           on submit - search for a tweets
  /* ------------------------------------------------------------------------------------------- */


  searchForTweets() {

    const linkToFetch = `http://localhost:4000/tweets?lat=${this.state.locationLngLat[1]}&lng=${this.state.locationLngLat[0]}`;

    fetch(linkToFetch)
    .then(response => response.json())
    .then(response => {

      // Array of tweets in that area
      console.log(response);
  

    })
    .catch(error => console.error(error));
  }
  

  /* ------------------------------------------------------------------------------------------- */
  //        Entry point
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





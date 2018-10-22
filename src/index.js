
import {config} from './config'
import React from 'react';
import ReactDOM from 'react-dom';
import LocationInput from './components/LocationInput';
import './index.css';
import MapContainer from './components/MapContainer';


/* ------------------------------------------------------------------------------------------- */
//          Main component of an app
/* ------------------------------------------------------------------------------------------- */

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      // set initial location to current location and load it on mount
      // 'Seattle' - only for a testing simplicity
      location: 'Seattle',
      locationLngLat: this.getCoordinatesFromURL(), // [-122.3447, 47.6151]
      tweets: []
    }

    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleCenterChange = this.handleCenterChange.bind(this);
    this.searchForTweets = this.searchForTweets.bind(this);
  }

  componentDidMount() {

    this.getCoordinatesFromURL();
  }


  /* ------------------------------------------------------------------------------------------- */
  //          Change state based on a map center change
  /* ------------------------------------------------------------------------------------------- */

  handleCenterChange(event) {

      this.setState({

        locationLngLat: [event.lngLat.lng , event.lngLat.lat]
      })
  }

  /* ------------------------------------------------------------------------------------------- */
  //          getting a user location from a URL
  /* ------------------------------------------------------------------------------------------- */

  getCoordinatesFromURL = () => {

    return window.location.hash.split('/').splice(1, 2).map( element => parseFloat(element));

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
  }

  /* ------------------------------------------------------------------------------------------- */
  //          on submit - change location in a state after user clicked 'Submit'
  /* ------------------------------------------------------------------------------------------- */

  handleLocationSubmit(event) {

    event.preventDefault();
    this.requestLocationGeocode(this.state.location)

    // starting to search for venue
    // This has to be done with a pause, so we not getting a empty array
    setTimeout(() => this.searchForTweets(), 1000);
    
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
  //           Helper function: generate random coordinates within radius
  /* ------------------------------------------------------------------------------------------- */


  generateCoordinateWithin(center, radius) {

    let y0 = center[0]
    let x0 = center[1]
    let rd = (radius * 1.60934 * 1000) / 111300;
    let u = Math.random();
    let v = Math.random();
    let w = rd * Math.sqrt(u);
    let t = 2 * Math.PI * v;
    let x = w * Math.cos(t);
    let y = w * Math.sin(t);
    
    return [y + y0, x + x0]
  }




  /* ------------------------------------------------------------------------------------------- */
  //           on submit - search for a tweets
  /* ------------------------------------------------------------------------------------------- */


  searchForTweets() {

    const linkToFetch = `http://localhost:4000/tweets?lat=${this.state.locationLngLat[1]}&lng=${this.state.locationLngLat[0]}`;

    fetch(linkToFetch)
    .then(response => response.json())
    .then(response => {

      // For each tweet object generating random geo coordinates
      // within certain radius
      // console.log(response);

      const tweets = response
      .map(element => {

        return {
           point: this.generateCoordinateWithin(this.state.locationLngLat, 10),
           text: element.text,
           pic: element.picture ? element.picture[0].media_url : undefined,
           user: element.user
        }
      })
      
      // Adding all points to a state
      this.setState({
        tweets: tweets
      })
    })
    .catch(error => console.error(error));
  }
  

  /* ------------------------------------------------------------------------------------------- */
  //        Entry point
  /* ------------------------------------------------------------------------------------------- */

  
  render() {

    return (
      <div>
        <LocationInput handleLocationSubmit={this.handleLocationSubmit} handleLocationChange={this.handleLocationChange} />
        <MapContainer coordinates={this.state.locationLngLat} handleCenterChange={this.handleCenterChange} tweets={this.state.tweets}/>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));





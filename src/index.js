
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
      location: '',
      locationLngLat: this.getCoordinatesFromURL() // [-122.3447, 47.6151]
    }

    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount() {

    this.getCoordinatesFromURL();
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
  //           Helper function: generate random coordinates within radius
  /* ------------------------------------------------------------------------------------------- */

  /* 
    Implementation from http://gis.stackexchange.com/questions/25877
  */
pointAtDistanceWhuber(coords, distance) {

	var r = (distance * 1.60934 / 1000) / 111300  
  , y0 = coords[0]
  , x0 = coords[1]
  , u = 1
  , v = Math.random()
  , w = r * Math.sqrt(u)
  , t = 2 * Math.PI * v
  , x = w * Math.cos(t)
  , y1 = w * Math.sin(t)
  , x1 = x / Math.cos(y0) ;

	const newY = y0 + y1
  const newX = x0 + x1

	return [ newY, newX ]
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

      const withCoordinates = response
      .map(element => {

        return {
           point: this.pointAtDistanceWhuber(this.state.locationLngLat, 30),
           text: element.text,
           pic: element.picture ? element.picture[0].media_url : undefined,
           user: element.user
        }
      })

      console.log(withCoordinates)
      
      // this.pointAtDistanceWhuber(this.state.locationLngLat, 30);
  

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
        <MapContainer coordinates={this.state.locationLngLat} />
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));






import {config} from './config'
import React from 'react';
import ReactDOM from 'react-dom';
import LocationInput from './components/LocationInput';
import './index.css';
import MapContainer from './components/MapContainer';
import { rejects } from 'assert';

/* ------------------------------------------------------------------------------------------- */
//          getting a user location and setting up a map center
/* ------------------------------------------------------------------------------------------- */


    // get user location
    // let userLocation = []
    // navigator.geolocation.getCurrentPosition(position => {
  
    // // console.log([position.coords.latitude, position.coords.longitude])
    // return [position.coords.latitude, position.coords.longitude]
    // })

    let userLocation = [];
    navigator.geolocation.getCurrentPosition(position => {

      userLocation = [position.coords.latitude, position.coords.longitude]
    });



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
      locationLngLat: [47.6151, -122.3447]
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
      })
  }

  /* ------------------------------------------------------------------------------------------- */
  //          on submit - change location in a state after user clicked 'Submit'
  /* ------------------------------------------------------------------------------------------- */

  handleLocationSubmit(event) {

    event.preventDefault();
    this.requestLocationGeocode(this.state.location)

    // starting to search for venue
    this.searchForVenues();
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

  searchForVenues() {

    fetch(link)
    .then(response => response.json())
    .then(response => {


    })
    .catch(error => console.error(error));
  


    .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
    .then(result => {
      const yelpSummaries = result.body.businesses.map( business => new Business(business));
      response.send(yelpSummaries);
    })
    .catch(error => handleError(error, response));

    const link = `https://api.yelp.com/v3/businesses/search?location=${request.query.data.search_query}`;


    fetch('URL_GOES_HERE', { 
      method: 'post', 
      headers: new Headers({
        'Authorization': 'Basic '+btoa('username:password'), 
        'Content-Type': 'application/x-www-form-urlencoded'
      }), 
      body: 'A=1&B=2'
    });








  
  

  /* ------------------------------------------------------------------------------------------- */
  //           search for a details of venue by ID
  /* ------------------------------------------------------------------------------------------- */


  searchForVenueDetails(venueID) {

    // This function runs for each venue

    // let venuePhotoLink = `https://api.foursquare.com/v2/venues/${venueID}/photos?client_id=${config.REACT_APP_FOURSQUARE_CLIENT_ID}&client_secret=${config.REACT_APP_FOURSQUARE_CLIENT_SECRET}&v=20180323`;
    // let venueDetailsLink = `https://api.foursquare.com/v2/venues/${venueID}?client_id=${config.REACT_APP_FOURSQUARE_CLIENT_ID}&client_secret=${config.REACT_APP_FOURSQUARE_CLIENT_SECRET}`


    fetch('link')
    .then(response => response.json())
    .then(response => {

      console.log(response)

  
    })
    .catch(error => console.error(error));
  

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





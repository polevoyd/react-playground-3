
import {config} from '../config'
import React from 'react';
import LocationInput from './LocationInput';
import '../index.css';
import MapContainer from './MapContainer';
import InfoButton from './InfoButton';
import InfoTab from './InfoTab';
import {connect} from 'react-redux';
import {setLocationAndCoordinates, setLocationCity, setTweets} from '../actions/actions'
require('dotenv').config();

/* ------------------------------------------------------------------------------------------- */
//          Main component of an app
/* ------------------------------------------------------------------------------------------- */

class App extends React.Component {

  constructor(props) {
    super(props);

    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.searchForTweets = this.searchForTweets.bind(this);
  }

  /* ------------------------------------------------------------------------------------------- */
  //          After mounting done
  /* ------------------------------------------------------------------------------------------- */

  componentDidMount() {
    this.props.dispatch(setLocationAndCoordinates('Los Angeles, California, United States', [-118.2439, 34.0544]));
    // This has to be done with a pause, so we not getting a empty array
      this.searchForTweets()
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
    const linkToRequest = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.state.location}.json?access_token=${config.REACT_APP_MAPS_KEY}`;
    
    // Sending a request
    fetch(linkToRequest)
      .then(results => results.json())
      .then((results) => {

        // Take first and most relevant result
        // results.features - array of locations
        this.props.dispatch(setLocationAndCoordinates(results.features[0].place_name, results.features[0].center))
      });
  }

  /* ------------------------------------------------------------------------------------------- */
  //          on submit - change location in a state after user clicked 'Submit'
  /* ------------------------------------------------------------------------------------------- */

  handleLocationSubmit(event) {

    event.preventDefault();
    this.requestLocationGeocode(this.props.state.location)

    // This has to be done with a pause, so we not getting a empty array
    this.searchForTweets()
  }

  /* ------------------------------------------------------------------------------------------- */
  //           on change - will alternate status as well
  /* ------------------------------------------------------------------------------------------- */

  handleLocationChange(event) {
    this.props.dispatch(setLocationCity(event.target.value))
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

    // const linkToFetch = `http://localhost:4000/tweets?lat=${this.state.locationLngLat[1]}&lng=${this.state.locationLngLat[0]}`;
    const linkToFetch = `https://cityglow.herokuapp.com/tweets?lat=${this.props.state.locationLngLat[1]}&lng=${this.props.state.locationLngLat[0]}`;
    
    fetch(linkToFetch)
    .then(response => response.json())
    .then(response => {

      // For each tweet object generating random geo coordinates
      // within certain radius

      const tweets = response
      .concat(response)
      .map(element => {
        return {
           point: this.generateCoordinateWithin(this.props.state.locationLngLat, 7),
           text: element.text,
           pic: element.picture ? element.picture[0].media_url : undefined,
           user: element.user
        }
      })
      return tweets;
    })
    .then(tweets => {
      // Adding all points to a state
      this.props.dispatch(setTweets(tweets));
    })
    .catch(error => console.error(error));
  }
  
  /* ------------------------------------------------------------------------------------------- */
  //        Animation for a menu
  /* ------------------------------------------------------------------------------------------- */

  handleInfoButtonClick() {

    if (document.querySelector('div.info-tab').style.height !== '40vh') {

      document.querySelector('div.info-tab').style.height = '40vh';
      document.querySelector('div.info-tab').style.paddingTop = '18vh';
      document.querySelector('div.info-tab').style.borderRadius = '0em 0em 2em 2em';
      document.querySelector('div.info-tab').style.border = '3px solid #DC965A';
      document.querySelector('div.info-tab').style.backgroundColor = '#2F2F2F';

    } else {

      document.querySelector('div.info-tab').style.height = '0vh';
      document.querySelector('div.info-tab').style.paddingTop = '0vh';
      document.querySelector('div.info-tab').style.border = 'none';
    }
  }

  /* ------------------------------------------------------------------------------------------- */
  //        Entry point
  /* ------------------------------------------------------------------------------------------- */
  
  render() {
    return (
      <div>
        <LocationInput handleLocationSubmit={this.handleLocationSubmit} handleLocationChange={this.handleLocationChange} />
        <MapContainer coordinates={this.props.state.locationLngLat} tweets={this.props.state.tweets}/>
        <InfoButton handleInfoButtonClick={this.handleInfoButtonClick}/>
        <InfoTab />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {state : state}
}

export default connect(mapStateToProps)(App);


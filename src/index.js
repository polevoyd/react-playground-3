
import { config } from './config';
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
      locationCoordinates: [0, 0]
    }
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
  }


  // request a location by name and get back a lang and lat of that location on a map
  requestLocationGeocode(locationName) {

  }

  // handle location submit - change location in a state after user clicked 'Submit'
  handleLocationSubmit(event) {

    event.preventDefault();

    
    // TODO: checking if input is actually a location
    // by sending request and get response
    // if yes, then change state.location to a new one

    // Location Lang, Lat
    let locationCoordinates = [];

    // Building request and based on response create a map
    const linkToRequest = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.location}.json?access_token=${config.REACT_APP_MAPS_KEYgh}`;
    
    // Sending a request
    fetch(linkToRequest)
      .then(results => results.json())
      .then((results) => {

        // For just take first and most relevant result
        // results.features - array of locations
        
        this.setState({
          location: results.features[0].place_name,
          locationCoordinates: results.features[0].center
        })
        
        // console.log(results.features[0].center)
        locationCoordinates = results.features[0].center;
      })
   
    this.setState({
      location: event.target[0].value
    })

    this.requestLocationGeocode(this.state.location)
  }

  // 0 Entry point to app
  render() {

    

    return (
      <div>
        <LocationInput handleLocationSubmit={this.handleLocationSubmit}/>
        <MapContainer placeToSearch={this.state.location}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));





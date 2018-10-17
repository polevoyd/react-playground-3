
import './config'
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
      location: 'Seattle'
    }
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
  }


  // request a location by name and get back a lang and lat of that location on a map
  requestLocationGeocode(locationName) {

  }

  // handle location submit - change location in a state after user clicked 'Submit'
  handleLocationSubmit(event) {

    event.preventDefault();

    // https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token={config.REACT_APP_MAPS_KEY}
    // TODO: checking if input is actually a location
    // by sending request and get response
    // if yes, then change state.location to a new one

   
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
        <MapContainer />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));





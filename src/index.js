
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

      location: undefined
    }
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange(event) {

    event.preventDefault();

    // https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token={config.REACT_APP_MAPS_KEY}
    // TODO: checking if input is actually a location
    // by sending request and get response
    // if yes, then change state.location to a new one

    console.log(event.target.childNodes)
    this.setState({
      
    })
  }

  // Entry point to app
  render() {

    

    return (
      <div>
        <LocationInput handleLocationChange={this.handleLocationChange}/>
        <MapContainer />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));





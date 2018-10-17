
import './config'
import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import Map from './components/Map';
import './index.css';
import { config } from './config';

class App extends React.Component {

  render() {

    mapboxgl.accessToken = config.REACT_APP_MAPS_KEY;
    const map = new mapboxgl.Map({
        container: document.getElementById('root'),
        style: 'mapbox://styles/mapbox/streets-v9'
    });

    return (
      <Map />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));





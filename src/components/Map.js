import { config } from '../config';
import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import '../index.css';


class Map extends React.Component {

  render() {

    mapboxgl.accessToken = config.REACT_APP_MAPS_KEY;
    const map = new mapboxgl.Map({
        container: document.getElementById('mapbox-container'),
        style: 'mapbox://styles/mapbox/streets-v9'
    });
  
    return (
      <div></div>
    );
  }
}

export default Map;
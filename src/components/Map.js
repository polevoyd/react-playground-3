import { config } from '../config';
import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../index.css';


class Map extends React.Component {

  componentDidMount(){

    mapboxgl.accessToken = config.REACT_APP_MAPS_KEY;

    const map = new mapboxgl.Map({
        container: document.getElementById('mapbox-container'),
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-122.420679, 37.772537],
        zoom: 13,
        hash: true 
    });
  }

  render() {

    return (
      <div></div>
    );
  }
}

export default Map;
import { config } from '../config';
import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../index.css';


class Map extends React.Component {

  componentDidUpdate(){

    // Creating and rendering a mapbox
    mapboxgl.accessToken = config.REACT_APP_MAPS_KEY;
    const map = new mapboxgl.Map({
        container: document.getElementById('mapbox-container'),
        style: 'mapbox://styles/mapbox/streets-v9',
        center: this.props.locationLngLat,
        zoom: 13,
        hash: true 
    });
  }


  componentDidMount(){

    // We have a name of place and  long/lat of it
    // as a this.props.placeToSearch nd this.props.locationLngLat
    // Creating and rendering a mapbox
    mapboxgl.accessToken = config.REACT_APP_MAPS_KEY;
    const map = new mapboxgl.Map({
        container: document.getElementById('mapbox-container'),
        style: 'mapbox://styles/mapbox/streets-v9',
        center: ['-122.3301', '47.6038'],
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
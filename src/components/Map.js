import { config } from '../config';
import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../index.css';

let map;

class Map extends React.Component {

  
  componentWillReceiveProps(nextProps){

    if (nextProps.coordinates !== this.props.coordinates) {
      map.setCenter(this.props.coordinates)
    }  
  }

  /* ------------------------------------------------------------------------------------------- */
  //          Rendering map to a screen
  /* ------------------------------------------------------------------------------------------- */
  renderMapToScreen(){

    mapboxgl.accessToken = config.REACT_APP_MAPS_KEY;
    map = new mapboxgl.Map({
        container: document.getElementById('mapbox-container'),
        style: 'mapbox://styles/mapbox/streets-v9',
        center: ['-122.3301', '47.6038'],
        zoom: 13,
        hash: true 
    });
  }

  componentDidMount(){

    // We have a long/lat 
    // as a this.props.coordinates
    // Creating and rendering a mapbox
    this.renderMapToScreen();
  }

  render() {

    
    return (
      <div></div>
    );
  }
}

export default Map;
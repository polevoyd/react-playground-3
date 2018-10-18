import { config } from '../config';
import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../index.css';

/* ------------------------------------------------------------------------------------------- */
//             global variable to operate with a map
/* ------------------------------------------------------------------------------------------- */

let map;

class Map extends React.Component {

  /* ------------------------------------------------------------------------------------------- */
  //          Changing coordinates when new props arrive
  /* ------------------------------------------------------------------------------------------- */

  componentWillReceiveProps(nextProps){

    if (nextProps.coordinates !== this.props.coordinates) {

      map.setCenter(nextProps.coordinates)
    }  
  }

  /* ------------------------------------------------------------------------------------------- */
  //          Rendering map to a screen
  /* ------------------------------------------------------------------------------------------- */

  renderMapToScreen(){


  // mapbox://styles/mapbox/streets-v10
  // mapbox://styles/mapbox/outdoors-v10
  // mapbox://styles/mapbox/light-v9
  // mapbox://styles/mapbox/dark-v9
  // mapbox://styles/mapbox/satellite-v9
  // mapbox://styles/mapbox/satellite-streets-v10
  // mapbox://styles/mapbox/navigation-preview-day-v2
  // mapbox://styles/mapbox/navigation-preview-night-v2
  // mapbox://styles/mapbox/navigation-guidance-day-v2
  // mapbox://styles/mapbox/navigation-guidance-night-v2

    mapboxgl.accessToken = config.REACT_APP_MAPS_KEY;
    map = new mapboxgl.Map({
        container: document.getElementById('mapbox-container'),
        style: 'mapbox://styles/mapbox/streets-v9',
        center: ['-122.3301', '47.6038'],
        zoom: 13,
        hash: true 
    })
  }

  /* ------------------------------------------------------------------------------------------- */
  //          Render map to screen after componen is mounted 
  /* ------------------------------------------------------------------------------------------- */

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
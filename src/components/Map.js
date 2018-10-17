import { config } from '../config';
import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../index.css';


class Map extends React.Component {

  
  componentDidMount(){


   
    // We have a name of place and  long/lat of it
    // as a this.props.placeToSearch nd this.props.locationLngLat

    

        
    // Creating and rendering a mapbox
    mapboxgl.accessToken = config.REACT_APP_MAPS_KEY;
    const map = new mapboxgl.Map({
        container: document.getElementById('mapbox-container'),
        style: 'mapbox://styles/mapbox/streets-v9',
        center: ['-50', '50'],
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
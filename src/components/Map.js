import { config } from '../config';
import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../index.css';

/* ------------------------------------------------------------------------------------------- */
//             global variable to operate with a map
/* ------------------------------------------------------------------------------------------- */

let map;
let arrayOfMarkers;

class Map extends React.Component {

  /* ------------------------------------------------------------------------------------------- */
  //          Changing coordinates when new props arrive
  /* ------------------------------------------------------------------------------------------- */

  componentWillReceiveProps(nextProps){

    // Setting a new map center after user submit a new location
    if (nextProps.coordinates !== this.props.coordinates) {

      // Setting map center if it changed
      map.setCenter(nextProps.coordinates)


      // Need delay to make sure we have something to render
      setTimeout(() => {
        
        // Creating and add pins to map
        this.createPins(this.props.tweets);
      }, 3000);
    }
  }

  /* ------------------------------------------------------------------------------------------- */
  //          Creating pins from a tweets array
  /* ------------------------------------------------------------------------------------------- */


  createPins(arrayOfTweets) {

    
    // console.log(arrayOfTweets)

    // let marker = new mapboxgl.Marker()
    //   .setLngLat([30.5, 50.5])
    //   .addTo(map);
    
    arrayOfMarkers = arrayOfTweets
      .map((element, index) => {

        
        return new mapboxgl.Marker()
          .setLngLat(element.point)
          .addTo(map);
      })
  }

  
  /* ------------------------------------------------------------------------------------------- */
  //          Rendering map to a screen
  /* ------------------------------------------------------------------------------------------- */

  renderMapToScreen(){

  // mapbox://styles/mapbox/dark-v9
 

    mapboxgl.accessToken = config.REACT_APP_MAPS_KEY;
    map = new mapboxgl.Map({
        container: document.getElementById('mapbox-container'),
        style: 'mapbox://styles/mapbox/navigation-guidance-night-v2',
        center: ['-122.3301', '47.6038'],
        zoom: 13,
        hash: true 
    })

    // Listener to change state depending on a map center
    map.on('mouseup', this.props.handleCenterChange);

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
import { config } from '../config';
import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

import '../index.css';


/* ------------------------------------------------------------------------------------------- */
//             global variable to operate with a map
/* ------------------------------------------------------------------------------------------- */

let map;
let arrayOfMarkers = [];





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
        
      // Clear array of pins
      for(let element of arrayOfMarkers) {
        element.remove();
      }

        // Creating and add pins to map
        this.createPins(this.props.tweets);
      }, 3000);
    }
  }

  /* ------------------------------------------------------------------------------------------- */
  //          Creating pins from a tweets array
  /* ------------------------------------------------------------------------------------------- */


  createPins(arrayOfTweets) {

    arrayOfMarkers = arrayOfTweets
      .map((element, index) => {

        console.log(element)

        // create a HTML element for each feature
        const markerHTML = document.createElement('div');
        markerHTML.className = 'marker';

        const popup = new mapboxgl.Popup({ 
          offset: 10, 
          closeButton: false, 
          className: 'popup'
        })
        
        const popupHTMLContent = `<img className="popup-pic" src="${element.img}"></img><p className="popup-text">${element.text}</p><h6 className="popup-author">@${element.user}</h6>`;

        popup.setHTML(popupHTMLContent);

        //----------------------------------------------------------------------------------------------

      //   map.on('mouseenter', function(e) {
         
      //     map.getCanvas().style.cursor = 'pointer';
  
      //     var coordinates = e.features[0].geometry.coordinates.slice();
      //     var description = e.features[0].properties.description;
  
      //     // Ensure that if the map is zoomed out such that multiple
      //     // copies of the feature are visible, the popup appears
      //     // over the copy being pointed to.
      //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      //     }
  
      //     // Populate the popup and set its coordinates
      //     // based on the feature found.
      //     popup.setLngLat(coordinates)
      //         .setHTML(description)
      //         .addTo(map);
      // });
  
      // map.on('mouseleave', function() {
      //     map.getCanvas().style.cursor = '';
      //     popup.remove();
      // });

      //-------------------------------------------------------------------------------------------------

        
        
        return new mapboxgl.Marker(markerHTML)
          .setLngLat(element.point)
          .setPopup(popup)
          .on('mouseover', function(event) {

            console.log(event)
          })
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
        style: 'mapbox://styles/mapbox/dark-v9',
        center: ['-122.3301', '47.6038'],
        zoom: 12,
        hash: false,
        minZoom: 11,
        maxZoom: 15,
        interactive: true
    })

    // Listener to change state depending on a map center
    // Map starting to lag on with a listener - so turning it off
    // map.on('mouseup', this.props.handleCenterChange);

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
import { config } from '../config';
import React from 'react';
import mapboxgl from 'mapbox-gl';
import {connect} from 'react-redux';
import '../index.css';
import { stat } from 'fs';


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
    if (nextProps.state.locationLngLat !== this.props.state.locationLngLat) {
      // Setting map center if it changed
      map.setCenter(nextProps.state.locationLngLat)
    }

    if ((nextProps.state.tweets) && (nextProps.state.tweets !== this.props.state.tweets)) {
      // Clear array of pins
      for(let element of arrayOfMarkers)
        element.remove()

        this.createPins(nextProps.tweets);
    }
  }

  /* ------------------------------------------------------------------------------------------- */
  //          Creating pins from a tweets array
  /* ------------------------------------------------------------------------------------------- */

  createPins(arrayOfTweets) {

    arrayOfMarkers = arrayOfTweets
      // .filter(element => element.pic) // Take this line off to show without pictures as well
      .map((element, index) => {

        // create a DOM element for the marker
        var markerElement = document.createElement('div');
        markerElement.className = 'marker';
        // markerElement.style.backgroundImage = `url(${element.pic})`
        // markerElement.style.backgroundColor = this.generateRandomColor();

        // Creating a popup
        const popup = new mapboxgl.Popup({ 
          offset: 20, 
          closeButton: false, 
          className: 'popup'
        })
        
        // HTML Content for a popup
        const picture = element.pic ? element.pic : ``;
        const popupHTMLContent = `<img class="popup-pic" src="${picture}"></img><p class="popup-text">${element.text}</p><h5 class="popup-author">@${element.user}</h6>`;
        popup.setHTML(popupHTMLContent);

        // on mouseover - show popup
        markerElement.addEventListener('mouseover', () => popup.setLngLat(element.point).setHTML(popupHTMLContent).addTo(map));

        // on mouseout - remove popup
        markerElement.addEventListener('mouseout', () => popup.remove());
      
        // add marker to map
        return new mapboxgl.Marker(markerElement)
            .setLngLat(element.point)
            .setPopup(popup)
            .addTo(map);
      })
  }

  /* ------------------------------------------------------------------------------------------- */
  //          Generate random color
  /* ------------------------------------------------------------------------------------------- */

  generateRandomColor() {

    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
  }

  /* ------------------------------------------------------------------------------------------- */
  //          Rendering map to a screen
  /* ------------------------------------------------------------------------------------------- */

  renderMapToScreen(){

      mapboxgl.accessToken = config.REACT_APP_MAPS_KEY;
      map = new mapboxgl.Map({
          container: document.getElementById('mapbox-container'),
          style: 'mapbox://styles/mapbox/dark-v9',
          center: ['-118.2439', '34.0544'],
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

    // console.log(this.props.state.locationLngLat)

    // We have a long/lat 
    // as a this.props.coordinates
    // Creating and rendering a mapboxs
    this.renderMapToScreen();
    




    // setTimeout(() => {
    //   this.createPins(this.props.tweets);
    // }, 3000)
    
  }

  render() {
    return (
      <div></div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state : state }
}

export default connect(mapStateToProps)(Map);
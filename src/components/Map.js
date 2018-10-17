import { config } from '../config';
import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../index.css';


class Map extends React.Component {

  componentDidMount(){


   

    // // Location Lang, Lat
    // let locationCoordinates = [];

    // // Building request and based on response create a map
    // const linkToRequest = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.placeToSearch}.json?access_token=${config.REACT_APP_MAPS_KEY}`;
    
    // // Sending a request
    // fetch(linkToRequest)
    //   .then(results => results.json())
    //   .then((results) => {

    //     // For just take first and most relevant result
    //     // results.features - array of locations
        
    //     this.setState({
    //       location: results.features[0].place_name
    //     })
        
    //     console.log(results.features[0].center)
    //     // locationCoordinates = results.features[0].center;


    

        
    //   })



        // Creating and rendering a mapbox
        // mapboxgl.accessToken = config.REACT_APP_MAPS_KEY;
        // let map = new mapboxgl.Map({
        //     container: document.getElementById('mapbox-container'),
        //     style: 'mapbox://styles/mapbox/streets-v9',
        //     center: this.props.placeLngLat,
        //     zoom: 13,
        //     hash: true 
        // });











  }

  render() {

    
    return (
      <div></div>
    );
  }
}

export default Map;
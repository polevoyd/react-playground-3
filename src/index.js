import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from './Map'
import InfoWindow from './InfoWindow'

class App extends Component {
  constructor() {
    super();
    this.createInfoWindow = this.createInfoWindow.bind(this)
  }

  createInfoWindow(e, map) {
    const infoWindow = new window.google.maps.InfoWindow({
        content: '<div id="infoWindow" />',
        position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    })
    infoWindow.addListener('domready', e => {
      render(<InfoWindow />, document.getElementById('infoWindow'))
    })
    infoWindow.open(map)
  }

  
  render() {
    return (
        /*
        id={}
        options={
            center: {lat, lng},
            zoom: 5
        }
        */
      <Map
        id="myMap"
        options={{
          center: { lat: 41.0082, lng: 28.9784 },
          zoom: 8
        }}
        onMapLoad={map => {
          const marker = new window.google.maps.Marker({
            position: { lat: 41.0082, lng: 28.9784 },
            map: map,
            title: 'Hello Istanbul!'
          });
          marker.addListener('click', e => {
            this.createInfoWindow(e, map)
          })
        }}
      />
    );
  }
}

render(<App />, document.getElementById('root'));

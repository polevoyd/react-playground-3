
import './config'
import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import Map from './components/Map';
import './index.css';
import { config } from './config';
import MapContainer from './components/MapContainer';
import { div } from 'gl-matrix/src/gl-matrix/vec2';

class App extends React.Component {

  render() {

    

    return (
      <div>
        <MapContainer />
        <Map/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));





import React from 'react';
import '../index.css';
import Map from './Map';
import { div } from 'gl-matrix/src/gl-matrix/vec2';

class MapContainer extends React.Component {

    render() {
        return (
            <div id='mapbox-container'></div>
        )
    }
}

export default MapContainer;
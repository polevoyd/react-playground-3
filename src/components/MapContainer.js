import React from 'react';
import '../index.css';
import Map from './Map';

class MapContainer extends React.Component {

    render() {
        return (
            <div id='mapbox-container'>
                <Map locationLngLat={this.props.locationLngLat}/>
            </div>
        )
    }
}

export default MapContainer;
import React from 'react';
import '../index.css';
import Map from './Map';

class MapContainer extends React.Component {

    render() {
        return (
            <div id='mapbox-container'>
                <Map placeToSearch={this.props.placeToSearch} locationLngLat={this.props.locationLngLat}/>
            </div>
        )
    }
}

export default MapContainer;
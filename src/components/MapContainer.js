import React from 'react';
import '../index.css';
import Map from './Map';

class MapContainer extends React.Component {
    render() {
        return (
            <div id='mapbox-container'>
                <Map coordinates={this.props.coordinates} handleCenterChange={this.props.handleCenterChange} tweets={this.props.tweets}/>
            </div>
        )
    }
}

export default MapContainer;

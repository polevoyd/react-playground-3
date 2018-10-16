import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

import '../index.css';

class Map extends React.Component {


    render() {

        const GoogleMapExample = withGoogleMap(props => {
            <GoogleMap 
            defaultCenter = { { lat: 40.756795, lng: -73.954298 } } 
            defaultZoom = { 13 }
            >
            </GoogleMap>
        });

        return(
            <div className='map-div'>
            <GoogleMapExample 
                containterElement = { <div style={{ height: `500px`, width: '500px' }} /> } 
                mapElement = { <div style={{ height: `100%` }} /> }
            />
            </div>
        );
    }
};

export default Map;
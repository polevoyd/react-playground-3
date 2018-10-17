import React from 'react';
import '../index.css';

class LocationInput extends React.Component {


    render() {

        return(
            <form onSubmit={this.props.handleLocationChange} className="location-input">
                <label>
                    <input type="text" name="location" placeholder="Seattle"></input>
                </label>
                <button type="submit">Let's Travel!</button>
            </form>
        )
    }
}


export default LocationInput;
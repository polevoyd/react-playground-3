import React from 'react';
import '../index.css';

class LocationInput extends React.Component {

    render() {
        return(
            <form onSubmit={this.props.handleLocationSubmit} className="location-input">
                <label>
                    <input type="text" name="location" placeholder="Enter a city" value={this.props.locationToShow} onChange={this.props.handleLocationChange}></input>
                </label>
                <button type="submit">Find tweets</button>
            </form>
        )
    }
}

export default LocationInput;
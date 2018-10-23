import React from 'react';
import '../index.css';

class InfoTab extends React.Component {

    render() {
        
        return(
            <div className="info-tab">
            <h2>Tweeter Map</h2>
            <p>Simply put a city and explore local tweets!</p>
            <p className='made-by'><a href="http://www.polevoy.in">@www.polevoy.in</a></p>
            </div>
        );
    }
}

export default InfoTab;
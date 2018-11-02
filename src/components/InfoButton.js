import React from 'react';
import '../index.css';

class InfoButton extends React.Component {
    render(){
        return(
            <div className="info-icon" onClick={this.props.handleInfoButtonClick}>
            <h1>?</h1>
            </div>
        );
    }
}

export default InfoButton;
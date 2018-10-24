import React from 'react';
import '../index.css';

class InfoButton extends React.Component {

    render(){
        return(
            <div onClick={this.props.handleInfoButtonClick}>
            <h1 className="question-mark">?</h1>
            </div>
        );
    }
}

export default InfoButton;
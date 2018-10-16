import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { config } from './config.js';


class App extends React.Component
{

    render(){
        return (
            <div>{config.REACT_APP_GOOGLE_MAPS_KEY}</div>
        )
    }
}














// Starting point 
ReactDOM.render(<App />, document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom';

import Location from './components/Location.js';
import Map from './components/Map.js';


import './index.css';

import { config } from './config.js';


class App extends React.Component
{

    render(){
        return (
            <div>
                <Location />
                <Map />
            </div>
        )
    }
}














// Starting point 
ReactDOM.render(<App />, document.getElementById('root'));
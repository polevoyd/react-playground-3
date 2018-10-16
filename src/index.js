import React from 'react';
import ReactDOM from 'react-dom';

import Map from './components/Map.js';

import './index.css';

import { config } from './config.js';


class App extends React.Component
{

    render(){
        return (
            <Map />
        )
    }
}














// Starting point 
ReactDOM.render(<App />, document.getElementById('root'));
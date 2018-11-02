import React from 'react'
import ReactDOM from 'react-dom';
import './index.css'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers/rootReducer';
import App from './components/App'

const store = createStore(rootReducer);


ReactDOM.render(
<Provider>
  <App />
</Provider>
, document.getElementById('root'));
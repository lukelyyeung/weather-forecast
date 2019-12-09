import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import combineReducers from './reducers';
import { applyMiddleware } from '../../../Library/Caches/typescript/3.6/node_modules/redux';
import WeatherService from './service/WeatherService';

const weatherService = new WeatherService(process.env.REACT_APP_WEATHER_API_KEY);

const thunkDependencies = {
  weatherService,
};

const store = createStore(
  combineReducers,
  applyMiddleware(thunk.withExtraArgument(thunkDependencies))
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

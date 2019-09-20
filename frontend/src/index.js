import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './Redux/Store';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <App></App>
    </ BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

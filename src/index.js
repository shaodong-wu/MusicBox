import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './pages';

import { GlobalStyle } from "@/assets/css/reset";
import 'antd/dist/antd.css';

import store from './store';


ReactDOM.render(
  <Fragment>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </Fragment>,
  document.getElementById('root')
);
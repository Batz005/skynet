import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './app/App';
import CssBaseline from '@mui/material/CssBaseline';
import { NhostApolloProvider } from '@nhost/react-apollo';
import { NhostReactProvider } from '@nhost/react';

import nhost from './lib/nhost'


ReactDOM.render(
  <NhostReactProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        <Provider store = {store}>
          <CssBaseline />
          <App />
        </Provider>
      </NhostApolloProvider>
  </NhostReactProvider>,
  document.getElementById('root')
);



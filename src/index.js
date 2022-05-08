import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './app/App';
import CssBaseline from '@mui/material/CssBaseline';
import { NhostApolloProvider } from '@nhost/react-apollo';
import { NhostReactProvider } from '@nhost/react';
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

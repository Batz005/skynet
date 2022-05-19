import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './app/App';
import CssBaseline from '@mui/material/CssBaseline';
import { NhostApolloProvider } from '@nhost/react-apollo';
import { NhostReactProvider } from '@nhost/react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import nhost from './lib/nhost'
const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

ReactDOM.render(
  
      <NhostApolloProvider nhost={nhost}>
        <Provider store = {store}>
          <CssBaseline />
          <App />
        </Provider>
      </NhostApolloProvider>,
 
  document.getElementById('root')
);



import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './app/App';
import CssBaseline from '@mui/material/CssBaseline';
// import { NhostApolloProvider } from '@nhost/react-apollo';
import { NhostReactProvider } from '@nhost/react';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { useSelector } from 'react-redux';
// import { ApolloProvider } from "react-apollo";
import nhost from './lib/nhost'
// const client = new ApolloClient({
//   uri: 'https://skynet.hasura.app/v1/graphql',
//   cache: new InMemoryCache()
// });




ReactDOM.render(
  
      
        <Provider store = {store}>
          <CssBaseline />
          <App />
        </Provider>,
      
 
  document.getElementById('root')
);



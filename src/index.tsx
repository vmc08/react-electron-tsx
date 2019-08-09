import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import ClearCache from 'react-clear-cache';

import App from './App';
import 'antd/dist/antd.css';
import 'react-virtualized/styles.css';
import './stylesheets/bootstrap-utilities.css';
import './stylesheets/app.css';
import './stylesheets/react-virtualized.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
});

ReactDOM.render(
  <ClearCache auto>
    {() => (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    )}
  </ClearCache>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import { render, hydrate } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import App from './App';
import 'antd/dist/antd.css';
import 'react-virtualized/styles.css';
import './stylesheets/bootstrap-utilities.css';
import './stylesheets/app.css';
import './stylesheets/react-virtualized.css';

const rootElement: HTMLElement | null = document.getElementById('root');
const AppRenderer = (rootElement && rootElement.hasChildNodes()) ? hydrate : render;
const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
});

AppRenderer(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  rootElement,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

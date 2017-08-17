import Exponent from 'exponent';
import React, {Component} from 'react';
import Pokedex from './component/pokedex.js';
import {ApolloProvider} from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/ciztbabtgzo0i012781m0cbe4'}),
});

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  compose(
      applyMiddleware(client.middleware()),
      // If you are using the devToolsExtension, you can add it here also
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);

class App extends React.Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
      <Pokedex/>
      </ApolloProvider>
    );
  }
}

Exponent.registerRootComponent(App);

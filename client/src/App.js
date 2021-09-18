// provide data to all of the other components // will help initialize the connection to the GraphQL API server
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// enables the Apollo Client instance to cache API response // to control how the Apollo Client makes a request. 

import { setContext } from '@apollo/client/link/context';

import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// To establish the connection to the back-end server's /graphql endpoint
const httpLink = createHttpLink({
  // URI stands for "Uniform Resource Identifier."
  uri: '/graphql',
});

// THIS WILL CHANGE FROM LOGIN TO LOGOUT
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

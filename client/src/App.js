// provide data to all of the other components // will help initialize the connection to the GraphQL API server
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// enables the Apollo Client instance to cache API response // to control how the Apollo Client makes a request. 

import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// To establish the connection to the back-end server's /graphql endpoint
const httpLink = createHttpLink({
// URI stands for "Uniform Resource Identifier."
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
    <div className='flex-column justify-flex-start min-100-vh'>
      <Header />
      <div className='container'>
        <Home />
      </div>
      <Footer />
    </div>
    </ApolloProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
// Construct our main GraphQL API endpoint
// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

const client = new ApolloClient({
  // uri: 'http://localhost:3001/graphql'
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql'
});

// // Construct request middleware that will attach the JWT token to every request as an `authorization` header
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('id_token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// const client = new ApolloClient({
//   // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
          <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1>Wrong page!</h1>} />
          </Switch>
          </>
        </Router> 
    </ApolloProvider>

  );
}

export default App;
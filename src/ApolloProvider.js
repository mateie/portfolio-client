import React from 'react';
import App from './App';

import { ApolloClient, ApolloProvider, InMemoryCache, split } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new WebSocketLink({
    uri: 'wss://rocky-mountain-74108.herokuapp.com/subscriptions',
    options: {
        reconnect: false,
    }
});

const httpLink = createUploadLink({
    uri: 'https://rocky-mountain-74108.herokuapp.com/'
});

const authLink = setContext(() => {
    const token = localStorage.getItem('pToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink)
);

const cache = new InMemoryCache();

const client = new ApolloClient({
    link,
    cache,
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
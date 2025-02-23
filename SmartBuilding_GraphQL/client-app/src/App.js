import React from 'react';
import SmartBuildingApp from './SmartBuildingsApp.js';
import { ApolloProvider, useQuery, useMutation } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { RoomInfoComponent, AddRoomInfoComponent } from './SmartBuildings_gRPC.js';
import BuildingData from './SmartBuildings_REST.js';


const client = new ApolloClient({
  uri: 'http://localhost:5234/graphql', // Specify your GraphQL endpoint URL here
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <SmartBuildingApp />
      </ApolloProvider>
      <BuildingData/> 
    </div>
  );
}

export default App;

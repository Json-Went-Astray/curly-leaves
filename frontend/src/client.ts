import {
    ApolloLink,
    type Operation,
    type FetchResult,
    Observable,
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client/core";
  import { concat, split } from "@apollo/client/link/core";
  import { getOperationAST } from "graphql";
  import {
    DefaultApolloClient,
    provideApolloClient,
  } from "@vue/apollo-composable";
  import { createUploadLink } from "apollo-upload-client";
  import { createClient } from "graphql-ws";
  import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
  
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    return forward(operation);
  });
  
  const uri = `http://localhost:4000/graphql`;
  
  const wsLink = new GraphQLWsLink(
    createClient({
      url: `http://localhost:4000/graphql`,
      connectionParams: () => {
        const token = localStorage.getItem("token");
        return {
          token: `Bearer ${token}`,
        };
      },
    })
  );
  
  const httpLink = createUploadLink({
    uri,
  });
  
  const link = split(
    ({ query, operationName }) => {
      const definition = getOperationAST(query, operationName);
  
      return (
        definition?.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );
  
  const cache = new InMemoryCache();
  export const client = new ApolloClient({
    link: concat(authMiddleware, link),
    cache,
  });
  
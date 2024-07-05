import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import appConfig from "Lib/appConfig";

const httpLink = createHttpLink({
  uri: "https://pharmadev.x-studio.io/graphql",
  // uri: "https://bc42-45-64-221-200.ngrok-free.app/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(appConfig.storage.accessToken);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

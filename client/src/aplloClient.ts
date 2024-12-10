import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import appConfig from "Lib/appConfig";

const httpLink = createHttpLink({
  uri: appConfig.api.graphql, // Replace with your GraphQL endpoint
});
console.log('httpLink', httpLink);
const authLink = setContext((_, { headers }) => {
  const userData: any = localStorage.getItem("userData");
  const userDataObj = JSON.parse(userData);
  const token = userDataObj?.access_token;

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
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
    mutate: {
      fetchPolicy: 'network-only',
    },
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});
console.log('cleint.link', client.link);
export default client;

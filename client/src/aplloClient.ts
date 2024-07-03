import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_PHARMA_STOCK_API_URL, // Replace with your GraphQL endpoint
});

const authLink = setContext(async (_, { headers }) => {
  let userData: any = await localStorage.getItem("userData");
  if (userData) userData = JSON.parse(userData);
  return {
    headers: {
      ...headers,
      authorization: userData.access_token ? `Bearer ${userData.access_token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

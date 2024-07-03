import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_PHARMA_STOCK_API_URL, // Replace with your GraphQL endpoint
});

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
});

export default client;

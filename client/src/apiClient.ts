import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: import.meta.env.VITE_PHARMA_STOCK_API_URL,
    cache: new InMemoryCache(),
});
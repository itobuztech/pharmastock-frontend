import { cleanEnv, str } from "envalid";

export const appEnv = cleanEnv(import.meta.env, {
  GENERATE_SOURCEMAP: str({ default: "true" }),
});

const appConfig = {
  storage: {
    permission:"permission",
    user: "app_user",
    store: "app_store",
    accessToken: "access_token",
    userData: "userData",
    apiURL: 'api_url'
  },
  pagination: {
    defaultPage: 10
  },
  api: {
    graphql: localStorage.getItem('api_url') ? localStorage.getItem('api_url') : import.meta.env.VITE_PHARMA_STOCK_API_URL
  },
 dateFormat: "MM/dd/yyyy"
};
export default appConfig;

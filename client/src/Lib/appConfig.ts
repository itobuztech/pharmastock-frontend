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
    userData: "userData"
  },
  pagination: {
    defaultPage: 10
  }
};
export default appConfig;

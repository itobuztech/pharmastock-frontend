import { cleanEnv, str } from 'envalid'

export const appEnv = cleanEnv(import.meta.env, {
  GENERATE_SOURCEMAP: str({ default: 'true' }),
})

const appConfig  = {
  storage: {
    user: 'app_user',
    store: 'app_store',
  }
};
export default appConfig;

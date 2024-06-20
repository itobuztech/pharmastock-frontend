import { User } from "./Api/Fake/Users/users.interface";
import appConfig from "./appConfig";

export interface AppStore {
  user: User | null;
  privilege: any | null;
};

const defaultStore: AppStore = {
  user: null,
  privilege: null,
};

export const appStore = {
  get: () => {
    const data = localStorage.getItem(appConfig.storage.store);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.log(e);
        return defaultStore;
      }
    }
    return defaultStore;
  },

  set: (store: AppStore) => {
    localStorage.setItem(appConfig.storage.store, JSON.stringify(store));
  },
};
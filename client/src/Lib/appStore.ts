import { Permissions } from "interfaces/interfaces";
import { User } from "./Api/Fake/Users/users.interface";
import appConfig from "./appConfig";

export interface UserAppStore {
  currentUser : User | null;
  permission : Permissions | {} ;
}

const defaultUserStore: UserAppStore = {
  currentUser: null,
  permission: {}
};

export interface AppStore {
  user: UserAppStore;
  privilege: any | null;
};

const defaultStore: AppStore = {
  user: defaultUserStore,
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
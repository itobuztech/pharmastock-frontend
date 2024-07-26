import { createSlice } from "@reduxjs/toolkit";
import {
  ForgetPasswordPayload,
  LoginPayload,
  User,
} from "../../Api/Fake/Users/users.interface";
import { appStore } from "Lib/appStore";
import { Permissions } from "interfaces/interfaces";
import appConfig from "Lib/appConfig";

export interface ForgetPasswordState {
  loading: boolean;
  token: string | null;
}

export interface UserSliceState {
  currentUser: null | User;
  login: {
    loading: boolean;
  };
  forgetPassword: ForgetPasswordState;
  permission: Permissions; 
}

const store = appStore.get();

const initialState: UserSliceState = {
  currentUser: store.user,
  login: {
    loading: false,
  },
  forgetPassword: {
    loading: false,
    token: null,
  },
  permission: store.permission || {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }: { payload: LoginPayload }) => {
      state.login.loading = true;
      console.log("logging in", state.currentUser, payload);
    },
    forgetPassword: (
      state,
      { payload }: { payload: ForgetPasswordPayload }
    ) => {
      state.forgetPassword.loading = true;
      console.log("forget password initiate", payload);
    },
    updateForgetPassword: (
      state,
      { payload }: { payload: ForgetPasswordState }
    ) => {
      state.forgetPassword = payload;
      console.log("updateForgetPassword initiate", state, payload);
    },
    setUser: (state, { payload }: { payload: User }) => {
      state.currentUser = payload;
      state.login.loading = payload ? false : true;
      const store = appStore.get();

      if (payload) {
        store.user = payload;
        appStore.set(store);
      } else {
        store.user = null;
        appStore.set(store);
      }
    },
    setPermissions: (state, { payload }: { payload: Permissions }) => {
      state.permission = payload;
      const store = appStore.get();
      store.permission = payload;
      appStore.set(store);
    },
    logout: (state) => {
      state.currentUser = null;
      state.permission = {} as Permissions;
      localStorage.removeItem(appConfig.storage.permission);
      const store = appStore.get();
      store.user = null;
      store.permission = {};
      appStore.set(store);
    },
  },
});

// Action creators are generated for each case reducer function
export const userSliceActions = userSlice.actions;

export default userSlice.reducer;

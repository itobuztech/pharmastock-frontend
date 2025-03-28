import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { appStore } from "Lib/appStore";
import { Permissions } from "interfaces/interfaces";
import appConfig from "Lib/appConfig";
import {
  ForgetPasswordPayload,
  LoginPayload,
} from "Lib/Api/Fake/Users/users.interface";
import { UserRole } from "gql/graphql";

export interface UserData {
  createdAt: string;
  email: string;
  id: string;
  name: string;
  updatedAt: string;
  username: string;
  organization: {
    id: string;
    name: string;
  };
}

export interface ForgetPasswordState {
  loading: boolean;
  token: string | null;
}

export interface Role {
  role: UserRole | null;
}

export interface UserState {
  login: {
    loading: boolean;
  };
  forgetPassword: ForgetPasswordState;
  currentUser: null | UserData;
  permission: Permissions;
  role: null | UserRole;
}

const store = appStore.get();

const initialState: UserState = {
  login: {
    loading: false,
  },
  forgetPassword: {
    loading: false,
    token: null,
  },
  currentUser: store.user?.currentUser,
  permission: store.user?.permission,
  role: store.user?.role,
};

export const userSlice = createSlice({
  name: "newUser",
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
    setUser: (state, { payload }: { payload: UserData }) => {
      state.currentUser = payload;
      const store = appStore.get();
      store.user.currentUser = payload;
      appStore.set(store);
    },
    setPermission: (state, { payload }: { payload: Permissions }) => {
      state.permission = payload;
      const store = appStore.get();
      store.user.permission = payload;
      appStore.set(store);
    },
    setRole: (state, { payload }: { payload: UserRole }) => {
      state.role = payload;
      const store = appStore.get();
      store.user.role = payload;
      appStore.set(store);
    },
    logout: (state) => {
      state.currentUser = null;
      state.permission = {};
      state.role = null;
      const store = appStore.get();
      store.user.currentUser = null;
      store.user.permission = {};
      store.user.role = null;
      appStore.set(store);
      localStorage.removeItem(appConfig.storage.store);
      localStorage.removeItem(appConfig.storage.accessToken);
      // localStorage.removeItem("userData")
    },
  },
});

export const {
  setUser,
  setPermission,
  logout,
  login,
  setRole,
  forgetPassword,
  updateForgetPassword,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;

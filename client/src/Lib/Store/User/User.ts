import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { appStore } from "Lib/appStore";
import { Permissions } from "interfaces/interfaces";
import appConfig from "Lib/appConfig";

export interface UserData {
  createdAt: string;
  email: string;
  id: string;
  name: string;
  updatedAt: string;
  username: string;
}

export interface UserState {
  currentUser: null | UserData;
  permission: Permissions
}

const store = appStore.get();

const initialState: UserState = {
  currentUser: store.user,
  permission: store.permission || {}
};

export const userSlice = createSlice({
  name: "newUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: UserData }) => {
      state.currentUser = payload;
    },
    setPermission: (state, { payload }: { payload: Permissions }) => { 
      state.permission = payload;
      const store = appStore.get();
      store.permission = payload;
      appStore.set(store);
      localStorage.setItem(appConfig.storage.permission, JSON.stringify(payload)); 
    },
  },
});

export const { setUser,setPermission } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;

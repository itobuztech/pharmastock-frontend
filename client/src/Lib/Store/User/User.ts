import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { appStore } from "Lib/appStore";

export interface UserData {
  createdAt: string;
  email: string;
  id: string;
  name: string;
  updatedAt: string;
  username: string;
}

// Define a type for the slice state
export interface UserState {
  currentUser: null | UserData;
}

const store = appStore.get();

// Define the initial state using that type
const initialState: UserState = {
  currentUser: store.user,
};

export const userSlice = createSlice({
  name: "newUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: UserData }) => {
      state.currentUser = payload;
    },
  },
});

export const { setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { appStore } from "Lib/appStore";
import { Permissions } from "interfaces/interfaces";

export interface PermissionsState {
  permissions: Permissions;  
  loading: boolean;
  error: string | null;
}

const store = appStore.get();

const initialState: PermissionsState = {
  permissions: {},
  loading: false,
  error: null,
};

export const userPermissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    
    setPermission: (state, { payload }: { payload: Permissions }) => {
      state.permissions = payload
      state.loading = payload ? false : true;
      const store = appStore.get();

      if (payload) {
        store.permission = payload;
        appStore.set(store);
      } else {
        state.permissions = {};
        store.permission = null;
        appStore.set(store);
      }
    },
   
  },
});

// Action creators are generated for each case reducer function
export const userPermissionActions = userPermissionSlice.actions;

export default userPermissionSlice.reducer;


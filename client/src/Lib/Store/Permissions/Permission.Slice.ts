// // permissionsReducer.ts
// import { Permissions } from 'interfaces/interfaces';
// import { FETCH_PERMISSIONS_SUCCESS, FETCH_PERMISSIONS_ERROR, PermissionsActionTypes } from './Permission';
// import { appStore } from 'Lib/appStore';

// interface PermissionsState {
//   permissions: Permissions;  
//   loading: boolean;
//   error: string | null;
// }

// const store = appStore.get();

// const initialState: PermissionsState = {
//   permissions: store.permission,
//   loading: false,
//   error: null,
// };

// const permissionsReducer = (state = initialState, action: PermissionsActionTypes): PermissionsState => {
//   switch (action.type) {
//     case FETCH_PERMISSIONS_SUCCESS:
//       return {
//         ...state,
//         permissions: action.payload,
//         loading: false,
//       };
//     case FETCH_PERMISSIONS_ERROR:
//       return {
//         ...state,
//         error: action.payload,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// };

// export default permissionsReducer;

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
  permissions: store.permission,
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
        store.permission = null;
        appStore.set(store);
      }
    },
   
  },
});

// Action creators are generated for each case reducer function
export const userPermissionActions = userPermissionSlice.actions;

export default userPermissionSlice.reducer;


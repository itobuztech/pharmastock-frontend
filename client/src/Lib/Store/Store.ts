import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import counterReducer from "./Counter/Counter";
import rootSaga from "./rootsaga";
import userReducer from "./User/User";
import helperSlice from "./Helper/Helper.Slice";
import permissionsReducer from './Permissions/Permission.Slice';
import { watchFetchPermissions } from './Permissions/Permission.Saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// const appStateStore = localStorage.getItem('app_state');
const appState: any = {};
// if (appStateStore) {
//   // appState = JSON.parse(appStateStore);
// }

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    helper: helperSlice,
    permissions: permissionsReducer,
  },
  preloadedState: appState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);
sagaMiddleware.run(watchFetchPermissions);

function handleChange() {
  // const state = store.getState();
  // console.log('app state', state);
  // localStorage.setItem('app_state', JSON.stringify(state));
}

store.subscribe(handleChange);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

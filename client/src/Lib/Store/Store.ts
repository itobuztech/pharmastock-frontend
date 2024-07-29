import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import counterReducer from "./Counter/Counter";
import rootSaga from "./rootsaga";
import userReducer from "./User/User.Slice";
import helperSlice from "./Helper/Helper.Slice";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const appState: any = {};

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    helper: helperSlice,
  },
  preloadedState: appState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);

function handleChange() {
  // Handle state change for local storage or other side effects
}

store.subscribe(handleChange);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

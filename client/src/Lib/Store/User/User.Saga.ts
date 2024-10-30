import { fork, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

import routes from "../../Routes/Routes";
import { helperSliceActions } from "../Helper/Helper.Slice";
import { login, logout } from "./User.Slice";

function* loginMiddleWare(): any {
  try {
    yield put(
      helperSliceActions.setRedirectUrl(routes.dashboard.profile.fullPath)
    );
    toast.success("Login successful");
  } catch (e) {
    console.error("Error during login:", e);
    toast.error("Login failed");
  }
}

function* loginSaga() {
  yield takeEvery(login, loginMiddleWare);
}

function* logOutMiddleWare() {
  try {
    yield put(helperSliceActions.setRedirectUrl(routes.login.path));
  } catch (e) {
    console.error("Error during logout:", e);
  }
}

function* logOutSaga() {
  yield takeEvery(logout as any, logOutMiddleWare);
}

export default function* userSaga() {
  yield fork(loginSaga);
  yield fork(logOutSaga);
}

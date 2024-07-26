import { fork, put, takeEvery, call } from 'redux-saga/effects';
import { userApi } from '../../Api/Fake';
import { ForgetPasswordPayload, LoginPayload } from '../../Api/Fake/Users/users.interface';
import routes from '../../Routes/Routes';
import { helperSliceActions } from '../Helper/Helper.Slice';
import { userSliceActions } from './User.Slice';
import { toast } from 'react-toastify';
import client from 'aplloClient';
import { GetPermission } from 'query/getPermission';
import { Permissions } from 'interfaces/interfaces';
import { appStore } from 'Lib/appStore';
import appConfig from 'Lib/appConfig';

function* loginMiddleWare({ payload }: { payload: LoginPayload }): any {
  try {
    const { user } = yield call(userApi.getCurrentUser);
    yield console.log(user, payload);

    const { data }: { data: { getpermissions: Permissions } } = yield call([client, 'query'], {
      query: GetPermission,
    });

    yield put(userSliceActions.setUser(user));
    yield put(userSliceActions.setPermissions(data.getpermissions));
    
    // Set redirect URL
    yield put(helperSliceActions.setRedirectUrl(routes.dashboard.profile.fullPath));
    
    // Show success message
    toast.success('Login successful');
    console.log('Login successful, permissions set');
  } catch (e) {
    console.error('Error during login:', e);
    // Optionally handle login failure, show error messages, etc.
  }
}

function* loginSaga() {
  yield takeEvery(userSliceActions.login , loginMiddleWare);
}

function* forgetPasswordMiddleWare({ payload }: { payload: ForgetPasswordPayload }) {
  console.log('forgetPasswordMiddleWare payload', payload);
  const { token } = yield call(userApi.forgetPassword);
  yield console.log({ token });
  yield put(userSliceActions.updateForgetPassword({ token, loading: false }));
}

function* forgetPasswordSaga() {
  yield takeEvery(userSliceActions.forgetPassword as any, forgetPasswordMiddleWare);
}

function* logOutMiddleWare() {
  try {
    yield put(userSliceActions.setPermissions({}));
    yield put(helperSliceActions.setRedirectUrl(routes.login.path));
    
    localStorage.removeItem(appConfig.storage.permission);
    
    const store = appStore.get();
    store.user = null;
    store.permission = {};
    appStore.set(store);
  } catch (e) {
    console.error('Error during logout:', e);
  }
}

function* logOutSaga() {
  yield takeEvery(userSliceActions.logout as any, logOutMiddleWare);
}

export default function* userSaga() {
  yield fork(loginSaga);
  yield fork(forgetPasswordSaga);
  yield fork(logOutSaga);
}

import { fork, put, takeEvery, call } from 'redux-saga/effects';
import { userApi } from '../../Api/Fake';
import { ForgetPasswordPayload, LoginPayload } from '../../Api/Fake/Users/users.interface';
import routes from '../../Routes/Routes';
import { helperSliceActions } from '../Helper/Helper.Slice';
import { toast } from 'react-toastify';
import client from 'aplloClient';
import { GetPermission } from 'query/getPermission';
import { Permissions } from 'interfaces/interfaces';
import { forgetPassword, login, logout, setPermission, setUser, updateForgetPassword } from './User.Slice';

function* loginMiddleWare({ payload }: { payload: LoginPayload }): any {
  try {
    const { user } = yield call(userApi.getCurrentUser);
    console.log('User data:', user, payload);

    const { data }: { data: { getPermissions: Permissions } } = yield call([client, 'query'], {
      query: GetPermission,
    });

    yield put(setUser(user));
    yield put(setPermission(data.getPermissions));
    yield put(helperSliceActions.setRedirectUrl(routes.dashboard.profile.fullPath));
    
    toast.success('Login successful');
  } catch (e) {
    console.error('Error during login:', e);
    toast.error('Login failed');
  }
}

function* loginSaga() {
  yield takeEvery(login, loginMiddleWare);
}

function* forgetPasswordMiddleWare({ payload }: { payload: ForgetPasswordPayload }) {
  console.log('forgetPasswordMiddleWare payload', payload);
  const { token } = yield call(userApi.forgetPassword);
  yield console.log({ token });
  yield put(updateForgetPassword({ token, loading: false }));
}

function* forgetPasswordSaga() {
  yield takeEvery(forgetPassword as any, forgetPasswordMiddleWare);
}

function* logOutMiddleWare() {
  try {
    yield put(helperSliceActions.setRedirectUrl(routes.login.path));
  } catch (e) {
    console.error('Error during logout:', e);
  }
}

function* logOutSaga() {
  yield takeEvery(logout as any, logOutMiddleWare);
}

export default function* userSaga() {
  yield fork(loginSaga);
  yield fork(forgetPasswordSaga);
  yield fork(logOutSaga);
}

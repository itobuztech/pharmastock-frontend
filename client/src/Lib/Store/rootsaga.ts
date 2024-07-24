import { all,fork } from 'redux-saga/effects';
import userSaga from './User/User.Saga';
import { watchFetchPermissions } from './Permissions/Permission.Saga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    fork(watchFetchPermissions),
  ]);
}

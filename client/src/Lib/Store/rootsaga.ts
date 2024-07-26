import { all } from 'redux-saga/effects';
import userSaga from './User/User.Saga';

export default function* rootSaga() {
  yield all([
    userSaga(),
  ]);
}

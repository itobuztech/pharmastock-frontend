// permissionsSaga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { GetPermission } from 'query/getPermission';
import { toast } from 'react-toastify';
import client from 'aplloClient'; // Make sure this is the correct import
import { FETCH_PERMISSIONS_REQUEST, fetchPermissionsError, fetchPermissionsSuccess } from './Permission';
import { Permissions } from 'interfaces/interfaces';
import { userPermissionActions } from './Permission.Slice';

function* fetchPermissionsSaga() {
  try {
    const { data }: { data: { getpermissions: Permissions } } = yield call([client, 'query'], {
      query: GetPermission,
    });

    const permissions = data.getpermissions;
    yield put(userPermissionActions.setPermission(permissions))
    yield put(fetchPermissionsSuccess(permissions));
  } catch (error: any) {
    console.error('Error fetching permissions:', error);
    toast.error(error.message);
    yield put(fetchPermissionsError(error.message));
  }
}

export function* watchFetchPermissions() {
  yield takeEvery(FETCH_PERMISSIONS_REQUEST, fetchPermissionsSaga);
}

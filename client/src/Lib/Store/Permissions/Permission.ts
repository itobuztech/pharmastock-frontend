import { Permissions } from "interfaces/interfaces";

export const FETCH_PERMISSIONS_SUCCESS = 'FETCH_PERMISSIONS_SUCCESS';
export const FETCH_PERMISSIONS_ERROR = 'FETCH_PERMISSIONS_ERROR';
export const FETCH_PERMISSIONS_REQUEST = 'FETCH_PERMISSIONS_REQUEST';

export interface FetchPermissionsRequestAction {
  type: typeof FETCH_PERMISSIONS_REQUEST;
}

export interface FetchPermissionsSuccessAction {
  type: typeof FETCH_PERMISSIONS_SUCCESS;
  payload: Permissions;
}

export interface FetchPermissionsErrorAction {
  type: typeof FETCH_PERMISSIONS_ERROR;
  payload: string;
}

export type PermissionsActionTypes = 
  | FetchPermissionsRequestAction 
  | FetchPermissionsSuccessAction 
  | FetchPermissionsErrorAction;

export const fetchPermissionsRequest = (): FetchPermissionsRequestAction => ({
  type: FETCH_PERMISSIONS_REQUEST,
});

export const fetchPermissionsSuccess = (permissions: Permissions): FetchPermissionsSuccessAction => ({
  type: FETCH_PERMISSIONS_SUCCESS,
  payload: permissions,
});

export const fetchPermissionsError = (error: string): FetchPermissionsErrorAction => ({
  type: FETCH_PERMISSIONS_ERROR,
  payload: error,
});

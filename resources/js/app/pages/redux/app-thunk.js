import { get_user_service, get_users_service, update_user_service } from '../services/user-service';
import { appSlice } from './app-slice';

export function addCartProducts(product_id) {
  return async function (dispatch, getState) {
    dispatch(appSlice.actions.incrementByAmount(10));

  };
}

export function get_user_thunk(app_id) {
  return async function (dispatch, getState) {
    const result = (await get_user_service())
    dispatch(appSlice.actions.setUser(result));
  };
}


export function get_users_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_users_service()).result
    console.log('waaa', result)
    dispatch(appSlice.actions.setUsers(result));
  };
}

export function update_user_thunk(data) {
  return async function (dispatch, getState) {
    const res = await update_user_service(data)
    // dispatch(departmentSlice.actions.setDepartments(result.data));
  };
}
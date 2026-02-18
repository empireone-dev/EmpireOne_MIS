import { get_user_service, get_users_service, update_user_service, change_password_service } from '../services/user-service';
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
    const res = (await get_users_service()).result
    console.log('waaa', res)
    dispatch(appSlice.actions.setUsers(res));
  };
}

export function update_user_thunk(data) {
  return async function (dispatch, getState) {
    const res = await update_user_service(data)
    // dispatch(departmentSlice.actions.setDepartments(result.data));
  };
}

export function change_password_thunk(data) {
  return async function (dispatch, getState) {
    try {
      const res = await change_password_service(data);
      return {
        success: true,
        message: res.message || 'Password updated successfully.',
        data: res
      };
    } catch (error) {
      console.error('Thunk error:', error);
      
      // Extract error information for better handling
      const errorData = {
        success: false,
        message: error.response?.data?.message || 'Failed to update password.',
        errors: error.response?.data?.errors || {},
        status: error.response?.status
      };
      
      // Re-throw the structured error so it can be handled in the component
      throw errorData;
    }
  };
}
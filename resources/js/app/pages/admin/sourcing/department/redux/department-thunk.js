import { create_department_service, get_department_service } from '@/app/pages/services/department-service';
import {departmentSlice} from './department-slice';

export function create_department_thunk(data) {
  return async function (dispatch, getState) {
    const res = await create_department_service(data)
  
  };
}


export function get_department_thunk() {
  return async function (dispatch, getState) {
    const res = await get_department_service()
    dispatch(departmentSlice.actions.setDepartments(res.data.result));
  };
}

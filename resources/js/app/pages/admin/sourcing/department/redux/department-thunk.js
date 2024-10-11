import { create_department_service, delete_department_service, get_department_service } from '@/app/pages/services/department-service';
import {departmentSlice} from './department-slice';
import { get_outsourcing_erf_by_id_service, get_outsourcing_erf_service, update_erf_ja_service, update_erf_jd_service } from '@/app/pages/services/erf-record-service';

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


export function delete_department_thunk(id) {
  return async function (dispatch, getState) {
    const res = await delete_department_service(id)
  };
}
export function get_outsourcing_erf_thunk(date) {
  return async function (dispatch, getState) {
    const res = await get_outsourcing_erf_service(date)
    dispatch(departmentSlice.actions.setErfCount(res.data));
  };
}

export function get_outsourcing_erf_by_id_thunk(data) {
  return async function (dispatch, getState) {
    const res = await get_outsourcing_erf_by_id_service(data)
    dispatch(departmentSlice.actions.setErf(res.data));
  };
}

export function update_erf_ja_thunk(data) {
  return async function (dispatch, getState) {
    const res = await update_erf_ja_service(data)
    // dispatch(departmentSlice.actions.setJa(res.data));
  };
}


export function update_erf_jd_thunk(data) {
  return async function (dispatch, getState) {
    const res = await update_erf_jd_service(data)
    // dispatch(departmentSlice.actions.setJa(res.data));
  };
}


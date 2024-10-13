import { create_outsourcing_erf_service, get_erf_record_service, update_outsourcing_erf_service } from '@/app/pages/services/erf-record-service';
import { erfRecordSlice } from './erf-record-slice';

export function get_erf_record_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_erf_record_service()).data
    console.log('result', result)
    dispatch(erfRecordSlice.actions.setErfRecords(result));
  };
}

export function create_outsourcing_erf_thunk(data) {
  return async function (dispatch, getState) {
    const result = await create_outsourcing_erf_service(data)
  };
}


export function update_outsourcing_erf_thunk(data) {
  return async function (dispatch, getState) {
    await update_outsourcing_erf_service(data)
  };
}
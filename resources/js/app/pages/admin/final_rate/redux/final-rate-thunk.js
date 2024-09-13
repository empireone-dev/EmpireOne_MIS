import { store_final_rate_service } from "@/app/pages/services/applicant-final-service";
import {finalRateSlice} from "./final-rate-slice";
import { get_applicant_by_app_id_service } from "@/app/pages/services/applicant-record-service";

export function get_applicant_by_app_id_thunk(app_id) {
  return async function (dispatch, getState) {
    const result = (await get_applicant_by_app_id_service(app_id))
    console.log('result',result.status)
     dispatch(finalRateSlice.actions.setApplicant(result.status));
  };
}


export function store_final_rate_thunk(data) {
  return async function (dispatch, getState) {
    const result = (await store_final_rate_service(data))
    //  dispatch(initialRateSlice.actions.setApplicant(result.status));
  };
}
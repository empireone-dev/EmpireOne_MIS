import { get_applicant_by_app_id_service } from "@/app/pages/services/applicant-record-service";
import { initialRateSlice } from "./initial-rate-state";
import { store_initial_rate_service } from "@/app/pages/services/applicant-initial-service";

export function get_applicant_by_app_id_thunk(app_id) {
  return async function (dispatch, getState) {
    const result = (await get_applicant_by_app_id_service(app_id))
     dispatch(initialRateSlice.actions.setApplicant(result.status));
  };
}


export function store_initial_rate_thunk(data) {
  return async function (dispatch, getState) {
    const result = (await store_initial_rate_service(data))
    //  dispatch(initialRateSlice.actions.setApplicant(result.status));
  };
}
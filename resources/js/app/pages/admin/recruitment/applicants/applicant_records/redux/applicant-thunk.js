import { get_applicant_service, store_applicant_service } from "@/app/pages/services/applicant-record-service";
import { applicantSlice } from "./applicant-slice";

export function get_applicant_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_applicant_service()).data
    dispatch(applicantSlice.actions.setApplicants(result));
  };
}

export function store_applicant_thunk(data) {
  return async function (dispatch, getState) {
    const result = await store_applicant_service(data)
    // dispatch(applicantSlice.actions.setApplicants(result.data));
    dispatch(applicantSlice.actions.setApplicantForm({
      work_experience:[]
    }));
  };
}
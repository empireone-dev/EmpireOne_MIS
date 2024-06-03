import { get_applicant_service } from "@/app/pages/services/applicant-record-service";
import { applicantSlice } from "./applicant-slice";

export function get_applicant_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_applicant_service()).data
    console.log('result',result)
    dispatch(applicantSlice.actions.setApplicants(result));
  };
}
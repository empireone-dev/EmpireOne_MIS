import { create_job_offer_service } from "@/app/pages/services/job-offer-service";
import { get_pre_employment_file_service } from "../../services/pre-employment-file-service";
import { preEmploymentFilesSlice } from "./pre-employment-files-slice";

export function get_pre_employment_file_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_pre_employment_file_service()).data
    console.log('result', result)
    dispatch(preEmploymentFilesSlice.actions.setPreEmploymentFiles(result));
  };
}

export function create_job_offer_thunk(data) {
  return async function (dispatch, getState) {
    const result = await create_job_offer_service(data)
    console.log('result', data)
    // console.log('result',result)
    // dispatch(jobOfferSlice.actions.setJobOffers(result));
  };
}

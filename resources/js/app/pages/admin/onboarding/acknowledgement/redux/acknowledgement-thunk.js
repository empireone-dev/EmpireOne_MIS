import { get_job_offer_service } from "@/app/pages/services/job-offer-service";
import { jobOfferSlice } from "./acknowledgement-slice";

export function get_job_offer_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_job_offer_service()).data
    console.log('result',result)
    dispatch(jobOfferSlice.actions.setJobOffers(result));
  };
}
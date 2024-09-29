import { create_job_offer_service, get_job_offer_service } from "@/app/pages/services/job-offer-service";
import { jobOfferSlice } from "./hiring-slice";
import { create_new_job_offer_service } from "@/app/pages/services/new-job-offer-service";

export function get_job_offer_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_job_offer_service()).data
    console.log('result',result)
    dispatch(jobOfferSlice.actions.setJobOffers(result));
  };
}

export function create_job_offer_thunk(data) {
  return async function (dispatch, getState) {
    const result = await create_job_offer_service(data)
    console.log('result',data)
    // console.log('result',result)
    // dispatch(jobOfferSlice.actions.setJobOffers(result));
  };
}


export function create_new_job_offer_thunk(data) {
  return async function (dispatch, getState) {
    const result = await create_new_job_offer_service(data)
    console.log('result',data)
    // console.log('result',result)
    // dispatch(jobOfferSlice.actions.setJobOffers(result));
  };
}
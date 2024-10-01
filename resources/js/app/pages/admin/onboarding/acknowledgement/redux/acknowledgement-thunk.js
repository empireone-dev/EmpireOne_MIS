import { get_job_offer_service } from "@/app/pages/services/job-offer-service";
import { jobOfferSlice } from "./acknowledgement-slice";
import { get_onboarding_doc_service } from "@/app/pages/services/onboading-doc-service";
import { onboardingDocuSlice } from "../../onboarding_docu/redux/onboarding-docu-slice";

export function get_job_offer_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_job_offer_service()).data
    console.log('result',result)
    dispatch(jobOfferSlice.actions.setJobOffers(result));
  };
}

export function get_on_boarding_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_onboarding_doc_service())
    dispatch(onboardingDocuSlice.actions.setOnboardingDocus(result.data));
    dispatch(onboardingDocuSlice.actions.setOd(result.od));
  };
}
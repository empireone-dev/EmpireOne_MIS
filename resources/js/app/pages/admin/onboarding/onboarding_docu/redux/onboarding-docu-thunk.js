import { get_onboarding_doc_service } from "@/app/pages/services/onboading-doc-service";
import { onboardingDocuSlice } from "./onboarding-docu-slice";

export function get_onboarding_docu_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_onboarding_doc_service()).data
    console.log('result',result)
    dispatch(onboardingDocuSlice.actions.setOnboardingDocus(result));
  };
}
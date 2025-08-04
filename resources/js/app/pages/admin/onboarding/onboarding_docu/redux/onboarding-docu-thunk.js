import { create_onboarding_doc_service, delete_onboarding_doc_service, get_onboarding_doc_by_id_service, get_onboarding_doc_service, update_onboarding_doc_service } from "@/app/pages/services/onboading-doc-service";
import { onboardingDocuSlice } from "./onboarding-docu-slice";

export function get_onboarding_docu_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_onboarding_doc_service()).data
    console.log('result', result)
    dispatch(onboardingDocuSlice.actions.setOnboardingDocus(result));
  };
}

export function create_onboarding_docu_thunk(data) {
  return async function (dispatch, getState) {
    const result = await create_onboarding_doc_service(data)
  };
}

export function get_onboarding_docu_by_id_thunk(id) {
  return async function (dispatch, getState) {
    const res = await get_onboarding_doc_by_id_service(id)
    dispatch(onboardingDocuSlice.actions.setOnboardingDoc(res));
  };
}

export function update_onboarding_doc_thunk(data) {
  return async function (dispatch, getState) {
    await update_onboarding_doc_service(data)
  };
}

export function delete_onboarding_doc_thunk(id) {
  return async function (dispatch, getState) {
    const res = await delete_onboarding_doc_service(id)
  };
}
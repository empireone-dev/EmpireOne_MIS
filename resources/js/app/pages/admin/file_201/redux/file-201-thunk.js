import { create_onboarding_ack_service, get_e_signature_by_app_id_service, get_onboarding_ackdoc_by_app_id_service, get_onboarding_ackdoc_by_id_service } from "@/app/pages/services/onboarding-ack-service";
import { onboardingAckDocSlice } from "./file-201-slice";

export function create_onboarding_ack_thunk(data) {
    return async function (dispatch, getState) {
        const result = await create_onboarding_ack_service(data)
        console.log('result', data)
    };
}

export function get_onboarding_ackdoc_by_id_thunk(app_id) {
    return async function (dispatch, getState) {
        const res = await get_onboarding_ackdoc_by_id_service(app_id)
        // Extract the data array from the response
        dispatch(onboardingAckDocSlice.actions.setOnboardingAckDoc(res.data));
        dispatch(onboardingAckDocSlice.actions.setJobOffer(res.job_offer));
    };
}

export function get_onboarding_ackdoc_by_app_id_thunk(app_id) {
    return async function (dispatch, getState) {
        const res = await get_onboarding_ackdoc_by_app_id_service(app_id)
        // Extract the data array from the response
        dispatch(onboardingAckDocSlice.actions.setOnboardingAckDoc(res.data));
        dispatch(onboardingAckDocSlice.actions.setJobOffer(res.job_offer));
        dispatch(onboardingAckDocSlice.actions.setSignature(res.signature));
    };
}

export function get_e_signature_by_app_id_thunk(app_id) {
    return async function (dispatch, getState) {
        const res = await get_e_signature_by_app_id_service(app_id)
        // Extract the data array from the response
        dispatch(onboardingAckDocSlice.actions.setOnboardingAckDoc(res.data));
        dispatch(onboardingAckDocSlice.actions.setJobOffer(res.job_offer));
    };
}
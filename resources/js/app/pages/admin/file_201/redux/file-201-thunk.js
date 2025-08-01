import { create_onboarding_ack_service, get_onboarding_ackdoc_by_id_service } from "@/app/pages/services/onboarding-ack-service";
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
    };
}
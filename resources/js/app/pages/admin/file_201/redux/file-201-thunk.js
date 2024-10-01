import { create_onboarding_ack_service } from "@/app/pages/services/onboarding-ack-service";

export function create_onboarding_ack_thunk(data) {
    return async function (dispatch, getState) {
        const result = await create_onboarding_ack_service(data)
        console.log('result', data)
    };
}
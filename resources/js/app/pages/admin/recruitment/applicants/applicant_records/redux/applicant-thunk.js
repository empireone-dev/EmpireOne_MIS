import {
    declined_attendance_service,
    delete_applicant_service,
    get_applicant_service,
    get_interview_applicant_service,
    phone_call_status_service,
    proceed_final_immediate_service,
    proceed_final_phase_service,
    proceed_initial_immediate_service,
    store_applicant_service,
    update_applicant_after_confirmation_status_service,
    update_applicant_service,
    update_applicant_status_service,
} from "@/app/pages/services/applicant-record-service";
import { applicantSlice } from "./applicant-slice";
import sendiv_email_service, {
    send_rejection_email_service,
    sendiv_contract_email_service,
} from "@/app/pages/services/email-service";
import {
    final_declined_attendance_service,
    final_update_applicant_after_confirmation_status_service,
} from "@/app/pages/services/applicant-final-service";
import { ai_interview_service, get_guide_questions_for_ai_service } from "@/app/pages/services/open-ai-service";

export function get_applicant_thunk() {
    return async function (dispatch, getState) {
        const result = await get_applicant_service();
        dispatch(applicantSlice.actions.setApplicants(result.data));
        dispatch(applicantSlice.actions.setInterviewer(result.interviewer));
    };
}

export function store_applicant_thunk(fd) {
    return async function (dispatch, getState) {
        const result = await store_applicant_service(fd);
        return result;
    };
}

export function sendiv_email_thunk(data) {
    return async function (dispatch, getState) {
        const result = await sendiv_email_service(data);
        // dispatch(applicantSlice.actions.setApplicants(result.data));
        // dispatch(applicantSlice.actions.setApplicantForm({
        //   work_experience:[]
        // }));
    };
}

export function sendiv_contract_email_thunk(data) {
    return async function (dispatch, getState) {
        const result = await sendiv_contract_email_service(data);
        // dispatch(applicantSlice.actions.setApplicants(result.data));
        // dispatch(applicantSlice.actions.setApplicantForm({
        //   work_experience:[]
        // }));
    };
}

export function update_applicant_thunk(data) {
    return async function (dispatch, getState) {
        const res = await update_applicant_service(data);
        // dispatch(departmentSlice.actions.setDepartments(result.data));
    };
}

export function update_applicant_status_thunk(data) {
    return async function (dispatch, getState) {
        const res = await update_applicant_status_service(data);
        // dispatch(departmentSlice.actions.setDepartments(result.data));
    };
}

export function update_applicant_after_confirmation_status_thunk(data) {
    return async function (dispatch, getState) {
        const res = await update_applicant_after_confirmation_status_service(
            data
        );
        // dispatch(departmentSlice.actions.setDepartments(result.data));
    };
}

export function declined_attendance_thunk(data) {
    return async function (dispatch, getState) {
        const res = await declined_attendance_service(data);
        // dispatch(departmentSlice.actions.setDepartments(result.data));
    };
}

export function final_update_applicant_after_confirmation_status_thunk(data) {
    return async function (dispatch, getState) {
        const res =
            await final_update_applicant_after_confirmation_status_service(
                data
            );
        // dispatch(departmentSlice.actions.setDepartments(result.data));
    };
}

export function final_declined_attendance_thunk(data) {
    return async function (dispatch, getState) {
        const res = await final_declined_attendance_service(data);
        // dispatch(departmentSlice.actions.setDepartments(result.data));
    };
}

export function send_rejection_email_thunk(data) {
    return async function (dispatch, getState) {
        const result = await send_rejection_email_service(data);
    };
}

export function get_interview_confirmation_thunk() {
    return async function (dispatch, getState) {
        const result = await get_interview_applicant_service();
        dispatch(applicantSlice.actions.setInterviewApplications(result.data));
    };
}

export function proceed_initial_immediate_thunk(data) {
    return async function (dispatch, getState) {
        const res = await proceed_initial_immediate_service(data);
    };
}

export function proceed_final_immediate_thunk(data) {
    return async function (dispatch, getState) {
        const res = await proceed_final_immediate_service(data);
    };
}

export function proceed_final_phase_thunk(data) {
    return async function (dispatch, getState) {
        const res = await proceed_final_phase_service(data);
    };
}

export function phone_call_status_thunk(data) {
    return async function (dispatch, getState) {
        const res = await phone_call_status_service(data);
    };
}

export function delete_applicant_thunk(id) {
    return async function (dispatch, getState) {
        const res = await delete_applicant_service(id);
    };
}

export function ai_interview_thunk(data) {
    return async function (dispatch, getState) {
        const res = await ai_interview_service(data);
        return res;
    };
}

export function get_guide_questions_for_ai_thunk() {
    return async function (dispatch, getState) {
        const res = await get_guide_questions_for_ai_service();
        return res;
    };
}

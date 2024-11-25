import { get_applicant_service, store_applicant_service, update_applicant_service, update_applicant_status_service } from "@/app/pages/services/applicant-record-service";
import { applicantSlice } from "./applicant-slice";
import sendiv_email_service, { sendiv_contract_email_service } from "@/app/pages/services/email-service";

export function get_applicant_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_applicant_service())
    dispatch(applicantSlice.actions.setApplicants(result.data));
    dispatch(applicantSlice.actions.setInterviewer(result.interviewer));
  };
}

export function store_applicant_thunk(fd) {
  return async function (dispatch, getState) {
    const result = await store_applicant_service(fd)
    if (result.status == 200) {
      dispatch(applicantSlice.actions.setApplicantForm({
        work_experience: []
      }));
    }
    return result
  };
}

export function sendiv_email_thunk(data) {
  return async function (dispatch, getState) {
    const result = await sendiv_email_service(data)
    // dispatch(applicantSlice.actions.setApplicants(result.data));
    // dispatch(applicantSlice.actions.setApplicantForm({
    //   work_experience:[]
    // }));
  };
}

export function sendiv_contract_email_thunk(data) {
  return async function (dispatch, getState) {
    const result = await sendiv_contract_email_service(data)
    // dispatch(applicantSlice.actions.setApplicants(result.data));
    // dispatch(applicantSlice.actions.setApplicantForm({
    //   work_experience:[]
    // }));
  };
}

export function update_applicant_thunk(data) {
  return async function (dispatch, getState) {
    const res = await update_applicant_service(data)
    // dispatch(departmentSlice.actions.setDepartments(result.data));
  };
}

export function update_applicant_status_thunk(data) {
  return async function (dispatch, getState) {
    const res = await update_applicant_status_service(data)
    // dispatch(departmentSlice.actions.setDepartments(result.data));
  };
}


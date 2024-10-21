import { get_employee_by_id_service, get_employee_service, store_employee_service } from "@/app/pages/services/employee-service";
import { employeeSlice } from "./employee-section-slice";
import { create_employee_service, get_hired_applicant_service } from "@/app/pages/services/applicant-final-service";
import { applicantSlice } from "../../../recruitment/applicants/applicant_records/redux/applicant-slice";

export function get_employee_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_employee_service()).data
    dispatch(employeeSlice.actions.setEmployees(result));
  };
}

export function get_employee_by_id_thunk(id) {
  return async function (dispatch, getState) {
    const result = (await get_employee_by_id_service(id)).data
    console.log('resultresult', result)
    dispatch(employeeSlice.actions.setEmployee(result));
  };
}


export function get_hired_applicant_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_hired_applicant_service()).data
    console.log('sss', result)
    dispatch(employeeSlice.actions.setHiredApplicants(result));
  };
}

export function create_employee_thunk(data) {
  return async function (dispatch, getState) {
    const result = (await create_employee_service(data))
  };
}

export function store_employee_thunk(fd) {
  return async function (dispatch, getState) {
    const result = await store_employee_service(fd)
    dispatch(applicantSlice.actions.setApplicantForm({
      work_experience: []
    }));
  };
}



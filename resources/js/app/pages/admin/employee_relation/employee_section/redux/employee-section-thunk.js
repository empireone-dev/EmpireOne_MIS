import { get_employee_service } from "@/app/pages/services/employee-service";
import { employeeSlice } from "./employee-section-slice";

export function get_employee_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_employee_service()).data
    console.log('result',result)
    dispatch(employeeSlice.actions.setEmployees(result));
  };
}
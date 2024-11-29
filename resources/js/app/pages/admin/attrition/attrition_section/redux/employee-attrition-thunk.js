import { get_employee_attrition_service } from "@/app/pages/services/employee-attrition-service";
import { employeeAttritionSlice } from "./employee-attrition-slice";
import { store_attrition_service } from "@/app/pages/services/attrition-service";

export function get_employee_attrition_thunk() {
    return async function (dispatch, getState) {
        const result = (await get_employee_attrition_service()).data
        console.log('result', result)
        dispatch(employeeAttritionSlice.actions.setEmployeeAttritions(result));
    };
}

export function store_attrition_thunk(data) {
    return async function (dispatch, getState) {
        const result = (await store_attrition_service(data))
        return result
    };
}
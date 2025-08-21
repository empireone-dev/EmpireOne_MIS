import { get_employee_attrition_by_emp_id_service, get_employee_attrition_service, send_quit_claim_service, upload_exit_clearance_service, upload_quit_claim_service } from "@/app/pages/services/employee-attrition-service";
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

export function upload_exit_clearance_thunk(data) {
    return async function (dispatch, getState) {
        const result = (await upload_exit_clearance_service(data))
        return result
    };
}

export function send_quit_claim_thunk(data) {
    return async function (dispatch, getState) {
        const result = (await send_quit_claim_service(data))
        return result
    };
}

export function get_employee_attrition_by_emp_id_thunk(emp_id) {
    return async function (dispatch) {
        try {
            const result = await get_employee_attrition_by_emp_id_service(emp_id);
            console.log('Employee attrition by emp_id:', result);
            // Set as an array with single item so existing components work
            dispatch(employeeAttritionSlice.actions.setEmployeeAttritions(result.data ? [result.data] : []));
        } catch (error) {
            console.error("Error fetching employee attrition:", error);
            dispatch(employeeAttritionSlice.actions.setEmployeeAttritions([]));
        }
    };
}

export function upload_quit_claim_thunk(data) {
    return async function (dispatch, getState) {
        const result = (await upload_quit_claim_service(data))
        return result
    };
}
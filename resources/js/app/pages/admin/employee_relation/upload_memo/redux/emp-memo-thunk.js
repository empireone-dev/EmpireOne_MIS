import { get_emp_memo_service } from "@/app/pages/services/upload-memo-service";
import { empMemoSlice } from "./emp-memo-slice";

export function get_emp_memo_thunk() {
    return async function (dispatch, getState) {
        const result = (await get_emp_memo_service()).data
        console.log('result', result)
        dispatch(empMemoSlice.actions.setEmpMemos(result));
    };
}
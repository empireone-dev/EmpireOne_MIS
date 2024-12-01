import { store_exit_int_service } from "../../services/exit-interview-service";

export function store_exit_int_thunk(data) {
    return async function (dispatch, getState) {
        const result = await store_exit_int_service(data)
        console.log('result', data)
    };
}

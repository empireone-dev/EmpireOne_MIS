import { store_exit_int_service } from "../../services/exit-interview-service";
import { exitInterviewSlice } from "./exit-interview-slice";

export function store_exit_int_thunk(data) {
    return async function (dispatch, getState) {
        const result = await store_exit_int_service(data)
        dispatch(exitInterviewSlice.actions.setExitInterviews(result.data));
        dispatch(exitInterviewSlice.actions.setExitInterviewForm({}));
    };
}

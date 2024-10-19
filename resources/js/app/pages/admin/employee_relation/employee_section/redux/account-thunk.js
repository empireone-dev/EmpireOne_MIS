import { get_account_service } from "@/app/pages/services/account-service";
import { accountSlice } from "./account-slice";

export function get_account_thunk() {
    return async function (dispatch, getState) {
        const res = await get_account_service()
        dispatch(accountSlice.actions.setAccounts(res.data.result));
    };
}
import { create_account_service, delete_account_service, get_account_service, update_account_service } from "@/app/pages/services/account-service";
import { accountSlice } from "./account-slice";

export function get_account_thunk() {
    return async function (dispatch, getState) {
        const res = await get_account_service()
        dispatch(accountSlice.actions.setAccounts(res.data.result));
    };
}

export function create_account_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_account_service(data)
    };
}

export function update_account_thunk(data) {
    return async function (dispatch, getState) {
        const res = await update_account_service(data)
        // dispatch(accountSlice.actions.setAccounts(result.data));
    };
}

export function delete_account_thunk(id) {
    return async function (dispatch, getState) {
        const res = await delete_account_service(id)
    };
}
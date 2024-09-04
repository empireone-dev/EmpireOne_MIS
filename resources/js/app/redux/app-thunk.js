
import { get_user_service } from "../pages/services/user-service";
import {appSlice} from "../pages/redux/app-slice";

export function get_user_thunk(app_id) {
  return async function (dispatch, getState) {
    const result = (await get_user_service())
     dispatch(appSlice.actions.setUser(result));
  };
}


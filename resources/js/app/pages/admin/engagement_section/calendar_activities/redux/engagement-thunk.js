import { get_employee_engagement_service } from "@/app/pages/services/employee-engagement-service";
import { engagementSlice } from "./engagement-slice";

export function get_engagement_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_employee_engagement_service()).data
    console.log('result',result)
    dispatch(engagementSlice.actions.setEngagements(result));
  };
}

export function store_engagement_thunk(data) {
  return async function (dispatch, getState) {
    const result = await store_checklist_service(data)
    dispatch(engagementSlice.actions.setEngagements(result.data));
    dispatch(engagementSlice.actions.setEngagementForm({}));
  };
}
import { get_checklist_service, store_checklist_service } from "@/app/pages/services/checklist-service";
import { checklistSlice } from "./pre-employment-slice";

export function get_checklist_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_checklist_service()).data
    console.log('result',result)
    dispatch(checklistSlice.actions.setChecklists(result));
  };
}

export function store_checklist_thunk(data) {
  return async function (dispatch, getState) {
    const result = await store_checklist_service(data)
    dispatch(checklistSlice.actions.setChecklists(result.data));
    dispatch(checklistSlice.actions.setChecklistForm({}));
  };
}
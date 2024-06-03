import { get_checklist_service } from "@/app/pages/services/checklist-service";
import { checklistSlice } from "./pre-employment-slice";

export function get_checklist_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_checklist_service()).data
    console.log('result',result)
    dispatch(checklistSlice.actions.setChecklists(result));
  };
}
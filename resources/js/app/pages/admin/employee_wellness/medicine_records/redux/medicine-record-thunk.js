import { delete_medicine_record_service, get_medicine_record_service, store_medicine_record_service, update_medicine_record_service } from "@/app/pages/services/medicine-record-service";
import { medicineRecordSlice } from "./medicine-record-slice";

export function get_medicine_record_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_medicine_record_service()).data
    console.log('result', result)
    dispatch(medicineRecordSlice.actions.setMedicineRecords(result));
  };
}

export function store_medicine_record_thunk(data) {
  return async function (dispatch, getState) {
    const result = await store_medicine_record_service(data)
    dispatch(medicineRecordSlice.actions.setMedicineRecords(result.data));
    dispatch(medicineRecordSlice.actions.setMedicineRecordForm({}));
  };
}

export function update_medicine_record_thunk(data) {
  return async function (dispatch, getState) {
    const result = await update_medicine_record_service(data)
    dispatch(medicineRecordSlice.actions.setMedicineRecords(result.data));
  };
}

export function delete_medicine_record_thunk(id) {
  return async function (dispatch, getState) {
    const result = await delete_medicine_record_service(id)
    dispatch(medicineRecordSlice.actions.setMedicineRecords(result.data));
  };
}
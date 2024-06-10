import { createSlice } from '@reduxjs/toolkit'

export const medicineRecordSlice = createSlice({
  name: 'medicine_record',
  initialState: {
    medicine_records: [],
    medicine_recordForm: {}
  },
  reducers: {
    setMedicineRecords: (state, action) => {
      state.medicine_records = action.payload
    },
    setMedicineRecordForm: (state, action) => {
      state.medicine_recordForm = action.payload
    },
    resetMedicineRecord: (state, action) => {
      state.medicine_records = action.payload
    },
  },
})
export const { setMedicineRecords, setMedicineRecordForm, resetMedicineRecord } = medicineRecordSlice.actions

export default medicineRecordSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export const erfRecordSlice = createSlice({
  name: 'erf_record',
  initialState: {
    erf_records: [],
    erf_recordForm: {}
  },
  reducers: {
    setErfRecords: (state, action) => {
      state.erf_records = action.payload
    },
    setErfRecordForm: (state, action) => {
      state.erf_recordForm = action.payload
    },
    resetErfRecord: (state, action) => {
      state.erf_records = action.payload
    },
  },
})
export const { setErfRecords, setErfRecordForm, resetErfRecord } = erfRecordSlice.actions

export default erfRecordSlice.reducer

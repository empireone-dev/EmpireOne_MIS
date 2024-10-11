import { createSlice } from '@reduxjs/toolkit'

export const erfRecordSlice = createSlice({
  name: 'erf_record',
  initialState: {
    erf_records: [],
    erf_recordForm: {},
    filteredData:[],
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
    setFilteredData: (state, action) => {
      state.filteredData = action.payload
    },
  },
})
export const { setErfRecords, setErfRecordForm, resetErfRecord,setFilteredData } = erfRecordSlice.actions

export default erfRecordSlice.reducer

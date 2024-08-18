import { createSlice } from '@reduxjs/toolkit'

export const applicantSlice = createSlice({
  name: 'applicant',
  initialState: {
    applicants: [],
    applicantForm: {}
  },
  reducers: {
    setApplicants: (state, action) => {
      state.applicants = action.payload
    },
    setApplicantForm: (state, action) => {
      state.applicantForm = action.payload
    },
    resetApplicant: (state, action) => {
      state.applicants = action.payload
    },
  },
})
export const { setApplicants, setApplicantForm, resetAppicant } = applicantSlice.actions

export default applicantSlice.reducer

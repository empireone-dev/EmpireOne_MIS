import { createSlice } from '@reduxjs/toolkit'

export const finalRateSlice = createSlice({
  name: 'final_rate',
  initialState: {
    applicant: {},
    finalRate:{
      guideqss:[]
    }
  },
  reducers: {
    setApplicant: (state, action) => {
      state.applicant = action.payload
    },
    resetApplicant: (state) => {
      state.applicant = {}
    },
    setFinalRate: (state, action) => {
      state.finalRate = action.payload
    }
  },
})
export const { setApplicant, resetApplicant, setFinalRate } = finalRateSlice.actions

export default finalRateSlice.reducer

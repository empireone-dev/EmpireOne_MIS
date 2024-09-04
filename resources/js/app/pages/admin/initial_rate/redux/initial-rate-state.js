import { createSlice } from '@reduxjs/toolkit'

export const initialRateSlice = createSlice({
  name: 'initial_rate',
  initialState: {
    applicant: {},
    initialRate:{
      guideqss:[]
    }
  },
  reducers: {
    setApplicant: (state, action) => {
      state.applicant = action.payload
    },
    setInitialRate: (state, action) => {
      state.initialRate = action.payload
    }
  },
})
export const { setApplicant,setInitialRate } = initialRateSlice.actions

export default initialRateSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export const jobOfferSlice = createSlice({
  name: 'joboffer',
  initialState: {
    joboffers: [],
    jobofferForm: {}
  },
  reducers: {
    setJobOffers: (state, action) => {
      state.joboffers = action.payload
    },
    setJobOfferForm: (state, action) => {
      state.jobofferForm = action.payload
    },
    resetJobOffer: (state, action) => {
      state.joboffers = action.payload
    },
  },
})
export const { setJobOffers, setJobOfferForm, resetJobOffer } = jobOfferSlice.actions

export default jobOfferSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export const engagementSlice = createSlice({
  name: 'engagement',
  initialState: {
    engagements: [],
    engagementForm: {}
  },
  reducers: {
    setEngagements: (state, action) => {
      state.engagements = action.payload
    },
    setEngagementForm: (state, action) => {
      state.engagementForm = action.payload
    },
    resetRngagement: (state, action) => {
      state.engagements = action.payload
    },
  },
})
export const { setEngagements, setEngagementForm, resetRngagement } = engagementSlice.actions

export default engagementSlice.reducer

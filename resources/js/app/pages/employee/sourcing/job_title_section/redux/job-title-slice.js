import { createSlice } from '@reduxjs/toolkit'

export const jobPositionSlice = createSlice({
  name: 'job_position',
  initialState: {
    job_positions: [],
    job_positionForm: {}
  },
  reducers: {
    setJobPositions: (state, action) => {
      state.job_positions = action.payload
    },
    setJobPositionForm: (state, action) => {
      state.job_positionForm = action.payload
    },
    resetJobPosition: (state, action) => {
      state.job_positions = action.payload
    },
  },
})
export const { setJobPosition, setJobPositionForm, resetJobPosition } = jobPositionSlice.actions

export default jobPositionSlice.reducer

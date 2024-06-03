import { createSlice } from '@reduxjs/toolkit'

export const checklistSlice = createSlice({
  name: 'checklist',
  initialState: {
    checklists: [],
    checklistForm: {}
  },
  reducers: {
    setChecklists: (state, action) => {
      state.checklists = action.payload
    },
    setChecklistForm: (state, action) => {
      state.checklistForm = action.payload
    },
    resetChecklist: (state, action) => {
      state.checklists = action.payload
    },
  },
})
export const { setChecklists, setChecklistForm, resetChecklist } = checklistSlice.actions

export default checklistSlice.reducer

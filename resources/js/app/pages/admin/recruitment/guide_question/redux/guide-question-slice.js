import { createSlice } from '@reduxjs/toolkit'

export const guideQuestionSlice = createSlice({
  name: 'guideq',
  initialState: {
    guideqs: [],
    guideqForm: {}
  },
  reducers: {
    setGuideQuestions: (state, action) => {
      state.guideqs = action.payload
    },
    setGuideQuestionForm: (state, action) => {
      state.guideqForm = action.payload
    },
    resetGuideQuestions: (state, action) => {
      state.guideqs = action.payload
    },
  },
})
export const { setGuideQuestions, setGuideQuestionForm, resetGuideQuestions } = guideQuestionSlice.actions

export default guideQuestionSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export const onboardingDocuSlice = createSlice({
  name: 'onboarding_doc',
  initialState: {
    onboarding_docs: [],
    onboarding_docForm: {},
    od:{},
    onboarding_doc:{}
  },
  reducers: {
    setOnboardingDocus: (state, action) => {
      state.onboarding_docs = action.payload
    },
    setOnboardingDocuForm: (state, action) => {
      state.onboarding_docForm = action.payload
    },
    resetOnboardingDocu: (state, action) => {
      state.onboarding_docs = action.payload
    },
    setOd: (state, action) => {
      state.od = action.payload
    },
    setOnboardingDoc: (state, action) => {
      state.onboarding_doc = action.payload
    },
  },
})
export const { setOnboardingDocus, setOnboardingDocuForm, resetOnboardingDocu,setOd, setOnboardingDocu } = onboardingDocuSlice.actions

export default onboardingDocuSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export const onboardingAckDocSlice = createSlice({
    name: 'onboarding_ackdoc',
    initialState: {
        onboarding_ackdocs: [],
        onboarding_ackdocForm: {},
        od: {},
        onboarding_ackdoc: {}
    },
    reducers: {
        setOnboardingAckDocs: (state, action) => {
            state.onboarding_ackdocs = action.payload
        },
        setOnboardingAckDocForm: (state, action) => {
            state.onboarding_ackdocForm = action.payload
        },
        resetOnboardingAckDoc: (state, action) => {
            state.onboarding_ackdocs = action.payload
        },
        setOd: (state, action) => {
            state.od = action.payload
        },
        setOnboardingAckDoc: (state, action) => {
            state.onboarding_ackdoc = action.payload
        },
    },
})
export const { setOnboardingAckDocs, setOnboardingAckDocForm, resetOnboardingAckDoc, setOd, setOnboardingAckDoc } = onboardingAckDocSlice.actions

export default onboardingAckDocSlice.reducer

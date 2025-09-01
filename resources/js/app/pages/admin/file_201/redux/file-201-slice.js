import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

export const onboardingAckDocSlice = createSlice({
    name: "onboarding_ackdoc",
    initialState: {
        onboarding_ackdocs: [],
        onboarding_ackdocForm: {},
        od: {},
        onboarding_ackdoc: {},
        job_offer: {},
        signature: "",
        applicant: {},
        e_signature: {},
    },
    reducers: {
        setOnboardingAckDocs: (state, action) => {
            state.onboarding_ackdocs = action.payload;
        },
        setOnboardingAckDocForm: (state, action) => {
            state.onboarding_ackdocForm = action.payload;
        },
        resetOnboardingAckDoc: (state, action) => {
            state.onboarding_ackdocs = action.payload;
        },
        setOd: (state, action) => {
            state.od = action.payload;
        },
        setOnboardingAckDoc: (state, action) => {
            state.onboarding_ackdoc = action.payload;
        },
        setJobOffer: (state, action) => {
            state.job_offer = action.payload;
        },
        setSignature: (state, action) => {
            state.signature = action.payload;
        },
        setESignature: (state, action) => {
            state.e_signature = action.payload;
        },

        setApplicant: (state, action) => {
            state.applicant = action.payload;
        },
    },
});
export const {
    setOnboardingAckDocs,
    setJobOffer,
    setOnboardingAckDocForm,
    resetOnboardingAckDoc,
    setOd,
    setOnboardingAckDoc,
    setSignature,
    setApplicant,
    setESignature,
} = onboardingAckDocSlice.actions;

export default onboardingAckDocSlice.reducer;

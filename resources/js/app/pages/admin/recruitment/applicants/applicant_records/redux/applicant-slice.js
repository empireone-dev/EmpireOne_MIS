import { createSlice } from "@reduxjs/toolkit";

export const applicantSlice = createSlice({
    name: "applicant",
    initialState: {
        applicants: {
            data: [],
        },
        applicantForm: {
            work_experience: [],
        },
        interviewer: [],
        filteredData: [],
        interview_applications: [],
    },
    reducers: {
        setApplicants: (state, action) => {
            state.applicants = action.payload;
        },
        setApplicantForm: (state, action) => {
            state.applicantForm = action.payload;
        },
        resetApplicant: (state, action) => {
            state.applicants = action.payload;
        },
        setInterviewer: (state, action) => {
            state.interviewer = action.payload;
        },
        setFilteredData: (state, action) => {
            state.filteredData = action.payload;
        },
        setInterviewApplications: (state, action) => {
            state.interview_applications = action.payload;
        },
    },
});
export const {
    setApplicants,
    setApplicantForm,
    resetAppicant,
    setFilteredData,
    setInterviewApplications,
} = applicantSlice.actions;

export default applicantSlice.reducer;

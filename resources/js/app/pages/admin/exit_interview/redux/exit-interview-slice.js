import { createSlice } from '@reduxjs/toolkit'

export const exitInterviewSlice = createSlice({
    name: 'exit_int',
    initialState: {
        exitInterviews: [],
        exitInterviewForm: {
            factors: []
        }
    },
    reducers: {
        setExitInterviews: (state, action) => {
            state.exitInterviews = action.payload
        },
        setExitInterviewForm: (state, action) => {
            state.exitInterviewForm = action.payload
        },
        resetExitInterview: (state, action) => {
            state.exitInterviews = action.payload
        },
    },
})
export const { setExitInterview, setExitInterviewForm, resetExitInterview } = exitInterviewSlice.actions

export default exitInterviewSlice.reducer

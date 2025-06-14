import { createSlice } from "@reduxjs/toolkit";

export const videoQuizSlice = createSlice({
    name: "video_quizzes",
    initialState: {
        video_quizzes: [],
        video_quiz: {}
    },
    reducers: {
        setVideoQuizzes: (state, action) => {
            state.video_quizzes = action.payload;
        },
        setVideoQuiz: (state, action) => {
            state.video_quiz = action.payload;
        },

    },
});
export const { setVideoQuizzes, setVideoQuiz } = videoQuizSlice.actions;

export default videoQuizSlice.reducer;

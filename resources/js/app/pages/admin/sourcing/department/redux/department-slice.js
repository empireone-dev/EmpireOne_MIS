import { createSlice } from "@reduxjs/toolkit";

export const departmentSlice = createSlice({
    name: "departments",
    initialState: {
        departments: false,
    },
    reducers: {
        setDepartments: (state, action) => {
            state.departments = action.payload;
        },
    },
});
export const { setDepartments } = departmentSlice.actions;

export default departmentSlice.reducer;

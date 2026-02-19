import { createSlice } from "@reduxjs/toolkit";

export const departmentSlice = createSlice({
    name: "departments",
    initialState: {
        departments: [],
        erfCount:0,
        erf:{}
    },
    reducers: {
        setDepartments: (state, action) => {
            state.departments = action.payload;
        },
        setErfCount: (state, action) => {
            state.erfCount = action.payload;
        },
        setErf: (state, action) => {
            state.erf = action.payload;
        },
        
    },
});
export const { setDepartments,setErf,setErfCount } = departmentSlice.actions;

export default departmentSlice.reducer;

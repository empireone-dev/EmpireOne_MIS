import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employees: [],
        employee: {},
        employeeForm: {},
        hiredApplicants: [],
        acknowledgment: {},
          employeesWithAcknowledgment: [],
          employeesWithAcknowledgmentTotal: 0,
    },
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload;
        },
        setEmployeeForm: (state, action) => {
            state.employeeForm = action.payload;
        },
        resetEmployee: (state, action) => {
            state.employees = action.payload;
        },
        setHiredApplicants: (state, action) => {
            state.hiredApplicants = action.payload;
        },
        setEmployee: (state, action) => {
            state.employee = action.payload;
        },
        setEmployeeAcknowledgment: (state, action) => {
            state.acknowledgment = action.payload;
        },
        setEmployeesWithAcknowledgment: (state, action) => {
            state.employeesWithAcknowledgment = action.payload;
        },
        setEmployeesWithAcknowledgmentTotal: (state, action) => {
            state.employeesWithAcknowledgmentTotal = action.payload;
        },
    },
});
export const {
    setEmployees,
    setEmployeeForm,
    resetEmployee,
    setHiredApplicants,
    setEmployee,
    setEmployeeAcknowledgment,
    setEmployeesWithAcknowledgment,
    setEmployeesWithAcknowledgmentTotal,
} = employeeSlice.actions;

export default employeeSlice.reducer;

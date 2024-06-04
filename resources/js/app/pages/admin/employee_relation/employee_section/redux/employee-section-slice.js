import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    employeeForm: {}
  },
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload
    },
    setEmployeeForm: (state, action) => {
      state.employeeForm = action.payload
    },
    resetEmployee: (state, action) => {
      state.employees = action.payload
    },
  },
})
export const { setEmployees, setEmployeeForm, resetEmployee } = employeeSlice.actions

export default employeeSlice.reducer

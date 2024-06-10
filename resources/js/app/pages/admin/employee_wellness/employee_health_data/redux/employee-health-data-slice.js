import { createSlice } from '@reduxjs/toolkit'

export const employeeHealthDataSlice = createSlice({
  name: 'employee_health',
  initialState: {
    employees: [],
    employee_healths: [],
    employee_healthForm: {}
  },
  reducers: {
    setEmployees: (state, action) => {
        state.employees = action.payload
      },
    setEmployeeHealths: (state, action) => {
      state.employee_healths = action.payload
    },
    setEmployeeHealthForm: (state, action) => {
      state.employee_healthForm = action.payload
    },
    resetEmployeeHealth: (state, action) => {
      state.employee_healths = action.payload
    },
  },
})
export const { setEmployees, setEmployeeHealths, setEmployeeHealthForm, resetEmployeeHealth } = employeeHealthDataSlice.actions

export default employeeHealthDataSlice.reducer

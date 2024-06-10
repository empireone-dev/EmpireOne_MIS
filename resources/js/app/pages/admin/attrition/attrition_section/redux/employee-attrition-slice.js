import { createSlice } from '@reduxjs/toolkit'

export const employeeAttritionSlice = createSlice({
  name: 'employee_attrition',
  initialState: {
    employee_attritions: [],
    employee_attritionsForm: {}
  },
  reducers: {
    setEmployeeAttritions: (state, action) => {
      state.employee_attritions = action.payload
    },
    setEmployeeAttritionForm: (state, action) => {
      state.employee_attritionForm = action.payload
    },
    resetEmployeeAttrition: (state, action) => {
      state.employee_attritions = action.payload
    },
  },
})
export const { setEmployeeAttritions, setEmployeeAttritionForm, resetEmployeeAttrition } = employeeAttritionSlice.actions

export default employeeAttritionSlice.reducer

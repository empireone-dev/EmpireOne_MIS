import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    employee:{},
    employeeForm: {},
    hiredApplicants:[]
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
    setHiredApplicants: (state, action) => {
      state.hiredApplicants = action.payload
    },
    setEmployee: (state, action) => {
      state.employee = action.payload
    },
    
  },
})
export const { setEmployees, setEmployeeForm, resetEmployee,setHiredApplicants,setEmployee } = employeeSlice.actions

export default employeeSlice.reducer

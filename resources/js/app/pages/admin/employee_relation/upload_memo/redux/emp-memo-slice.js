import { createSlice } from '@reduxjs/toolkit'

export const empMemoSlice = createSlice({
  name: 'emp_memo',
  initialState: {
    emp_memos: [],
    empMemoForm: {}
  },
  reducers: {
    setEmpMemos: (state, action) => {
      state.emp_memos = action.payload
    },
    setEmpMemoForm: (state, action) => {
      state.empMemoForm = action.payload
    },
    resetEmpMemo: (state, action) => {
      state.emp_memos = action.payload
    },
  },
})
export const { setEmpMemos, setEmpMemoForm, resetEmpMemo } = empMemoSlice.actions

export default empMemoSlice.reducer

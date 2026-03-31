import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: {},
    alert: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setAlert: (state, action) => {
      state.alert = action.payload
    },
  },
})
export const { setUser, setAlert } = appSlice.actions

export default appSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})
export const { setUser } = appSlice.actions

export default appSlice.reducer

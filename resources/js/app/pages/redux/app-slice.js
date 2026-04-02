import { createSlice } from '@reduxjs/toolkit'

const path = window.location.hash.substring(1); // Get the hash without the first character
const hash = path.split('&')[0];
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isModalOpen: false,
    sidebarOpen: false,
    user: {},
    users: [],
    hash: hash,
    acknowledgment: {}
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setUsers: (state, action) => {
       state.users = action.payload
    },
    setHash: (state, action) => {
      state.hash = action.payload
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    setAcknowledgment: (state, action) => {
        state.acknowledgment = action.payload;
    }
  },
})
export const {
  setIsModalOpen,
  setUser,
  setHash,
  setSidebarOpen,
  setUsers,
  setAcknowledgment
} = appSlice.actions

export default appSlice.reducer

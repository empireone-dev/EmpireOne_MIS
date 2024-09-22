import { createSlice } from '@reduxjs/toolkit'

export const preEmploymentFilesSlice = createSlice({
  name: 'preemploymentfiles',
  initialState: {
    preemploymentfiles: [],
    preemploymentfileForm: {}
  },
  reducers: {
    setPreEmploymentFiles: (state, action) => {
      state.preemploymentfiles = action.payload
    },
    setPreEmploymentFileForm: (state, action) => {
      state.preemploymentfileForm = action.payload
    },
    resetPreEmploymentFile: (state, action) => {
      state.preemploymentfiles = action.payload
    },
  },
})
export const { setPreEmploymentFiles, setPreEmploymentFileForm, resetPreEmploymentFile } = preEmploymentFilesSlice.actions

export default preEmploymentFilesSlice.reducer

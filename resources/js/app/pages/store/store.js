
import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from '../admin/dashboard/redux/dashboard-slice';
import jobTitleSlice from '../admin/sourcing/job_title_section/redux/job-title-slice';
const store = configureStore({
    reducer: {
        dashboard: dashboardSlice,
        job_positions: jobTitleSlice
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;

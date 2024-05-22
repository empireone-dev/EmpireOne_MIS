
import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from '../admin/dashboard/redux/dashboard-slice';
const store = configureStore({
    reducer: {
        dashboard: dashboardSlice,
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;

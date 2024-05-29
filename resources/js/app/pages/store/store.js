
import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from '../admin/dashboard/redux/dashboard-slice';
import jobTitleSlice from '../admin/sourcing/job_title_section/redux/job-title-slice';
import erfRecordSlice from '../admin/sourcing/resource_requests/erf_record/redux/erf-record-slice';
import guideQuestionSlice from '../admin/recruitment/guide_question/redux/guide-question-slice';
const store = configureStore({
    reducer: {
        dashboard: dashboardSlice,
        job_positions: jobTitleSlice,
        erf_records: erfRecordSlice,
        guideqs: guideQuestionSlice
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;


import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from '../pages/admin/dashboard/redux/dashboard-slice';
import jobTitleSlice from '../pages/admin/sourcing/job_title_section/redux/job-title-slice';
import erfRecordSlice from '../pages/admin/sourcing/resource_requests/erf_record/redux/erf-record-slice';
import guideQuestionSlice from '../pages/admin/recruitment/guide_question/redux/guide-question-slice';
import applicantSlice from '../pages/admin/recruitment/applicants/applicant_records/redux/applicant-slice';
import checklistSlice from '../pages/admin/hiring/pre_employment/redux/pre-employment-slice';
import jobOfferSlice from '../pages/admin/hiring/hiring_section/redux/hiring-slice';
import onboardingDocuSlice from '../pages/admin/onboarding/onboarding_docu/redux/onboarding-docu-slice';
import employeeSlice from '../pages/admin/employee_relation/employee_section/redux/employee-section-slice';
import medicineRecordSlice from '../pages/admin/employee_wellness/medicine_records/redux/medicine-record-slice';
import employeeHealthDataSlice from '../pages/admin/employee_wellness/employee_health_data/redux/employee-health-data-slice';
import employeeAttritionSlice from '../pages/admin/attrition/attrition_section/redux/employee-attrition-slice';
import empMemoSlice from '../pages/admin/employee_relation/upload_memo/redux/emp-memo-slice';
const store = configureStore({
    reducer: {
        dashboard: dashboardSlice,
        job_positions: jobTitleSlice,
        erf_records: erfRecordSlice,
        guideqs: guideQuestionSlice,
        applicants: applicantSlice,
        checklists: checklistSlice,
        joboffers: jobOfferSlice,
        onboarding_docs: onboardingDocuSlice,
        employees: employeeSlice,
        medicine_records: medicineRecordSlice,
        employee_healths: employeeHealthDataSlice,
        employee_attritions: employeeAttritionSlice,
        emp_memos: empMemoSlice,
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;


import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from '../admin/dashboard/redux/dashboard-slice';
import jobTitleSlice from '../admin/sourcing/job_title_section/redux/job-title-slice';
import erfRecordSlice from '../admin/sourcing/resource_requests/erf_record/redux/erf-record-slice';
import guideQuestionSlice from '../admin/recruitment/guide_question/redux/guide-question-slice';
import applicantSlice from '../admin/recruitment/applicants/applicant_records/redux/applicant-slice';
import checklistSlice from '../admin/hiring/pre_employment/redux/pre-employment-slice';
import jobOfferSlice from '../admin/hiring/hiring_section/redux/hiring-slice';
import onboardingDocuSlice from '../admin/onboarding/onboarding_docu/redux/onboarding-docu-slice';
import employeeSlice from '../admin/employee_relation/employee_section/redux/employee-section-slice';
import medicineRecordSlice from '../admin/employee_wellness/medicine_records/redux/medicine-record-slice';
import employeeHealthDataSlice from '../admin/employee_wellness/employee_health_data/redux/employee-health-data-slice';
import employeeAttritionSlice from '../admin/attrition/attrition_section/redux/employee-attrition-slice';
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
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;

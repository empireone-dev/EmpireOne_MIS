import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "../pages/admin/dashboard/redux/dashboard-slice";
import jobTitleSlice from "../pages/admin/sourcing/job_title_section/redux/job-title-slice";
import erfRecordSlice from "../pages/admin/sourcing/resource_requests/erf_record/redux/erf-record-slice";
import guideQuestionSlice from "../pages/admin/recruitment/guide_question/redux/guide-question-slice";
import applicantSlice from "../pages/admin/recruitment/applicants/applicant_records/redux/applicant-slice";
import checklistSlice from "../pages/admin/hiring/pre_employment/redux/pre-employment-slice";
import jobOfferSlice from "../pages/admin/hiring/hiring_section/redux/hiring-slice";
import onboardingDocuSlice from "../pages/admin/onboarding/onboarding_docu/redux/onboarding-docu-slice";
import employeeSlice from "../pages/admin/employee_relation/employee_section/redux/employee-section-slice";
import medicineRecordSlice from "../pages/admin/employee_wellness/medicine_records/redux/medicine-record-slice";
import employeeHealthDataSlice from "../pages/admin/employee_wellness/employee_health_data/redux/employee-health-data-slice";
import employeeAttritionSlice from "../pages/admin/attrition/attrition_section/redux/employee-attrition-slice";
import empMemoSlice from "../pages/admin/employee_relation/upload_memo/redux/emp-memo-slice";
import engagementSlice from "../pages/admin/engagement_section/calendar_activities/redux/engagement-slice";
import initialRateSlice from "../pages/admin/initial_rate/redux/initial-rate-state";
import finalRateSlice from "../pages/admin/final_rate/redux/final-rate-slice";
import preEmploymentFilesSlice from "../pages/pre-employment/redux/pre-employment-files-slice";
import departmentSlice from "../pages/admin/sourcing/department/redux/department-slice";
import appSlice from "../pages/redux/app-slice";
import accountSlice from "../pages/admin/employee_relation/employee_section/redux/account-slice";
import exitInterviewSlice from "../pages/exit_interview/redux/exit-interview-slice";
import videoQuizSlice from "../pages/video_quiz/redux/video-quiz-slice";
const store = configureStore({
    reducer: {
        app: appSlice,
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
        engagements: engagementSlice,
        initial_rate: initialRateSlice,
        final_rate: finalRateSlice,
        preemploymentfiles: preEmploymentFilesSlice,
        departments: departmentSlice,
        accounts: accountSlice,
        exit_int: exitInterviewSlice,
        video_quizzes: videoQuizSlice,
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;

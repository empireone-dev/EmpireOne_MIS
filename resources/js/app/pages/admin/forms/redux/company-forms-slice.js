import { createSlice } from "@reduxjs/toolkit";

export const companyFormsSlice = createSlice({
    name: "company_forms",
    initialState: {
        company_forms: [],
    },
    reducers: {
        setCompanyForms: (state, action) => {
            state.company_forms = action.payload;
        },
        addCompanyForm: (state, action) => {
            state.company_forms = [action.payload, ...state.company_forms];
        },
        removeCompanyForm: (state, action) => {
            state.company_forms = state.company_forms.filter(
                (f) => f.id !== action.payload
            );
        },
    },
});

export const { setCompanyForms, addCompanyForm, removeCompanyForm } =
    companyFormsSlice.actions;

export default companyFormsSlice.reducer;

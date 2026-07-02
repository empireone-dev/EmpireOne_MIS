import { createSlice } from "@reduxjs/toolkit";

export const companyFormsSlice = createSlice({
    name: "company_forms",
    initialState: {
        company_forms: [],
        folders: [],
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
        updateFormFolder: (state, action) => {
            const { id, folder_id } = action.payload;
            const form = state.company_forms.find((f) => f.id === id);
            if (form) form.folder_id = folder_id;
        },
        setFolders: (state, action) => {
            state.folders = action.payload;
        },
        addFolder: (state, action) => {
            state.folders = [...state.folders, action.payload].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        },
        removeFolder: (state, action) => {
            state.folders = state.folders.filter((f) => f.id !== action.payload);
            // Unassign forms that belonged to this folder
            state.company_forms = state.company_forms.map((f) =>
                f.folder_id === action.payload ? { ...f, folder_id: null } : f
            );
        },
    },
});

export const {
    setCompanyForms,
    addCompanyForm,
    removeCompanyForm,
    updateFormFolder,
    setFolders,
    addFolder,
    removeFolder,
} = companyFormsSlice.actions;

export default companyFormsSlice.reducer;

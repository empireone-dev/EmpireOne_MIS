import axios from "axios";

export async function get_company_forms_service() {
    const res = await axios.get("/api/company_form");
    return res.data;
}

export async function upload_company_form_service(formData) {
    const res = await axios.post("/api/company_form", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
}

export async function delete_company_form_service(id) {
    const res = await axios.delete(`/api/company_form/${id}`);
    return res.data;
}

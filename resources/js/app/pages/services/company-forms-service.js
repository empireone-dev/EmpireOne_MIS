import axios from "axios";

export async function get_company_forms_service() {
    const res = await axios.get("/api/company_form");
    return res.data;
}

export async function upload_company_form_service(formData) {
    const res = await axios.post("/api/company_form", formData);
    return res.data;
}

export async function delete_company_form_service(id) {
    const res = await axios.delete(`/api/company_form/${id}`);
    return res.data;
}

export async function move_form_to_folder_service(id, folderId) {
    const res = await axios.patch(`/api/company_form/${id}/folder`, { folder_id: folderId });
    return res.data;
}

export async function get_folders_service() {
    const res = await axios.get("/api/company_form_folder");
    return res.data;
}

export async function create_folder_service(data) {
    const res = await axios.post("/api/company_form_folder", data);
    return res.data;
}

export async function delete_folder_service(id) {
    const res = await axios.delete(`/api/company_form_folder/${id}`);
    return res.data;
}

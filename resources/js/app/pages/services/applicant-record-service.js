import axios from "axios";

export async function get_applicant_service() {
    const res = await axios.get('/api/applicant' + window.location.search)
    return res.data
}

export async function get_applicant_by_app_id_service(app_id) {
    const res = await axios.get('/api/applicant/' + app_id)
    return res.data
}
export async function store_applicant_service(fd) {
    try {
        const res = await axios.post('/api/applicant', fd)
        return res.data
    } catch (error) {
        return error
    }
}

export async function update_applicant_service(data) {
    const res = await axios.put(`/api/applicant/${data.id}`, data);
    return res.data;
}

export async function update_applicant_status_service(data) {
    const res = await axios.put(`/api/update_applicant_status/${data.id}`, data);
    return res.data;
}

export async function update_applicant_after_confirmation_status_service(data) {
    const res = await axios.put(`/api/update_applicant_after_confirmation_status/${data.app_id}`, data);
    return res.data;
}


import axios from "axios";

export async function get_applicant_service() {
    const searchQuery = typeof window !== 'undefined' ? window.location.search : '';
    const res = await axios.get('/api/applicant' + searchQuery)
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

export async function declined_attendance_service(data) {
    const res = await axios.put(`/api/declined_attendance/${data.app_id}`, data);
    return res.data;
}

export function get_interview_applicant_service() {
    try {
        const result = axios.get('/api/interview_confirmation')
        return result
    } catch (error) {

    }
}

export async function proceed_initial_immediate_service(data) {
    const res = await axios.put(`/api/proceed_initial_immediate/${data.id}`, data);
    return res.data;
}

export async function proceed_final_immediate_service(data) {
    const res = await axios.put(`/api/proceed_final_immediate/${data.id}`, data);
    return res.data;
}

export async function proceed_final_phase_service(data) {
    const res = await axios.put(`/api/proceed_final_phase/${data.id}`, data);
    return res.data;
}

export async function phone_call_status_service(data) {
    const res = await axios.put(`/api/phone_call_status/${data.id}`, data);
    return res.data;
}

export function delete_applicant_service(id) {
    try {
        const result = axios.delete('/api/applicant/' + id)
        return result
    } catch (error) {

    }
}

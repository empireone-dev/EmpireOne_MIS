import axios from "axios";

export async function get_applicant_service() {
    try {
        // Safely construct the URL with search parameters
        const searchParams = typeof window !== 'undefined' ? window.location.search : '';
        const url = '/api/applicant' + searchParams;
        
        console.log('Requesting URL:', url);
        
        const res = await axios.get(url, {
            timeout: 30000, // 30 second timeout
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        
        console.log('Response received:', res.data);
        return res.data;
    } catch (error) {
        console.error('Error fetching applicants:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        
        // If it's a 500 error, try to get more details
        if (error.response?.status === 500) {
            console.error('Server error details:', error.response.data);
        }
        
        // Return a default structure on error
        return {
            data: {
                data: [],
                current_page: 1,
                last_page: 1,
                per_page: 10,
                total: 0
            },
            interviewer: []
        };
    }
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

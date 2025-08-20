import axios from "axios";

export async function get_employee_attrition_service() {
    const res = await axios.get('/api/employee_attrition')

    return res.data
}

export async function upload_exit_clearance_service(data) {
    const res = await axios.post('/api/upload_exit_clearance', data)
    return res.data
}

export async function send_quit_claim_service(data) {
    const res = await axios.post('/api/send_quit_claim', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return res.data
}
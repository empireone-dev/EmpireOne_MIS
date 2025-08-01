import axios from "axios";


export async function create_onboarding_ack_service(data) {
    const res = await axios.post('/api/onboarding_ack', data)
    return res.data
}

export async function update_onboarding_ack_service(id) {
    const res = await axios.put('/api/onboarding_ack/' + id)
    return res.data
}


export async function get_onboarding_ackdoc_by_id_service(app_id) {
    const res = await axios.get('/api/onboarding_ackdoc_by_id/' + app_id)
    return res.data
}
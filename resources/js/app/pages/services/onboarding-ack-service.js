import axios from "axios";


export async function create_onboarding_ack_service(data) {
    const res = await axios.post('/api/onboarding_ack', data)
    return res.data
}

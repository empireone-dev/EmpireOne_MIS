import axios from "axios";


export async function create_new_job_offer_service(data) {
    const res = await axios.post('/api/new_joboffer', data)
    return res.data
}

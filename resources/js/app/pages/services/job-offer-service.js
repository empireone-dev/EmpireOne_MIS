import axios from "axios";

export async function get_job_offer_service(){
    const res = await axios.get('/api/joboffer')
    return res.data
}

export async function create_job_offer_service(data){
    const res = await axios.post('/api/joboffer',data)
    return res.data
}

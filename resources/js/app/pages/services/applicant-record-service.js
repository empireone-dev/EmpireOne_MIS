import axios from "axios";

export async function get_applicant_service(){
    const res = await axios.get('/api/applicant'+window.location.search)
    return res.data
}

export async function store_applicant_service(data){
    const res = await axios.post('/api/applicant',data)
    return res.data
}
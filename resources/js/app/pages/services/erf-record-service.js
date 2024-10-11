import axios from "axios";

export async function get_erf_record_service(){
    const res = await axios.get('/api/outsourcing_erf')
    return res.data
}

export async function create_outsourcing_erf_service(data){
    const res = await axios.post('/api/outsourcing_erf',data)
    return res.data
}
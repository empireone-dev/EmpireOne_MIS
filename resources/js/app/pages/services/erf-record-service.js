import axios from "axios";

export async function get_erf_record_service(){
    const res = await axios.get('/api/outsourcing_erf')
    return res.data
}

export async function create_outsourcing_erf_service(data){
    const res = await axios.post('/api/outsourcing_erf',data)
    return res.data
}


export async function get_outsourcing_erf_service(date){
    const res = await axios.get('/api/count_outsourcing_erf/'+date)
    return res.data
}


export async function get_outsourcing_erf_by_id_service(ref_id){
    const res = await axios.get('/api/outsourcing_erf_by_id/'+ref_id)
    return res.data
}


export async function update_erf_ja_service(data){
    const res = await axios.put('/api/ERFJa/'+data.ref_id,data)
    return res.data
}

export async function update_erf_jd_service(data){
    const res = await axios.put('/api/ERFJd/'+data.ref_id,data)
    return res.data
}

export async function update_outsourcing_erf_service(data){
    const res = await axios.put(`/api/outsourcing_erf/${data.id}`, data);
    return res.data;
}
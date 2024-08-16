import axios from "axios";

export async function get_medicine_record_service(){
    const res = await axios.get('/api/medicine_record')
    return res.data
}

export async function store_medicine_record_service(data){
    const res = await axios.post('/api/medicine_record',data)
    return res.data
}
import axios from "axios";

export async function get_medicine_record_service(){
    const res = await axios.get('/api/medicine_record')
    return res.data
}

export async function store_medicine_record_service(data){
    const res = await axios.post('/api/medicine_record',data)
    return res.data
}

export async function update_medicine_record_service(data){
    const res = await axios.put(`/api/medicine_record/${data.id}`, data);
    return res.data;
}

export async function delete_medicine_record_service(id){
    const res = await axios.delete('/api/medicine_record/'+id)
    return res.data
}
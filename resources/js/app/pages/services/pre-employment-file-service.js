import axios from "axios";

export async function store_pre_employment_file_service(data){
    const res = await axios.post('/api/pre_employment_file',data)
  
    return res.data
}

export async function get_pre_employment_file_service(){
    const res = await axios.get('/api/pre_employment_file')
    return res.data
}

export async function update_pre_employment_file_service(data){
    const res = await axios.post('/api/reupload_file',data)
    return res.data
}
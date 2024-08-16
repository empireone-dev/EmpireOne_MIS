import axios from "axios";

export async function get_checklist_service(){
    const res = await axios.get('/api/checklist')
  
    return res.data
}

export async function store_checklist_service(data){
    const res = await axios.post('/api/checklist',data)
    return res.data
}
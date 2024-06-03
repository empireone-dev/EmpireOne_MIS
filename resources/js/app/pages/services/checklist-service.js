import axios from "axios";

export async function get_checklist_service(){
    const res = await axios.get('/api/checklist')
  
    return res.data
}
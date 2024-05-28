import axios from "axios";

export async function get_job_position_service(){
    const res = await axios.get('/api/job_position')
  
    return res.data
}
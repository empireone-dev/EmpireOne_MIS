import axios from "axios";

export async function get_job_offer_service(){
    const res = await axios.get('/api/joboffer')
  
    return res.data
}
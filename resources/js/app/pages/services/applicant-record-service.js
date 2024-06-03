import axios from "axios";

export async function get_applicant_service(){
    const res = await axios.get('/api/applicant')
  
    return res.data
}
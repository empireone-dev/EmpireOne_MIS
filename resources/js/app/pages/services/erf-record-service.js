import axios from "axios";

export async function get_erf_record_service(){
    const res = await axios.get('/api/outsourcing_erf')
  
    return res.data
}
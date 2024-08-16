import axios from "axios";

export async function get_employee_engagement_service(){
    const res = await axios.get('/api/engagement')
  
    return res.data
}
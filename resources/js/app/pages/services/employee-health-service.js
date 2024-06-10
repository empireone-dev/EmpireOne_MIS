import axios from "axios";

export async function get_employee_health_service(){
    const res = await axios.get('/api/employee_health')
  
    return res.data
}
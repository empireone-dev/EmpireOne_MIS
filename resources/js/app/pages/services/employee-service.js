import axios from "axios";

export async function get_employee_service(){
    const res = await axios.get('/api/employee')
  
    return res.data
}
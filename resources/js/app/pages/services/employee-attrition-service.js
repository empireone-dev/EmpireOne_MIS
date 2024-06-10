import axios from "axios";

export async function get_employee_attrition_service(){
    const res = await axios.get('/api/employee_attrition')
  
    return res.data
}
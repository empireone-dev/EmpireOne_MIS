import axios from "axios";

export async function get_emp_memo_service(){
    const res = await axios.get('/api/emp_memo')
  
    return res.data
}
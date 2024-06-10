import axios from "axios";

export async function get_medicine_record_service(){
    const res = await axios.get('/api/medicine_record')
  
    return res.data
}
import axios from "axios";

export async function get_onboarding_doc_service(){
    const res = await axios.get('/api/onboarding_doc?app_id='+window.location.pathname.split('/')[2])
  
    return res.data
}
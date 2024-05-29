import axios from "axios";

export async function get_guide_question_service(){
    const res = await axios.get('/api/guideq')
  
    return res.data
}
import axios from "axios";

export async function get_guide_question_service(){
    const res = await axios.get('/api/guideq')
  
    return res.data
}

export async function store_guide_question_service(data){
    const res = await axios.post('/api/guideq',data)
    return res.data
}
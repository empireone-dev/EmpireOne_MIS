import axios from "axios";

export async function get_guide_question_service(){
    const res = await axios.get('/api/guideq')
  
    return res.data
}

export async function store_guide_question_service(data){
    const res = await axios.post('/api/guideq',data)
    return res.data
}

export async function update_guide_question_service(data){
    const res = await axios.put(`/api/guideq/${data.id}`, data);
    return res.data;
}

export async function delete_guide_question_service(id){
    const res = await axios.delete('/api/guideq/'+id)
    return res.data
}
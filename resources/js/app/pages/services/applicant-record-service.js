import axios from "axios";

export async function get_applicant_service() {
    const res = await axios.get('/api/applicant' + window.location.search)
    return res.data
}

export async function get_applicant_by_app_id_service(app_id) {
    const res = await axios.get('/api/applicant/' + app_id)
    return res.data
}
export async function store_applicant_service(data) {
   try {
    const res = await axios.post('/api/applicant', data)
    return res.data
   } catch (error) {
    return error
   }
}

export async function update_applicant_service(data) {
    const res = await axios.put(`/api/applicant/${data.id}`, data);
    return res.data;
}
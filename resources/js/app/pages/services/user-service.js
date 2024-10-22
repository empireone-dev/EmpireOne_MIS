import axios from "axios";

export async function get_users_service() {
    const res = await axios.get('/api/users')
    return res.data
}

export async function get_user_service() {
    const res = await axios.get('/api/user')
    return res.data
}


export async function search_applicant_service(data) {
    const res = await axios.post('/api/search_applicant', data)
    return res.data
}

export async function update_user_service(data) {
    const res = await axios.put(`/api/user/${data.id}`, data);
    return res.data;
}

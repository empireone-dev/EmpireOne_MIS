import axios from "axios";

export async function get_onboarding_doc_service() {
    const res = await axios.get('/api/onboarding_doc?app_id=' + window.location.pathname.split('/')[2])

    return res.data
}

export async function get_onboarding_doc_by_id_service(id) {
    const res = await axios.get('/api/onboarding_doc_by_id/' + id)
    return res.data
}


export async function create_onboarding_doc_service(data) {
    const res = await axios.post('/api/onboarding_doc', data)
    return res.data
}
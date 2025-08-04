import axios from "axios"

export function get_account_service() {
    try {
        const result = axios.get('/api/account')
        return result
    } catch (error) {

    }
}

export function create_account_service(data) {
    try {
        const result = axios.post('/api/account', data)
        return result
    } catch (error) {

    }
}

export async function update_account_service(data) {
    const res = await axios.put(`/api/account/${data.id}`, data);
    return res.data;
}

export function delete_account_service(id) {
    try {
        const result = axios.delete('/api/account/' + id)
        return result
    } catch (error) {
        console.error(error);
    }
}
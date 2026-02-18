import axios from "axios";
import { router } from "@inertiajs/react";

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

export async function change_password_service(data) {
    try {
        const res = await axios.put('/password', {
            current_password: data.current_password,
            password: data.password || data.new_password, // Support both field names
            password_confirmation: data.password_confirmation
        });
        return res.data;
    } catch (error) {
        // Re-throw the error so it can be handled in the component
        throw error;
    }
}

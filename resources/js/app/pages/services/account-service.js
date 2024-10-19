import axios from "axios"

export function get_account_service() {
    try {
        const result = axios.get('/api/account')
        return result
    } catch (error) {

    }
}
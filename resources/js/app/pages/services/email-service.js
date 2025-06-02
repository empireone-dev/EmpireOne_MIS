import axios from "axios";

export default function sendiv_email_service(data) {
    try {
        const result = axios.post('/api/sendiv_email', {
            ...data,
            ifftime: data.ifftime,
            iffdate: data.iffdate
        })
        return result
    } catch (error) {

    }
}

export function sendiv_contract_email_service(data) {
    try {
        const result = axios.post('/api/sendiv_email',data)
        return result
    } catch (error) {

    }
}

export function send_rejection_email_service(data) {
    try {
        const result = axios.post('/api/send_rejection_email',data)
        return result
    } catch (error) {

    }
}
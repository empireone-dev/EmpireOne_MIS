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
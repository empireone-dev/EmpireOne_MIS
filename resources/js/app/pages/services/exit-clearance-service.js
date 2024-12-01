import axios from "axios";

export async function get_exit_clr_service() {
    const res = await axios.get('/api/exit_clr')
    return res.data
}

export async function store_exit_clr_service(data) {
    const res = await axios.post('/api/exit_clr', data)
    return res.data
}

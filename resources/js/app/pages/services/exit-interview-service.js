import axios from "axios";

// export async function get_exit_int_service() {
//     const res = await axios.get('/api/exit_int')
//     return res.data
// }

export async function store_exit_int_service(data) {
    const res = await axios.post('/api/exit_int', data)
    return res.data
}

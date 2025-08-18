import axios from "axios";

export async function get_employee_service() {
    const res = await axios.get('/api/employee' + window.location.search ?? '?page=1')
    return res.data
}

export async function get_employee_by_id_service(id) {
    const res = await axios.get('/api/employee/' + id)
    return res.data
}

export async function store_employee_service(fd) {
    const res = await axios.post('/api/employee', fd)
    return res.data
}

export async function store_new_employee_service(data) {
    const res = await axios.post('/api/store_new_employee', data)
    return res.data
}

export async function update_employee_service(data) {
    const res = await axios.put(`/api/employee/${data.id}`, data);
    return res.data;
}
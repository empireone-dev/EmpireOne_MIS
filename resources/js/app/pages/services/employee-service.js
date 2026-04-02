import axios from "axios";

export async function get_employee_service() {
    const res = await axios.get('/api/employee' + window.location.search ?? '?page=1')
    return res.data
}

export async function get_employee_with_acknowledgment_service() {
    const res = await axios.get('/api/get_employee_with_acknowledgment' + window.location.search ?? '?page=1')
    return res.data
}

export async function get_all_employees_service() {
    const res = await axios.get('/api/employee?per_page=10000')
    return res.data
}

export async function get_employee_by_id_service(id) {
    const res = await axios.get('/api/employee/' + id)
    return res.data
}


export async function get_employee_acknowledgment_by_emp_id_service(emp_id) {
    const res = await axios.get('/api/get_employee_acknowledgment/' + emp_id)
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

export function get_acknowledgment_by_emp_id_service() {
  try {
    const result = axios.get('/api/get_acknowledgment_by_emp_id/' + window.location.pathname.split('/')[3])
    return result
  } catch (error) {

  }
}
export async function store_final_rate_service(data) {
  const res = await axios.post('/api/final_rate', data)
  return res.data
}

export async function get_hired_applicant_service() {
  const res = await axios.get('/api/get_hired_applicant')
  return res.data
}

export async function create_employee_service(data) {
  const res = await axios.post('/api/employee', data)
  return res.data
}

export async function update_address_service(data) {
  const res = await axios.put(`/api/update_address/${data.id}`, data);
  return res.data;
}


import axios from "axios"

export function get_department_service() {
  try {
      const result = axios.get('/api/department')
      return result
  } catch (error) {

  }
}

export function create_department_service(data) {
  try {
      const result = axios.post('/api/department',data)
      return result
  } catch (error) {

  }
}

export async function update_department_service(data){
  const res = await axios.put(`/api/department/${data.id}`, data);
  return res.data;
}


export function delete_department_service(id) {
  try {
      const result = axios.delete('/api/department/'+id)
      return result
  } catch (error) {

  }
}
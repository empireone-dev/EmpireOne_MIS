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
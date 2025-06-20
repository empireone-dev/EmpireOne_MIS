import axios from "axios"

export function get_video_quiz_service() {
  try {
    const result = axios.get('/api/video_quiz' + window.location.search)
    return result
  } catch (error) {

  }
}

export function create_video_quiz_service(data) {
  try {
    const result = axios.post(`/api/video_quiz`, data)
    return result
  } catch (error) {

  }
}

export function get_video_quiz_by_emp_id_service() {
  try {
    const result = axios.get('/api/get_video_quiz_by_emp_id/' + window.location.pathname.split('/')[3])
    return result
  } catch (error) {

  }
}

// export async function update_department_service(data){
//   const res = await axios.put(`/api/department/${data.id}`, data);
//   return res.data;
// }


export function delete_video_quiz_service(id) {
  try {
    const result = axios.delete('/api/video_quiz/' + id)
    return result
  } catch (error) {

  }
}
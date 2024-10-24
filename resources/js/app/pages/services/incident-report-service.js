
export async function create_incident_report_service(data){
  const res = await axios.post('/api/incident_report',data)
  return res.data
}


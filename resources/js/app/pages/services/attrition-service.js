export async function store_attrition_service(data){
  const res = await axios.post('/api/attrition',data)
  return res.data
}
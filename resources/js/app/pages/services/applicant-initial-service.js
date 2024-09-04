export async function store_initial_rate_service(data){
  const res = await axios.post('/api/initial_rate',data)
  return res.data
}
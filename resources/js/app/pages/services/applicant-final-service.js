export async function store_final_rate_service(data){
    const res = await axios.post('/api/final_rate',data)
    return res.data
  }
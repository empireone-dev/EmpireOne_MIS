async function s(a){return(await axios.post("/api/final_rate",a)).data}async function t(){return(await axios.get("/api/get_hired_applicant")).data}async function r(a){return(await axios.put(`/api/update_address/${a.id}`,a)).data}export{t as g,s,r as u};
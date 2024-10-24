async function e(a){return(await axios.post("/api/final_rate",a)).data}async function s(){return(await axios.get("/api/get_hired_applicant")).data}export{s as g,e as s};

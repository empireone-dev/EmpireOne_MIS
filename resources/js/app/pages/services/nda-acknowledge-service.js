import axios from "axios";

export async function submit_nda_acknowledge_service(data) {
    const res = await axios.post("/api/nda_acknowledge", data);
    return res.data;
}

export async function get_nda_acknowledge_service(emp_id) {
    const res = await axios.get("/api/nda_acknowledge/" + emp_id);
    return res.data;
}

import axios from "axios";

export async function submit_sss_acknowledge_service(data) {
    const res = await axios.post("/api/sss_acknowledge", data);
    return res.data;
}

export async function get_sss_acknowledge_service(emp_id) {
    const res = await axios.get("/api/sss_acknowledge/" + emp_id);
    return res.data;
}

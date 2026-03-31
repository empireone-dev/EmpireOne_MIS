import axios from "axios";

export async function submit_cocd_acknowledge_service(data) {
    const res = await axios.post("/api/cocd_acknowledge", data);
    return res.data;
}

export async function get_cocd_acknowledge_service(emp_id) {
    const res = await axios.get("/api/cocd_acknowledge/" + emp_id);
    return res.data;
}

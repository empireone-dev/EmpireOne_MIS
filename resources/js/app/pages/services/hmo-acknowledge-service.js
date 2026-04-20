import axios from "axios";

export async function submit_hmo_acknowledge_service(data) {
    const res = await axios.post("/api/hmo_acknowledge", data);
    return res.data;
}

export async function get_hmo_acknowledge_service(emp_id) {
    const res = await axios.get("/api/hmo_acknowledge/" + emp_id);
    return res.data;
}

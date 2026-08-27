import axios from "axios";

export async function submit_government_mandated_acknowledge_service(data) {
    const res = await axios.post("/api/government_acknowledge", data);
    return res.data;
}

export async function get_government_mandated_acknowledge_service(emp_id) {
    const res = await axios.get("/api/government_acknowledge/" + emp_id);
    return res.data;
}

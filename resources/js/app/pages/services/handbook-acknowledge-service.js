import axios from "axios";

export async function submit_handbook_acknowledge_service(data) {
    const res = await axios.post("/api/handbook_acknowledge", data);
    return res.data;
}

export async function get_handbook_acknowledge_service(emp_id) {
    const res = await axios.get("/api/handbook_acknowledge/" + emp_id);
    return res.data;
}

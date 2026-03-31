import axios from "axios";

export async function submit_ethics_acknowledge_service(data) {
    const res = await axios.post("/api/ethics_acknowledge", data);
    return res.data;
}

export async function get_ethics_acknowledge_service(emp_id) {
    const res = await axios.get("/api/ethics_acknowledge/" + emp_id);
    return res.data;
}

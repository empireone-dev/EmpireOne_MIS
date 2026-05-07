import axios from "axios";

export async function submit_schedule_policy_acknowledge_service(data) {
    const res = await axios.post("/api/schedule_policy_acknowledge", data);
    return res.data;
}

export async function get_schedule_policy_acknowledge_service(emp_id) {
    const res = await axios.get("/api/schedule_policy_acknowledge/" + emp_id);
    return res.data;
}

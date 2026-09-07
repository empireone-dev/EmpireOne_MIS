import axios from "axios";

export async function submit_payroll_101_acknowledge_service(data) {
    const res = await axios.post("/api/payroll_101_acknowledge", data);
    return res.data;
}

export async function get_payroll_101_acknowledge_service(emp_id) {
    const res = await axios.get("/api/payroll_101_acknowledge/" + emp_id);
    return res.data;
}

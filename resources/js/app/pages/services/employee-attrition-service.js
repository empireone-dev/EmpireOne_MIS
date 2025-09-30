import axios from "axios";

export async function get_employee_attrition_service() {
    const res = await axios.get(
        "/api/employee_attrition" + (window.location.search || "?page=1")
    );

    return res.data;
}

export async function upload_exit_clearance_service(data) {
    const res = await axios.post("/api/upload_exit_clearance", data);
    return res.data;
}

export async function send_quit_claim_service(data) {
    const res = await axios.post("/api/send_quit_claim", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
}

export async function send_last_pay_service(data) {
    const res = await axios.post("/api/send_last_pay", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
}

export async function send_offboarding_checklist_service(data) {
    const res = await axios.post("/api/send_offboarding_checklist", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
}

export async function get_employee_attrition_by_emp_id_service(emp_id) {
    try {
        const result = await axios.get(
            `/api/get_employee_attrition_by_emp_id/${emp_id}`
        );
        return result.data;
    } catch (error) {
        console.error("Error fetching employee attrition:", error);
        throw error;
    }
}

export async function upload_quit_claim_service(data) {
    const res = await axios.post("/api/upload_quit_claim", data);
    return res.data;
}

export async function send_exit_interview_service(data) {
    const res = await axios.post("/api/send_exit_interview", data);
    return res.data;
}

export async function approve_quit_claim_service(data) {
    const res = await axios.put(
        `/api/approve_quit_claim/${data.quit_claim.id}`,
        data
    );
    return res.data;
}

export async function decline_quit_claim_service(data) {
    const res = await axios.put(
        `/api/decline_quit_claim/${data.quit_claim.id}`,
        data
    );
    return res.data;
}

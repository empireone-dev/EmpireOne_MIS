import axios from "axios";

export async function get_job_offer_service() {
    const res = await axios.get(
        "/api/joboffer" + window.location.search ?? "?page=1"
    );
    return res.data;
}

export async function create_job_offer_service(data) {
    const res = await axios.post("/api/joboffer", data);
    return res.data;
}

export async function change_job_offer_service(data) {
    const res = await axios.put(
        "/api/joboffer/" + data.app_id + window.location.search,
        data
    );
    return res.data;
}

export async function proceed_direct_hire_service(data) {
    const res = await axios.put(`/api/proceed_direct_hire/${data.id}`, data);
    return res.data;
}

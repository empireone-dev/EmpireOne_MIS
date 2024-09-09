import axios from "axios";

export async function administrator_dashboard_service() {
    try {
        const res = await axios.get("/api/get_outsourcing_dashboard");
        const res1 = await axios.get("/api/get_applicant_dahsboard");

        return {
            outsourcing: res.data,
            another: res1.data
        };

        return res.data;
    } catch (error) {
        console.log("error", error);
    }
}


import axios from "axios";

export async function ai_interview_service(receipt) {
    try {
        const result = await axios.post("/api/ai_initial_interview", receipt);
        return result;
    } catch (error) {
        console.error("AI Interview Service Error:", error);
        throw error;
    }
}

export async function get_guide_questions_for_ai_service() {
    try {
        const result = await axios.get("/api/get_guide_questions_for_ai");
        return result;
    } catch (error) {
        console.error("Get Guide Questions Service Error:", error);
        throw error;
    }
}

export async function save_ai_interview_response_service(data) {
    try {
        const result = await axios.post("/api/save_ai_interview_response", data);
        return result;
    } catch (error) {
        console.error("Save AI Interview Response Service Error:", error);
        throw error;
    }
}

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

export async function saveInterviewRecordingService(formData) {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 600000, // 10 minute timeout for large uploads
            maxContentLength: 50 * 1024 * 1024, // 50MB max content length
            maxBodyLength: 50 * 1024 * 1024,    // 50MB max body length
            
            // Add progress tracking
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload progress: ${percentCompleted}%`);
            }
        };

        const result = await axios.post("/api/save_ai_interview_recording", formData, config);
        return result;
    } catch (error) {
        console.error("Save AI Interview Recording Service Error:", error);
        
        // Log more details about the error
        if (error.response) {
            console.error("Response status:", error.response.status);
            console.error("Response data:", error.response.data);
        }
        
        throw error;
    }
}

export async function getInterviewRecordingService(appId) {
    try {
        const result = await axios.get(`/api/get_ai_interview_recording/${appId}`);
        return result;
    } catch (error) {
        console.error("Get AI Interview Recording Service Error:", error);
        throw error;
    }
}

export async function get_ai_interview_results(appId) {
    try {
        const result = await axios.get(`/api/get_ai_interview_results/${appId}`);
        return result;
    } catch (error) {
        console.error("Get AI Interview Results Service Error:", error);
        throw error;
    }
}

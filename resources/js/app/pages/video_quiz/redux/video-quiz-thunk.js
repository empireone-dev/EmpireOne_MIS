import { create_video_quiz_service, get_video_quiz_by_emp_id_service, get_video_quiz_service } from "../../services/video-service";
import { videoQuizSlice } from "./video-quiz-slice";


export function create_video_quiz_thunk(data) {
  return async function (dispatch, getState) {
    const res = await create_video_quiz_service(data)

  };
}


export function get_video_quiz_thunk() {
  return async function (dispatch, getState) {
    const res = await get_video_quiz_service()
    dispatch(videoQuizSlice.actions.setVideoQuizzes(res.data.result));
  };
}


export function get_video_quiz_by_emp_id_thunk() {
  return async function (dispatch) {
    try {
      const res = await get_video_quiz_by_emp_id_service();
      console.log('resres', res.data);
      dispatch(videoQuizSlice.actions.setVideoQuizzes(res.data));
    } catch (error) {
      console.error("Error fetching video quiz:", error);
    }
  };
}


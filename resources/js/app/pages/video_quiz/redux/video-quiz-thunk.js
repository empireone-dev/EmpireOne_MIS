import { create_video_quiz_service, get_video_quiz_service } from "../../services/video-service";
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


// export function delete_video_quiz_thunk(id) {
//   return async function (dispatch, getState) {
//     const res = await delete_video_quiz_service(id)
//   };
// }
// export function get_outsourcing_erf_thunk(date) {
//   return async function (dispatch, getState) {
//     const res = await get_outsourcing_erf_service(date)
//     dispatch(video_quizSlice.actions.setErfCount(res.data));
//   };
// }

// export function get_outsourcing_erf_by_id_thunk(data) {
//   return async function (dispatch, getState) {
//     const res = await get_outsourcing_erf_by_id_service(data)
//     dispatch(video_quizSlice.actions.setErf(res.data));
//   };
// }

// export function update_erf_ja_thunk(data) {
//   return async function (dispatch, getState) {
//     const res = await update_erf_ja_service(data)
//     // dispatch(video_quizSlice.actions.setJa(res.data));
//   };
// }


// export function update_erf_jd_thunk(data) {
//   return async function (dispatch, getState) {
//     const res = await update_erf_jd_service(data)
//     // dispatch(video_quizSlice.actions.setJa(res.data));
//   };
// }

// export function update_video_quiz_thunk(data) {
//   return async function (dispatch, getState) {  
//     const res = await update_video_quiz_service(data)
//     // dispatch(video_quizSlice.actions.setvideo_quizs(result.data));
//   };
// }


import { get_guide_question_service, store_guide_question_service } from "@/app/pages/services/guide-question-service";
import { guideQuestionSlice } from "./guide-question-slice";

export function get_guide_question_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_guide_question_service()).data
    console.log('result',result)
    dispatch(guideQuestionSlice.actions.setGuideQuestions(result));
  };
}

export function store_guide_question_thunk(data) {
  return async function (dispatch, getState) {
    const result = await store_guide_question_service(data)
    dispatch(guideQuestionSlice.actions.setGuideQuestions(result.data));
    dispatch(guideQuestionSlice.actions.setGuideQuestionForm({}));
  };
}

export function update_guide_question_thunk(data) {
  return async function (dispatch, getState) {

   const result = await update_guide_question_thunk(data)
   dispatch(guideQuestionSlice.actions.setGuideQuestions(result.data));
  };
}
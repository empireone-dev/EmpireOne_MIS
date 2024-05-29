import { get_guide_question_service } from "@/app/pages/services/guide-question-service";
import { guideQuestionSlice } from "./guide-question-slice";

export function get_guide_question_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_guide_question_service()).data
    console.log('result',result)
    dispatch(guideQuestionSlice.actions.setGuideQuestions(result));
  };
}
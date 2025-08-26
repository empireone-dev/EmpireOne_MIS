import React from "react";
import InitialGuideQuestionComponent from "../components/initial-guide-question-component";
import { useDispatch, useSelector } from "react-redux";
import { setInitialRate } from "../redux/initial-rate-state";
import { QuestionCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";

export default function GuideQuestionSection() {
    const { guideqs } = useSelector((state) => state.guideqs);
    const { initialRate } = useSelector((state) => state.initial_rate);
    const dispatch = useDispatch();
    function handleRate(e) {
        if (e.target.checked) {
            dispatch(
                setInitialRate({
                    ...initialRate,
                    guideqss: [
                        ...initialRate.guideqss,
                        { question: e.target.value, answer: '' }
                    ],
                })
            );
        } else {
            const updated = initialRate.guideqss.filter(
                (res) => res.question !== e.target.value
            );
            dispatch(setInitialRate({ ...initialRate, guideqss: updated }));
        }
    }

    function handleAnswerChange(question, answer) {
        const updated = initialRate.guideqss.map((res) =>
            res.question === question ? { ...res, answer } : res
        );
        dispatch(setInitialRate({ ...initialRate, guideqss: updated }));
    }

    return (
        <div className="mt-3 w-full">
            <div className="flex items-center mt-6 mb-2">
                <QuestionCircleOutlined className="h-6" />
                <h1 className="text-2xl ml-1 font-bold w-full">GUIDE QUESTIONS:</h1>
            </div>
            <div className="flex flex-1 mt-2 w-full">
                <div className="w-full">
                    {guideqs.map((res, i) => {
                        const existing = initialRate.guideqss.find(
                            (g) => g.question === res.guideqs
                        );
                        return (
                            <InitialGuideQuestionComponent
                                key={i}
                                onChange={handleRate}
                                onAnswerChange={handleAnswerChange}
                                question={res.guideqs}
                                answer={existing?.answer || ''}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

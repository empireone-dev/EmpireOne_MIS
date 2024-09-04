import React from "react";
import InitialGuideQuestionComponent from "../components/initial-guide-question-component";
import { useDispatch, useSelector } from "react-redux";
import { setInitialRate } from "../redux/initial-rate-state";

export default function GuideQuestionSection() {
    const { guideqs } = useSelector((state) => state.guideqs);
    const { initialRate } = useSelector((state) => state.initial_rate);
    const dispatch = useDispatch();
    function handleRate(e) {
        if (e.target.checked) {
            dispatch(
                setInitialRate({
                    ...initialRate,
                    guideqss: [...initialRate.guideqss, e.target.value],
                })
            );
        } else {
            const ir = initialRate.guideqss.filter(
                (res) => res !== e.target.value
            );
            dispatch(
                setInitialRate({
                    ...initialRate,
                    guideqss: ir,
                })
            );
        }
    }
    return (
        <div className="mt-3">
            <h1>
                <b>Guide questions asked during the interview:</b>
            </h1>
            <div className="flex flex-1 gap-24 mt-2">
                <div>
                    {guideqs.map((res, i) => {
                        return (
                            <InitialGuideQuestionComponent
                            key={i}
                                onChange={handleRate}
                                question={res.guideqs}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

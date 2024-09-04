import { LightBulbIcon } from "@heroicons/react/24/outline";
import React from "react";
import InitialRateMarkComponent from "../components/initial-rate-mark-component";
import { useDispatch, useSelector } from "react-redux";
import { setInitialRate } from "../redux/initial-rate-state";

export default function ProblemSolvingSection() {
    const { initialRate } = useSelector((state) => state.initial_rate);
    const dispatch = useDispatch();
    function handleRate(e) {
        dispatch(
            setInitialRate({
                ...initialRate,
                [e.target.name]: e.target.value,
            })
        );
    }
    console.log('initialRate',initialRate)
    return (
        <div>
            <div className="flex items-center mt-6 mb-2">
                <LightBulbIcon className="h-6" />
                <h1 className="text-2xl ml-1 font-bold">
                    PROBLEM-SOLVING/SOUND JUDGEMENT
                </h1>
            </div>
            <hr className="mb-1.5"></hr>
            <div>
                <label htmlFor="">
                    <b>PROBLEM-SOLVING/SOUND JUDGEMENT SCORE</b>
                </label>
                <div className="flex flex-1 w-full gap-8 mt-1">
                    <InitialRateMarkComponent
                        onChange={handleRate}
                        rate="1 - Very Poor"
                        name="pscore"
                        value="1"
                    />
                    <InitialRateMarkComponent
                        onChange={handleRate}
                        rate="2 - Poor"
                        name="pscore"
                        value="2"
                    />
                    <InitialRateMarkComponent
                        onChange={handleRate}
                        rate="3 - Average"
                        name="pscore"
                        value="3"
                    />
                    <InitialRateMarkComponent
                        onChange={handleRate}
                        rate="4 - Good"
                        name="pscore"
                        value="4"
                    />
                    <InitialRateMarkComponent
                        onChange={handleRate}
                        rate="5 - Excellent"
                        name="pscore"
                        value="5"
                    />
                </div>
            </div>
            <div className="mt-6">
                <label htmlFor="">
                    <b>PROBLEM-SOLVING/SOUND JUDGEMENT NOTES</b>
                </label>
                <textarea
                    type="text"
                    onChange={handleRate}
                    name="pnotes"
                    placeholder=""
                    className="border p-2 rounded w-full mt-1 h-40"
                />
            </div>
        </div>
    );
}

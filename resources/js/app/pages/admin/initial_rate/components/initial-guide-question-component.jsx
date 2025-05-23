import { useState } from "react";

export default function InitialGuideQuestionComponent({ question, onChange, onAnswerChange, answer }) {
    const [checked, setChecked] = useState(!!answer);

    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked);
        onChange(e);
    };

    const handleAnswerChange = (e) => {
        onAnswerChange(question, e.target.value);
    };

    return (
        <div className='mb-4'>
            <div className='flex items-center mb-3 gap-1'>
                <input
                    onChange={handleCheckboxChange}
                    id="default-checkbox"
                    type="checkbox"
                    checked={checked}
                    value={question}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-black rounded focus:ring-blue-500 focus:ring-2"
                />
                <h1><b>{question}</b></h1>
            </div>

            {checked && (
                <textarea
                    className="w-full p-2 border rounded border-gray-400"
                    placeholder="Your answer..."
                    value={answer || ''}
                    onChange={handleAnswerChange}
                />
            )}
        </div>
    );
}

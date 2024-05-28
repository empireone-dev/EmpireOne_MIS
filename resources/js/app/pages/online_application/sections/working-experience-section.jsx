import React, { useState } from 'react';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

export default function WorkingExperienceSection() {
    const [workingExperiences, setWorkingExperiences] = useState([]);

    const addWorkingExperience = () => {
        setWorkingExperiences([...workingExperiences, { id: Date.now() }]);
    };

    const removeWorkingExperience = (id) => {
        const updatedExperiences = workingExperiences.filter(experience => experience.id !== id);
        setWorkingExperiences(updatedExperiences);
    };

    return (
        <div>
            <h1 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 mt-6">Working Experience</h1>
            <div className='mb-6 border rounded-lg p-4 relative'>
                <div className="mb-4 w-full">
                    <label htmlFor=""><b>Company</b></label>
                    <input type="text" placeholder="Company" className="border p-2 rounded w-full" />
                </div>
                <div className="mb-4 w-full">
                    <label htmlFor=""><b>Position</b></label>
                    <input type="text" placeholder="Position" className="border p-2 rounded w-full" />
                </div>
                <div className='flex flex-1 gap-4 mb-4'>
                    <div className="w-full">
                        <label htmlFor=""><b>Date Started</b></label>
                        <input type="date" placeholder="Date Started" className="border p-2 rounded w-full" />
                    </div>
                    <div className="w-full">
                        <label htmlFor=""><b>Date Ended</b></label>
                        <input type="date" placeholder="Date Ended" className="border p-2 rounded w-full" />
                    </div>
                </div>
            </div>

            {workingExperiences.map((experience) => (
                <div key={experience.id} className="mb-6 border rounded-lg p-4 relative">
                    <button
                        className="absolute top-2.5 right-3.5 bg-transparent border-0 cursor-pointer"
                        onClick={() => removeWorkingExperience(experience.id)}
                    >
                        <CloseOutlined />
                    </button>

                    <div className="mb-4 w-full">
                        <label htmlFor=""><b>Company</b></label>
                        <input type="text" placeholder="Company" className="border p-2 rounded w-full" />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor=""><b>Position</b></label>
                        <input type="text" placeholder="Position" className="border p-2 rounded w-full" />
                    </div>
                    <div className='flex flex-1 gap-4 mb-4'>
                        <div className="w-full">
                            <label htmlFor=""><b>Date Started</b></label>
                            <input type="date" placeholder="Date Started" className="border p-2 rounded w-full" />
                        </div>
                        <div className="w-full">
                            <label htmlFor=""><b>Date Ended</b></label>
                            <input type="date" placeholder="Date Ended" className="border p-2 rounded w-full" />
                        </div>
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={addWorkingExperience}
                className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center inline-flex items-center me-2 mb-2 w-full"
            >
                <PlusOutlined />&nbsp;
                Add Another Working Experience
            </button>
        </div>
    );
}

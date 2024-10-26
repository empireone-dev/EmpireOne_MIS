import React, { useState } from "react";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../_components/input";
import { setApplicantForm } from "../../admin/recruitment/applicants/applicant_records/redux/applicant-slice";

export default function WorkingExperienceSection() {
    const { applicantForm } = useSelector((state) => state.applicants);
    const dispatch = useDispatch();
    // const [workingExperiences, setApplicantForm] = useState([]);

    const addWorkingExperience = () => {
        const newExperience = {
            id: Date.now(), // Ensure each new experience has a unique id
            company: "",
            position: "",
            started_at: "",
            end_at: "",
        };
        const updatedExperiences = [
            ...applicantForm?.work_experience,
            newExperience,
        ];
        dispatch(
            setApplicantForm({
                ...applicantForm,
                work_experience: updatedExperiences,
            })
        );
    };

    const removeWorkingExperience = (id) => {
        const updatedExperiences = applicantForm?.work_experience.filter(
            (experience) => experience.id !== id
        );
        dispatch(
            setApplicantForm({
                ...applicantForm,
                work_experience: updatedExperiences,
            })
        );
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedExperiences = [...applicantForm?.work_experience];
        updatedExperiences[index] = {
            ...updatedExperiences[index],
            [name]: value,
        };
        dispatch(
            setApplicantForm({
                ...applicantForm,
                work_experience: updatedExperiences,
            })
        );
    };
    return (
        <div>
            <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-6">
                Working Experience
            </h1>
            {applicantForm?.work_experience.map((experience, index) => (
                <div
                    key={index}
                    className="mb-6 border-2 border-gray-500 rounded-lg p-7 pb-1 relative"
                >
                    <div className="mb-4 w-full">
                        <Input
                            onChange={(event) =>
                                handleInputChange(index, event)
                            }
                            value={experience.company ?? ""}
                            name="company"
                            label="Company"
                            type="text"
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <Input
                            onChange={(event) =>
                                handleInputChange(index, event)
                            }
                            value={experience.position ?? ""}
                            name="position"
                            label="Position"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-1 gap-4 mb-4">
                        <div className="w-full">
                            <Input
                                onChange={(event) =>
                                    handleInputChange(index, event)
                                }
                                value={experience.started_at ?? ""}
                                name="started_at"
                                label="Started At"
                                type="date"
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                onChange={(event) =>
                                    handleInputChange(index, event)
                                }
                                value={experience.end_at ?? ""}
                                name="end_at"
                                label="End At"
                                type="date"
                            />
                        </div>
                    </div>

                    <div className="flex flex-1 gap-4 mb-4">
                        <button
                            type="button"
                            onClick={() =>
                                removeWorkingExperience(experience.id)
                            }
                            className="absolute -top-1 right-2 mt-2 text-md text-red-500 hover:text-red-700"
                        >
                            <CloseOutlined />
                        </button>
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={()=>addWorkingExperience()}
                className="text-gray-900 bg-white hover:bg-gray-300 border border-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center inline-flex items-center me-2 mb-2 w-full"
            >
                <PlusOutlined />
                &nbsp; Add Another Working Experience
            </button>
        </div>
    );
}

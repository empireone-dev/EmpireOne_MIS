import store from "@/app/store/store";
import { message } from "antd";
import { useState } from "react";
import { create_video_quiz_thunk } from "../redux/video-quiz-thunk";

export default function RegisterFormComponents({ type, onSubmitSuccess }) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        emp_id: "",
        name: "",
        email: "",
        type: type || '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                create_video_quiz_thunk({
                    ...form,
                    type: type,
                })
            );
            message.success("You may now proceed!");

            // ✅ Notify parent component that form submission succeeded
            if (onSubmitSuccess) {
                onSubmitSuccess();
            }
        } catch (error) {
            message.error("Failed to add information. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Please Fillout the Form
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                value={form.name}
                                name="name"
                                type="text"
                                required
                                autoComplete="name"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="emp_id" className="block text-sm/6 font-medium text-gray-900">
                            Employee ID
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) =>
                                    setForm({ ...form, emp_id: e.target.value })
                                }
                                value={form.emp_id}
                                name="emp_id"
                                type="number"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                                value={form.email}
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {loading ? "Submitting..." : "Proceed"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

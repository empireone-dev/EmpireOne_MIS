import React from "react";

export default function Input2({
    register,
    label,
    type = "text",
    errorMessage,
}) {
    return (
        <div className="w-full">
            <div className="relative">
                <input
                    {...register}
                    type={type}
                    id={register?.name}
                    className={`peer pl-8 text-black placeholder-transparent w-full rounded-md py-2.5 px-5 border-gray-500 border bg-transparent bg-white focus-within:outline-none focus-within:border-blue-500 ${errorMessage ? "border-red-500" : ""
                        }`}
                    placeholder=""
                />
                <label
                    htmlFor={register?.name}
                    className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white"
                >
                    {label}
                </label>
            </div>
            {errorMessage && (
                <span className="text-red-500 text-sm mt-1">
                    {errorMessage}
                </span>
            )}
        </div>
    );
}

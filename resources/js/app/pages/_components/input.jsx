// FIXED Input Component
export default function Input({
    name,
    label,
    type = "text",
    value,
    onChange,
    errorMessage,
    required,
}) {
    return (
        <div className="w-full">
            <div className="relative">
                <input
                    name={name} // ✅ this is required
                    value={value} // ✅ this binds it to state
                    onChange={onChange} // ✅ this sends events
                    type={type}
                    required={required ?? false}
                    id={name}
                    className={`peer pl-8 text-black placeholder-transparent w-full rounded-md py-2.5 px-5 border-gray-500 border bg-transparent bg-white focus-within:outline-none focus-within:border-blue-500 ${errorMessage ? "border-red-500" : ""
                        }`}
                    placeholder=""
                />
                <label
                    htmlFor={name}
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

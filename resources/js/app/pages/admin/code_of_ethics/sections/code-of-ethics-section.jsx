import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useSelector } from "react-redux";
import { get_ethics_acknowledge_service, submit_ethics_acknowledge_service } from "@/app/pages/services/ethics-acknowledge-service";

export default function CodeOfEthicsSection() {
    const sigPadRef = useRef(null);
    const { user } = useSelector((state) => state.app);

    const [hasAcknowledged, setHasAcknowledged] = useState(false);
    const [existingAck, setExistingAck] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState(null);

    const emp_id = user?.employee_id ?? null;
    const emp_fname = user?.employee_fname ?? "";
    const emp_lname = user?.employee_lname ?? "";
    const emp_name = `${emp_fname} ${emp_lname}`.trim();

    const storedSignature = user?.e_signature?.signature ?? null;

    useEffect(() => {
        if (!emp_id) {
            setChecking(false);
            return;
        }
        get_ethics_acknowledge_service(emp_id)
            .then((res) => {
                if (res?.data) {
                    setExistingAck(res.data);
                    setHasAcknowledged(true);
                }
            })
            .finally(() => setChecking(false));
    }, [emp_id]);

    const clearSignature = () => {
        sigPadRef.current?.clear();
    };

    const handleSubmit = async () => {
        setError(null);
        if (!agreed) {
            setError("Please check the acknowledgment checkbox first.");
            return;
        }

        let signature = storedSignature;

        if (!signature) {
            if (!sigPadRef.current || sigPadRef.current.isEmpty()) {
                setError("Please provide your e-signature before submitting.");
                return;
            }
            signature = sigPadRef.current.toDataURL();
        }

        setLoading(true);
        try {
            const res = await submit_ethics_acknowledge_service({
                emp_id,
                emp_name,
                signature,
            });
            setExistingAck(res.data);
            setHasAcknowledged(true);
        } catch {
            setError("Failed to submit acknowledgment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (checking) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500 text-sm">
                Loading...
            </div>
        );
    }

    if (hasAcknowledged && existingAck) {
        return (
            <div className="w-full mt-8 p-6 bg-white rounded-lg shadow-md border border-green-200">
                <div className="flex items-center justify-center mb-4">
                    <img
                        className="w-48"
                        src="/images/newlogo.png"
                        alt="logo"
                    />
                </div>
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm mb-3">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        Acknowledged
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                        Code of Ethics
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Acknowledged by{" "}
                        <span className="font-semibold">
                            {existingAck.emp_name}
                        </span>{" "}
                        on{" "}
                        {new Date(
                            existingAck.acknowledged_at,
                        ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="border border-gray-300 rounded p-2 bg-gray-50">
                        <p className="text-xs text-gray-400 text-center mb-1">
                            E-Signature
                        </p>
                        <img
                            src={existingAck.signature}
                            alt="E-Signature"
                            className="max-h-24 object-contain"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mb-10 px-4">
            <p className="text-sm text-gray-500 text-center mb-4">
                <i>Please read the Code of Ethics carefully before signing.</i>
            </p>

            {/* PDF Viewer */}
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm mb-6">
                <iframe
                    src="/documents/code-of-ethics.pdf"
                    title="Code of Ethics"
                    className="w-full"
                    style={{ height: "1500px" }}
                />
            </div>

            {/* Acknowledgment Checkbox */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-5">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        className="mt-0.5 w-4 h-4 accent-blue-600 flex-shrink-0"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <span className="text-sm text-gray-700 leading-snug">
                        I,{" "}
                        <span className="font-semibold">
                            {emp_name || "Employee"}
                        </span>
                        , hereby acknowledge that I have read, understood, and
                        agree to comply with the{" "}
                        <span className="font-semibold">Code of Ethics</span> of
                        EmpireOne BPO Solutions Inc. I understand that any
                        violation of these ethical standards may result in
                        disciplinary action.
                    </span>
                </label>
            </div>

            {/* Signature Section */}
            {storedSignature ? (
                <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm mb-5">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                        E-Signature
                    </p>
                    <p className="text-xs text-gray-400 mb-3">
                        Your registered e-signature will be used for this
                        acknowledgment.
                    </p>
                    <div className="inline-block border border-gray-200 rounded bg-gray-50 p-2">
                        <img
                            src={storedSignature}
                            alt="Your E-Signature"
                            className="max-h-24 object-contain"
                        />
                    </div>
                    <div className="text-gray-400 text-xs">
                        <i>
                            If you wish to use a different signature, please
                            update your e-signature in your profile settings.
                        </i>
                    </div>
                </div>
            ) : (
                <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm mb-5">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                        E-Signature
                    </p>
                    <p className="text-xs text-gray-400 mb-3">
                        You don't have a registered signature. Please sign in
                        the box below using your mouse, trackpad, or touch
                        screen. Or go to your profile settings to set up a
                        default e-signature for future use.
                    </p>
                    <SignatureCanvas
                        ref={sigPadRef}
                        penColor="black"
                        canvasProps={{
                            style: {
                                width: "100%",
                                height: "180px",
                                border: "2px solid #d1d5db",
                                borderRadius: "6px",
                                backgroundColor: "#f9fafb",
                            },
                        }}
                    />
                    <div className="mt-2">
                        <button
                            type="button"
                            onClick={clearSignature}
                            className="text-xs text-red-500 hover:text-red-700 underline"
                        >
                            Clear signature
                        </button>
                    </div>
                </div>
            )}

            {/* Error banner */}
            {error && (
                <div className="mb-4 bg-red-50 border border-red-300 text-red-700 text-sm rounded-lg px-4 py-3">
                    {error}
                </div>
            )}

            {/* Submit */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                    {loading && (
                        <svg
                            className="w-4 h-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                            />
                        </svg>
                    )}
                    {loading ? "Submitting..." : "Submit Acknowledgment"}
                </button>
            </div>
        </div>
    );
}

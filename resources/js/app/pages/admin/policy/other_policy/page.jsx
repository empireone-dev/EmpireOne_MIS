import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AdminLayout from "../../admin-layout";
import { useSelector } from "react-redux";
import { get_user_thunk } from "@/app/redux/app-thunk";
import store from "@/app/store/store";

const policies = [
    {
        id: 1,
        name: "Anti-Discrimination Policy",
        file: "ANTI-DISCRIMINATION POLICY v1.pdf",
        category: "Workplace",
    },
    {
        id: 2,
        name: "Background Check Policy",
        file: "Background Check Policy v1.pdf",
        category: "Recruitment",
    },
    {
        id: 3,
        name: "DOLE Workplace Policy",
        file: "DOLE Workplace Policy v1.pdf",
        category: "Workplace",
    },
    {
        id: 4,
        name: "Dress Code Policy",
        file: "Dress Code Policy v1.pdf",
        category: "Workplace",
    },
    {
        id: 5,
        name: "Employment Status Conversion",
        file: "Employment Status Conversion v1.pdf",
        category: "Employment",
    },
    {
        id: 6,
        name: "Grievance & Disciplinary Policy",
        file: "Grievance Mechanism and Disciplinary Policy v1.pdf",
        category: "Workplace",
    },
    {
        id: 7,
        name: "Internet Usage Policy",
        file: "Internet Usage Policy v1.pdf",
        category: "Workplace",
    },
    {
        id: 8,
        name: "Leave Administration Policy",
        file: "Leave Administration Policy v1.pdf",
        category: "Benefits",
    },
    {
        id: 9,
        name: "Non-Certification Training Fall-Out",
        file: "Non-Certification Training Fall-Out v1.pdf",
        category: "Training",
    },
    {
        id: 10,
        name: "Official Business Travel Policy",
        file: "Official Business Travel Policy v1.pdf",
        category: "Operations",
    },
    {
        id: 11,
        name: "Overtime Work During Business Exigencies",
        file: "Overtime Work During Business Exigencies v1.pdf",
        category: "Compensation",
    },
    {
        id: 12,
        name: "Performance Improvement Plan (PIP)",
        file: "Performance Improvement Plan (PIP) v1.pdf",
        category: "Performance",
    },
    {
        id: 13,
        name: "PEME Policy",
        file: "Pre-Employment Medical Examination (PEME) Policy v1.pdf",
        category: "Recruitment",
    },
    {
        id: 14,
        name: "Probationary & Regularization Policy",
        file: "Probationary Employment, Appraisal, and Regularization Policy v1.pdf",
        category: "Employment",
    },
    {
        id: 15,
        name: "Remote Work Policy",
        file: "Remote Work Policy v1.pdf",
        category: "Workplace",
    },
    {
        id: 16,
        name: "Resignation and Termination",
        file: "Resignation and Termination v1.pdf",
        category: "Employment",
    },
    {
        id: 17,
        name: "Shift Changes & OT Compliance",
        file: "SHIFT CHANGES, SCHEDULE ADJUSTMENT & OVERTIME COMPLIANCE.pdf",
        category: "Compensation",
    },
    {
        id: 18,
        name: "Social Media Policy",
        file: "Social Media Policy v1.pdf",
        category: "Workplace",
    },
    {
        id: 19,
        name: "Working Hours, OT & Rest Days",
        file: "WORKING HOURS, OVERTIME & REST DAYS v1.pdf",
        category: "Compensation",
    },
];

const categoryColors = {
    Workplace: "bg-blue-100 text-blue-700",
    Recruitment: "bg-purple-100 text-purple-700",
    Employment: "bg-orange-100 text-orange-700",
    Benefits: "bg-green-100 text-green-700",
    Training: "bg-yellow-100 text-yellow-700",
    Operations: "bg-cyan-100 text-cyan-700",
    Compensation: "bg-red-100 text-red-700",
    Performance: "bg-pink-100 text-pink-700",
};

export default function page() {
    const { user } = useSelector((state) => state.app);
    const [activeId, setActiveId] = useState(1);
    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [policyList, setPolicyList] = useState(() => {
        try {
            const saved = localStorage.getItem("uploaded_policies");
            const uploaded = saved ? JSON.parse(saved) : [];
            return [...policies, ...uploaded];
        } catch {
            return policies;
        }
    });

    useEffect(() => {
        store.dispatch(get_user_thunk());
    }, []);

    // Persist uploaded policies (those not in the static list) to localStorage
    useEffect(() => {
        const staticIds = new Set(policies.map((p) => p.id));
        const uploaded = policyList.filter((p) => !staticIds.has(p.id));
        localStorage.setItem("uploaded_policies", JSON.stringify(uploaded));
    }, [policyList]);
    const [uploadModal, setUploadModal] = useState(false);
    const [confirmRemoveId, setConfirmRemoveId] = useState(null);
    const [uploadState, setUploadState] = useState({
        file: null,
        name: "",
        category: "Workplace",
        loading: false,
        error: "",
    });
    const fileInputRef = useRef(null);

    const activePolicy = policyList.find((p) => p.id === activeId);

    const filteredPolicies = policyList.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
    );

    const handleSelectPolicy = (id) => {
        setActiveId(id);
        setSidebarOpen(false);
    };

    const handleUploadFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.type !== "application/pdf") {
            setUploadState((prev) => ({
                ...prev,
                error: "Only PDF files are allowed.",
                file: null,
            }));
            return;
        }
        if (file.size > 51200 * 1024) {
            setUploadState((prev) => ({
                ...prev,
                error: "File must be under 50MB.",
                file: null,
            }));
            return;
        }
        const suggestedName = file.name
            .replace(/\.pdf$/i, "")
            .replace(/_/g, " ");
        setUploadState((prev) => ({
            ...prev,
            file,
            name: prev.name || suggestedName,
            error: "",
        }));
    };

    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        const { file, name, category } = uploadState;
        if (!file)
            return setUploadState((prev) => ({
                ...prev,
                error: "Please select a PDF file.",
            }));
        if (!name.trim())
            return setUploadState((prev) => ({
                ...prev,
                error: "Please enter a policy name.",
            }));

        setUploadState((prev) => ({ ...prev, loading: true, error: "" }));
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", name.trim());
            formData.append("category", category);

            const res = await axios.post(
                "/api/policy_document/upload",
                formData,
            );
            const newPolicy = {
                id: Date.now(),
                name: res.data.name,
                file: res.data.file,
                category: res.data.category,
            };
            setPolicyList((prev) => {
                const updated = [...prev, newPolicy];
                return updated;
            });
            setActiveId(newPolicy.id);
            setUploadModal(false);
            setUploadState({
                file: null,
                name: "",
                category: "Workplace",
                loading: false,
                error: "",
            });
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.errors?.file?.[0] ||
                "Upload failed. Please try again.";
            setUploadState((prev) => ({ ...prev, loading: false, error: msg }));
        }
    };

    const handleCloseModal = () => {
        if (uploadState.loading) return;
        setUploadModal(false);
        setUploadState({
            file: null,
            name: "",
            category: "Workplace",
            loading: false,
            error: "",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleRemovePolicy = async () => {
        const policy = policyList.find((p) => p.id === confirmRemoveId);
        const remaining = policyList.filter((p) => p.id !== confirmRemoveId);
        const wasActive = activeId === confirmRemoveId;
        // Optimistically update UI
        setPolicyList(remaining);
        setConfirmRemoveId(null);
        if (wasActive && remaining.length > 0) setActiveId(remaining[0].id);
        // Delete the file from the server
        if (policy?.file) {
            try {
                await axios.delete("/api/policy_document/delete", {
                    data: { file: policy.file },
                });
            } catch {
                // File deletion failure is non-critical; list is already updated
            }
        }
        // localStorage is updated automatically via the useEffect above
    };

    const sidebarContent = (
        <>
            <div className="px-4 py-4 border-b border-gray-200">
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                    Company Policies
                </h2>
                <div className="relative mb-2">
                    <svg
                        className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search policies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
                {user?.role_id === 1 && (
                    <button
                        onClick={() => setUploadModal(true)}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                        <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                        </svg>
                        Upload Policy PDF
                    </button> 
                )}
            </div>
            <div className="flex-1 overflow-y-auto py-2">
                {filteredPolicies.length === 0 ? (
                    <p className="px-4 py-6 text-xs text-gray-400 text-center">
                        No policies found.
                    </p>
                ) : (
                    filteredPolicies.map((policy) => (
                        <div
                            key={policy.id}
                            className={`group relative flex items-stretch border-b border-gray-100 transition-colors duration-100 ${
                                activeId === policy.id
                                    ? "bg-blue-600 border-blue-600"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            <button
                                onClick={() => handleSelectPolicy(policy.id)}
                                className="flex-1 text-left px-4 py-3"
                            >
                                <div className="flex items-start gap-2">
                                    <svg
                                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                            activeId === policy.id
                                                ? "text-blue-200"
                                                : "text-gray-400"
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className={`text-xs font-medium leading-snug ${
                                                activeId === policy.id
                                                    ? "text-white"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {policy.name}
                                        </p>
                                        <span
                                            className={`inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                                                activeId === policy.id
                                                    ? "bg-blue-500 text-blue-100"
                                                    : categoryColors[
                                                          policy.category
                                                      ]
                                            }`}
                                        >
                                            {policy.category}
                                        </span>
                                    </div>
                                </div>
                            </button>
                            {user?.role_id === 1 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setConfirmRemoveId(policy.id);
                                    }}
                                    title="Remove policy"
                                    className={`flex-shrink-0 px-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                                        activeId === policy.id
                                            ? "text-blue-200 hover:text-white"
                                            : "text-gray-400 hover:text-red-500"
                                    }`}
                                >
                                    <svg
                                        className="w-3.5 h-3.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                <p className="text-[10px] text-gray-400 text-center">
                    {policyList.length} policies available
                </p>
            </div>
        </>
    );

    return (
        <AdminLayout>
            <div className="mx-4 mb-6">
                {/* Mobile drawer overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Mobile drawer */}
                <div
                    className={`fixed inset-y-0 left-0 z-40 w-72 bg-gray-50 flex flex-col shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
                        sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="flex items-center justify-between px-4 pt-4 pb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Policies
                        </span>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-1.5 rounded-md hover:bg-gray-200 text-gray-500"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    {sidebarContent}
                </div>

                {/* Main container */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col lg:flex-row lg:h-[calc(100vh-120px)]">
                    {/* Desktop sidebar */}
                    <div className="hidden lg:flex w-64 flex-shrink-0 flex-col border-r border-gray-200 bg-gray-50">
                        {sidebarContent}
                    </div>

                    {/* Content area */}
                    <div className="flex-1 flex flex-col min-w-0">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-white flex-shrink-0">
                            <div className="flex items-center gap-3 min-w-0">
                                {/* Mobile menu button */}
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden flex-shrink-0 p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                                <div className="min-w-0">
                                    <h1 className="text-sm sm:text-base font-bold text-gray-800 truncate">
                                        {activePolicy?.name}
                                    </h1>
                                    <span
                                        className={`inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                            categoryColors[
                                                activePolicy?.category
                                            ]
                                        }`}
                                    >
                                        {activePolicy?.category}
                                    </span>
                                </div>
                            </div>
                            <img
                                className="w-16 sm:w-24 flex-shrink-0 ml-3"
                                src="/images/newlogo.png"
                                alt="logo"
                            />
                        </div>

                        {/* Mobile policy selector (dropdown) */}
                        <div className="lg:hidden px-4 py-2 border-b border-gray-100 bg-gray-50">
                            <select
                                value={activeId}
                                onChange={(e) =>
                                    setActiveId(Number(e.target.value))
                                }
                                className="w-full text-xs border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                {policyList.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* PDF Viewer */}
                        <div className="flex-1 overflow-hidden min-h-[60vh] lg:min-h-0">
                            <iframe
                                key={activePolicy?.id}
                                src={`/documents/${encodeURIComponent(activePolicy?.file)}`}
                                title={activePolicy?.name}
                                className="w-full h-full border-0"
                                style={{ minHeight: "60vh" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirm Remove Modal */}
            {confirmRemoveId !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-800">
                                    Remove Policy
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {
                                        policyList.find(
                                            (p) => p.id === confirmRemoveId,
                                        )?.name
                                    }
                                </p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-5">
                            This will permanently remove the policy from the
                            list.
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setConfirmRemoveId(null)}
                                className="flex-1 py-2 text-xs font-semibold text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRemovePolicy}
                                className="flex-1 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Policy Modal */}
            {uploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                            <h3 className="text-sm font-bold text-gray-800">
                                Upload Policy PDF
                            </h3>
                            <button
                                onClick={handleCloseModal}
                                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
                                disabled={uploadState.loading}
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form
                            onSubmit={handleUploadSubmit}
                            className="px-5 py-4 space-y-4"
                        >
                            {/* Policy Name */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                    Policy Name{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={uploadState.name}
                                    onChange={(e) =>
                                        setUploadState((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                    placeholder="e.g. New HR Policy"
                                    className="w-full text-xs border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    disabled={uploadState.loading}
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                    Category{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={uploadState.category}
                                    onChange={(e) =>
                                        setUploadState((prev) => ({
                                            ...prev,
                                            category: e.target.value,
                                        }))
                                    }
                                    className="w-full text-xs border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    disabled={uploadState.loading}
                                >
                                    {Object.keys(categoryColors).map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* File Input */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                    PDF File{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        const dropped = e.dataTransfer.files[0];
                                        if (dropped) {
                                            const synth = {
                                                target: { files: [dropped] },
                                            };
                                            handleUploadFileChange(synth);
                                        }
                                    }}
                                >
                                    {uploadState.file ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <svg
                                                className="w-5 h-5 text-red-500 flex-shrink-0"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                            <span className="text-xs text-gray-700 truncate max-w-[200px]">
                                                {uploadState.file.name}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setUploadState((prev) => ({
                                                        ...prev,
                                                        file: null,
                                                    }));
                                                    if (fileInputRef.current)
                                                        fileInputRef.current.value =
                                                            "";
                                                }}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <svg
                                                    className="w-3.5 h-3.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <svg
                                                className="mx-auto w-8 h-8 text-gray-300 mb-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                                />
                                            </svg>
                                            <p className="text-xs text-gray-500">
                                                Click or drag &amp; drop a PDF
                                                here
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">
                                                PDF only, max 50MB
                                            </p>
                                        </>
                                    )}
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    onChange={handleUploadFileChange}
                                    disabled={uploadState.loading}
                                />
                            </div>

                            {/* Error */}
                            {uploadState.error && (
                                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                                    {uploadState.error}
                                </p>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    disabled={uploadState.loading}
                                    className="flex-1 py-2 text-xs font-semibold text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploadState.loading}
                                    className="flex-1 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-60 flex items-center justify-center gap-1.5"
                                >
                                    {uploadState.loading ? (
                                        <>
                                            <svg
                                                className="w-3.5 h-3.5 animate-spin"
                                                fill="none"
                                                viewBox="0 0 24 24"
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
                                                    d="M4 12a8 8 0 018-8v8H4z"
                                                />
                                            </svg>
                                            Uploading...
                                        </>
                                    ) : (
                                        "Upload Policy"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

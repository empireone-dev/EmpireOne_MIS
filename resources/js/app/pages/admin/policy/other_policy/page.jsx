import React, { useState } from "react";
import AdminLayout from "../../admin-layout";

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
    const [activeId, setActiveId] = useState(1);
    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const activePolicy = policies.find((p) => p.id === activeId);

    const filteredPolicies = policies.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelectPolicy = (id) => {
        setActiveId(id);
        setSidebarOpen(false);
    };

    const sidebarContent = (
        <>
            <div className="px-4 py-4 border-b border-gray-200">
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                    Company Policies
                </h2>
                <div className="relative">
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
            </div>
            <div className="flex-1 overflow-y-auto py-2">
                {filteredPolicies.length === 0 ? (
                    <p className="px-4 py-6 text-xs text-gray-400 text-center">
                        No policies found.
                    </p>
                ) : (
                    filteredPolicies.map((policy) => (
                        <button
                            key={policy.id}
                            onClick={() => handleSelectPolicy(policy.id)}
                            className={`w-full text-left px-4 py-3 border-b border-gray-100 transition-colors duration-100 ${
                                activeId === policy.id
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "hover:bg-gray-100 text-gray-700"
                            }`}
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
                                    <p className="text-xs font-medium leading-snug">
                                        {policy.name}
                                    </p>
                                    <span
                                        className={`inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                                            activeId === policy.id
                                                ? "bg-blue-500 text-blue-100"
                                                : categoryColors[policy.category]
                                        }`}
                                    >
                                        {policy.category}
                                    </span>
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                <p className="text-[10px] text-gray-400 text-center">
                    {policies.length} policies available
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
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                                <div className="min-w-0">
                                    <h1 className="text-sm sm:text-base font-bold text-gray-800 truncate">
                                        {activePolicy?.name}
                                    </h1>
                                    <span
                                        className={`inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                            categoryColors[activePolicy?.category]
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
                                onChange={(e) => setActiveId(Number(e.target.value))}
                                className="w-full text-xs border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                {policies.map((p) => (
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
        </AdminLayout>
    );
}

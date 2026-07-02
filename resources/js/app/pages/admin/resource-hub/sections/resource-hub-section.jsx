import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    ArrowTopRightOnSquareIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import AddResourceHubSection from "./add-resource-hub-section";
import { message } from "antd";

const colorMap = {
    blue: { badge: "bg-blue-100 text-blue-700", icon: "text-blue-500", border: "border-blue-200", dot: "bg-blue-500" },
    green: { badge: "bg-green-100 text-green-700", icon: "text-green-500", border: "border-green-200", dot: "bg-green-500" },
    purple: { badge: "bg-purple-100 text-purple-700", icon: "text-purple-500", border: "border-purple-200", dot: "bg-purple-500" },
    red: { badge: "bg-red-100 text-red-700", icon: "text-red-500", border: "border-red-200", dot: "bg-red-500" },
    orange: { badge: "bg-orange-100 text-orange-700", icon: "text-orange-500", border: "border-orange-200", dot: "bg-orange-500" },
    teal: { badge: "bg-teal-100 text-teal-700", icon: "text-teal-500", border: "border-teal-200", dot: "bg-teal-500" },
};

export default function ResourceHubSection() {
    const [search, setSearch] = useState("");
    const [resourceList, setResourceList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addModalOpen, setAddModalOpen] = useState(false);

    // Group flat API records into { category, color, items[] }
    const groupItems = (flat) => {
        const map = {};
        flat.forEach((item) => {
            if (!map[item.category]) {
                map[item.category] = { category: item.category, color: item.color, items: [] };
            }
            map[item.category].items.push(item);
        });
        return Object.values(map);
    };

    useEffect(() => {
        axios.get("/api/resource_hub")
            .then((res) => setResourceList(groupItems(res.data.data)))
            .catch(() => message.error("Failed to load resources."))
            .finally(() => setLoading(false));
    }, []);

    const handleAdd = async ({ category, color, item }) => {
        try {
            const res = await axios.post("/api/resource_hub", {
                ...item,
                category,
                color,
            });
            const saved = res.data.data;
            setResourceList((prev) => {
                const existing = prev.find((c) => c.category === category);
                if (existing) {
                    return prev.map((c) =>
                        c.category === category
                            ? { ...c, items: [...c.items, saved] }
                            : c,
                    );
                }
                return [...prev, { category, color, items: [saved] }];
            });
            message.success("Resource added.");
        } catch {
            message.error("Failed to add resource.");
        }
    };

    const handleDelete = async (itemId, category) => {
        try {
            await axios.delete(`/api/resource_hub/${itemId}`);
            setResourceList((prev) =>
                prev
                    .map((c) =>
                        c.category === category
                            ? { ...c, items: c.items.filter((i) => i.id !== itemId) }
                            : c,
                    )
                    .filter((c) => c.items.length > 0),
            );
            message.success("Resource removed.");
        } catch {
            message.error("Failed to delete resource.");
        }
    };

    const filtered = resourceList
        .map((cat) => ({
            ...cat,
            items: cat.items.filter(
                (item) =>
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.description
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    cat.category.toLowerCase().includes(search.toLowerCase()),
            ),
        }))
        .filter((cat) => cat.items.length > 0);

    return (
        <div className="p-6 max-w-full mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Resource Hub
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    Quick access to all work-related tools, portals, and
                    resources.
                </p>
            </div>

            {/* Search + Add */}
            <div className="flex items-center gap-3 mb-8">
            <div className="relative max-w-md flex-1">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search resources..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-white"
                />
            </div>
            <button
                onClick={() => setAddModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0"
            >
                <PlusIcon className="h-4 w-4" />
                Add Resource
            </button>
            </div>

            <AddResourceHubSection
                open={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                onAdd={handleAdd}
                existingCategories={resourceList.map((c) => ({
                    name: c.category,
                    color: c.color,
                }))}
            />

            {/* Categories */}
            {loading ? (
                <div className="text-center py-16 text-gray-400 text-sm">Loading resources...</div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <p className="text-base">
                        {search ? `No resources found for "${search}"` : "No resources yet. Click \"Add Resource\" to get started."}
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {filtered.map((cat) => {
                        const colors = colorMap[cat.color] ?? colorMap.blue;
                        return (
                            <div key={cat.category}>
                                <div className="flex items-center gap-2 mb-3">
                                    <span
                                        className={`w-2 h-2 rounded-full ${colors.dot}`}
                                    />
                                    <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        {cat.category}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {cat.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`group relative bg-white rounded-xl border ${colors.border} shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col gap-2`}
                                        >
                                            {/* Delete button */}
                                            <button
                                                onClick={() => handleDelete(item.id, cat.category)}
                                                className="absolute top-2 right-2 p-1 rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                                                title="Remove resource"
                                            >
                                                <TrashIcon className="h-3.5 w-3.5" />
                                            </button>

                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex flex-col gap-2 flex-1"
                                            >
                                                <div className="flex items-start justify-between pr-4">
                                                    <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                                                        {item.name}
                                                    </span>
                                                    <ArrowTopRightOnSquareIcon
                                                        className={`h-4 w-4 flex-shrink-0 ml-2 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity ${colors.icon}`}
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-500 leading-relaxed">
                                                    {item.description}
                                                </p>
                                                <span
                                                    className={`self-start text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}
                                                >
                                                    {cat.category}
                                                </span>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

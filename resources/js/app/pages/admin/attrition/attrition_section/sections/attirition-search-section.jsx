import { XMarkIcon } from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function AttritionSearchSection() {
    const [search, setSearch] = useState("");
    const params = new URLSearchParams(window.location.search);
    params.set("searching", search);

    const url = window.location.pathname + window.location.search;

    const getQueryParam = (url, paramName) => {
        const searchParams = new URLSearchParams(url.split("?")[1]);
        return searchParams.get(paramName);
    };

    const searching = getQueryParam(url, "searching");
    // const categories = getQueryParam(url, "categories");

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    useEffect(() => {
        setSearch(searching);
    }, [searching]);

    function search_data(e) {
        e.preventDefault();
        if (search.trim() === '') {
            // If search is empty, remove the searching parameter
            router.visit(window.location.pathname);
        } else {
            router.visit(window.location.pathname + '?searching=' + encodeURIComponent(search));
        }
    }

    return (
        <form onSubmit={search_data} className="w-96 my-2">
            <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only "
            >
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    value={search || ''}
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Search employee..."
                />
                <div className="absolute end-2.5 bottom-2.5 flex gap-2">
                    {search && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearch('');
                                router.visit(window.location.pathname);
                            }}
                            className="text-gray-500 hover:text-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2"
                        >
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    )}
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                    >
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
}

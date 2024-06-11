import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

export default function ApplicantsDropdownFilterComponents({filterDatas}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStats, setSelectedStats] = useState([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleStatusChanges = (e) => {
        const { value, checked } = e.target;
        router.visit(window.location.pathname +window.location.search+ `&categories=${[...selectedStats, value]}`);
        // if (checked) {
        //     setSelectedStats([...selectedStats, value]);
        // } else {
        //     setSelectedStats(selectedStats.filter(status => status !== value));
        // }
    };

    useEffect(() => {
        filterDatas(selectedStats);
    }, [selectedStats]);

    return (
        <div>
            <div className="relative">
                <button
                    id="dropdownDefault"
                    onClick={toggleDropdown}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center  "
                    type="button"
                >
                    Filter by category
                    <svg
                        className={`w-4 h-4 ml-2 ${isOpen ? 'transform rotate-180' : ''}`}
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                </button>

                <div
                    id="dropdown"
                    className={`z-10 ${isOpen ? 'block' : 'hidden'
                        } absolute w-56 p-3 bg-white rounded-lg shadow  mt-2`}
                >
                    <h6 className="mb-3 text-sm font-medium text-gray-900 ">
                        Category
                    </h6>
                    <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                        <li class="flex items-center">
                            <input id="Pending" type="checkbox" value="Pending"
                                checked={selectedStats.includes("Pending")}
                                onChange={handleStatusChanges}
                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                            <label for="Pending" class="ml-2 text-sm font-medium text-gray-900 ">
                                Pending
                            </label>
                        </li>

                        <li class="flex items-center">
                            <input id="Initial Phase" type="checkbox" value="Initial Phase"
                            checked={selectedStats.includes("Initial Phase")}
                            onChange={handleStatusChanges}
                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                            <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 ">
                                Initial Phase
                            </label>
                        </li>

                        <li class="flex items-center">
                            <input id="Final Phase" type="checkbox" value="Final Phase"
                            checked={selectedStats.includes("Final Phase")}
                            onChange={handleStatusChanges}
                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                            <label for="Final Phase" class="ml-2 text-sm font-medium text-gray-900 ">
                                Final Phase
                            </label>
                        </li>

                        <li class="flex items-center">
                            <input id="Passed" type="checkbox" value="Passed"
                            checked={selectedStats.includes("Passed")}
                            onChange={handleStatusChanges}
                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                            <label for="Passed" class="ml-2 text-sm font-medium text-gray-900 ">
                                Passed
                            </label>
                        </li>

                        <li class="flex items-center">
                            <input id="Failed" type="checkbox" value="Failed"
                            checked={selectedStats.includes("Failed")}
                            onChange={handleStatusChanges}
                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                            <label for="Failed" class="ml-2 text-sm font-medium text-gray-900 ">
                                Failed
                            </label>
                        </li>

                        <li class="flex items-center">
                            <input id="Probationary" type="checkbox" value="Probationary"
                            checked={selectedStats.includes("Probationary")}
                            onChange={handleStatusChanges}
                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                            <label for="Probationary" class="ml-2 text-sm font-medium text-gray-900 ">
                                Probationary
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

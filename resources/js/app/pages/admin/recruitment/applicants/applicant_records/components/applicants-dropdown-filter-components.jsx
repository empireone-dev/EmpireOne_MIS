import React, { useEffect, useState } from 'react';

export default function ApplicantsDropdownFilterComponents() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
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
                            <input id="apple" type="checkbox" value=""
                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                            <label for="apple" class="ml-2 text-sm font-medium text-gray-900 ">
                                Pending
                            </label>
                        </li>

                        <li class="flex items-center">
                            <input id="fitbit" type="checkbox" value=""
                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                            <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 ">
                                Initial Phase
                            </label>
                        </li>

                        <li class="flex items-center">
                            <input id="dell" type="checkbox" value=""
                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                            <label for="dell" class="ml-2 text-sm font-medium text-gray-900 ">
                                Final Phase
                            </label>
                        </li>

                        <li class="flex items-center">
                            <input id="asus" type="checkbox" value="" 
                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                            <label for="asus" class="ml-2 text-sm font-medium text-gray-900 ">
                                Passed
                            </label>
                        </li>

                        <li class="flex items-center">
                            <input id="asus" type="checkbox" value="" 
                                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                            <label for="asus" class="ml-2 text-sm font-medium text-gray-900 ">
                                Failed
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

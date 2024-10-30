import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from 'antd';

export default function ApplicantsDropdownFilterComponents({ filterData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleStatusChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedStatus([...selectedStatus, value]);
        } else {
            setSelectedStatus(selectedStatus.filter(status => status !== value));
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <div class="flex items-center">
                    <input id="Pending" type="checkbox" value="Pending"
                        checked={selectedStatus.includes("Pending")}
                        onChange={handleStatusChange}
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                    <label for="Pending" class="ml-2 text-sm font-medium text-gray-900 ">
                        Pending
                    </label>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div class="flex items-center">
                    <input id="Initial Phase" type="checkbox" value="Initial Phase"
                        checked={selectedStatus.includes("Initial Phase")}
                        onChange={handleStatusChange}
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                    <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 ">
                        Initial Phase
                    </label>
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div class="flex items-center">
                    <input id="Final Phase" type="checkbox" value="Final Phase"
                        checked={selectedStatus.includes("Final Phase")}
                        onChange={handleStatusChange}
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                    <label for="Final Phase" class="ml-2 text-sm font-medium text-gray-900 ">
                        Final Phase
                    </label>
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div class="flex items-center">
                    <input id="Passed" type="checkbox" value="Passed"
                        checked={selectedStatus.includes("Passed")}
                        onChange={handleStatusChange}
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                    <label for="Passed" class="ml-2 text-sm font-medium text-gray-900 ">
                        Passed
                    </label>
                </div>
            ),
        },
        {
            key: '5',
            label: (
                <div class="flex items-center">
                    <input id="Failed" type="checkbox" value="Failed"
                        checked={selectedStatus.includes("Failed")}
                        onChange={handleStatusChange}
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                    <label for="Failed" class="ml-2 text-sm font-medium text-gray-900 ">
                        Failed
                    </label>
                </div>
            ),
        },
        {
            key: '6',
            label: (
                <div class="flex items-center">
                    <input id="Probationary" type="checkbox" value="Probationary"
                        checked={selectedStatus.includes("Probationary")}
                        onChange={handleStatusChange}
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                    <label for="Probationary" class="ml-2 text-sm font-medium text-gray-900 ">
                        Probationary
                    </label>
                </div>
            ),
        },
    ];

    useEffect(() => {
        filterData(selectedStatus);
    }, [selectedStatus]);

    return (
        <div>
            <Dropdown
                menu={{ items }}
                autoFocus={true}
                open={isOpen}
                onOpenChange={toggleDropdown}
                placement="bottomLeft"
                arrow
                trigger={['click']}
            >
                <Button type='primary' size='large'>Filter by category</Button>
            </Dropdown>
        </div>
    );
}

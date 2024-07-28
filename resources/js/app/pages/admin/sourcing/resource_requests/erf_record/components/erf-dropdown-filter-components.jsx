import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from 'antd';

export default function ErfDropdownFilterComponents({ filterData }) {
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
                    <input
                        id="Pending"
                        type="checkbox"
                        value="Pending"
                        checked={selectedStatus.includes("Pending")}
                        onChange={handleStatusChange}
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"
                    />
                    <label for="Pending" class="ml-2 text-sm font-medium text-gray-900">
                        Pending ERF
                    </label>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div class="flex items-center">
                    <input
                        id="In Review"
                        type="checkbox"
                        value="In Review"
                        checked={selectedStatus.includes("In Review")}
                        onChange={handleStatusChange}
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"
                    />
                    <label for="In Review" class="ml-2 text-sm font-medium text-gray-900">
                    In Review ERF
                    </label>
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div class="flex items-center">
                    <input
                        id="Approved"
                        type="checkbox"
                        value="Approved"
                        checked={selectedStatus.includes("Approved")}
                        onChange={handleStatusChange}
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"
                    />
                    <label for="Approved" class="ml-2 text-sm font-medium text-gray-900">
                    Approved ERF
                    </label>
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div class="flex items-center">
                    <input
                        id="Declined"
                        type="checkbox"
                        value="Declined"
                        checked={selectedStatus.includes("Declined")}
                        onChange={handleStatusChange}
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"
                    />
                    <label for="Declined" class="ml-2 text-sm font-medium text-gray-900">
                    Declined ERF
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

import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from 'antd';
export default function ErfDropdownFilterComponents() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const items = [
        {
            key: '1',
            label: (
                <div class="flex items-center">
                    <input id="apple" type="checkbox" value=""
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                    <label for="apple" class="ml-2 text-sm font-medium text-gray-900 ">
                        Pending ERF
                    </label>
                </div>
            ),
        },
        {
            key: '2',
            label: (

                <div class="flex items-center">
                    <input id="fitbit" type="checkbox" value=""
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                    <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 ">
                        In Review ERF
                    </label>
                </div>

            ),
        },
        {
            key: '3',
            label: (
                <div class="flex items-center">
                    <input id="dell" type="checkbox" value=""
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                    <label for="dell" class="ml-2 text-sm font-medium text-gray-900 ">
                        Approved ERF
                    </label>
                </div>

            ),
        }, {
            key: '4',
            label: (

                <div class="flex items-center">
                    <input id="asus" type="checkbox" value=""
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  " />

                    <label for="asus" class="ml-2 text-sm font-medium text-gray-900 ">
                        Declined ERF
                    </label>
                </div>

            ),
        },
    ];
    return (
        <div>

            <Dropdown menu={{ items }} 
            autoFocus={true}
            open={isOpen}
            onOpenChange={toggleDropdown}
            placement="bottomLeft" arrow>
                <Button type='primary' size='large'>Filter by category</Button>
            </Dropdown>
        </div>
    );
}

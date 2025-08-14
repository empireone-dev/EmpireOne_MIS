import React from 'react';
import { Space, Divider } from 'antd';
import QRScannerComponent from '../components/qr-scanner-component';

export default function EmployeeTableHeaderSection({ data }) {
    return (
        <div className="mb-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-medium text-gray-800">
                        <b>Employee Section</b>
                    </h2>
                </div>
                <div className="flex items-center gap-3">
                    <QRScannerComponent data={data} />
                    {/* Other existing buttons can go here */}
                </div>
            </div>
            <Divider />
        </div>
    );
}

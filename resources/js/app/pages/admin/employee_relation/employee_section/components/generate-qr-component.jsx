import { Menu, Modal, QRCode, Divider, Button, Space, message } from "antd";
import React from "react";
import { useState } from "react";
import moment from "moment";
import { LinkOutlined, CopyOutlined, EyeOutlined } from '@ant-design/icons';

export default function GenerateQrComponent({ data, item }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Helper function to handle undefined, null, and empty values
    const formatValue = (value) => {
        if (value === undefined || value === null || value === '' || value === 'undefined') {
            return '--';
        }
        return value;
    };

    // Helper function to calculate age from date of birth
    const calculateAge = (dob) => {
        if (!dob) return '--';
        const today = moment();
        const birthDate = moment(dob);
        if (!birthDate.isValid()) return '--';
        return today.diff(birthDate, 'years');
    };

    function openHandler(params) {
        // setOpen(true);
        window.open(`/admin/file_201/${data.app_id}`, "_blank");
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Create URL with employee data for direct scanning
    const createQRUrl = () => {
        const baseUrl = window.location.origin;
        const applicationId = data?.app_id;

        // Use the correct URL path that matches our route
        return `${baseUrl}/admin/employee-qr-scan/${applicationId}`;
    };

    // Fallback: Create comprehensive employee information for preview
    const createEmployeeInfo = () => {
        const applicant = data?.applicant;
        const employee = data;

        const employeeInfo = {
            // Employee Information
            employeeId: formatValue(employee?.emp_id),
            applicationId: formatValue(applicant?.app_id),

            // Personal Information
            fullName: `${applicant?.fname || ''} ${applicant?.mname || ''} ${applicant?.lname || ''} ${applicant?.suffix || ''}`.trim(),
            dateOfBirth: applicant?.dob ? moment(applicant.dob).format('LL') : '--',
            age: calculateAge(applicant?.dob),
            gender: formatValue(applicant?.gender),
            maritalStatus: formatValue(applicant?.marital),
            religion: formatValue(applicant?.religion),
            nationality: formatValue(applicant?.nationality),

            // Contact Information
            email: formatValue(applicant?.email),
            phone: formatValue(applicant?.phone),
            currentAddress: formatValue(applicant?.caddress),
            permanentAddress: formatValue(applicant?.paddress),

            // Government IDs
            sss: formatValue(applicant?.sss),
            tin: formatValue(applicant?.tin),
            philhealth: formatValue(applicant?.philh),
            pagibig: formatValue(applicant?.pagibig),

            // Family Information
            motherName: formatValue(applicant?.mmname),
            fatherName: formatValue(applicant?.ffname),

            // Emergency Contact
            emergencyContactName: formatValue(applicant?.ename),
            emergencyContactAddress: formatValue(applicant?.eaddress),
            emergencyContactPhone: formatValue(applicant?.ephone),
            relationship: formatValue(applicant?.relationship),

            // Work Information
            position: formatValue(employee?.position),
            department: formatValue(employee?.dept),
            account: formatValue(employee?.account),
            site: formatValue(applicant?.site),
            hiredDate: employee?.hired ? moment(employee.hired).format('YYYY-MM-DD') : '--',
            status: formatValue(employee?.status),

            // Education
            education: formatValue(applicant?.educ),
            course: formatValue(applicant?.courset),
        };

        return employeeInfo;
    };

    const handleCopyUrl = () => {
        const url = createQRUrl();
        navigator.clipboard.writeText(url).then(() => {
            message.success('QR URL copied to clipboard!');
        }).catch(() => {
            message.error('Failed to copy URL');
        });
    };

    const handleOpenPage = () => {
        // For preview, store the current employee data and open the page
        const employeeData = createEmployeeInfo();
        localStorage.setItem('scannedEmployeeData', JSON.stringify(employeeData));
        window.open('/admin/employee-qr-scan', '_blank');
    };

    console.log("data", data);

    return (
        <>
            <Menu.Item
                // onClick={() => openHandler(true)}
                onClick={showModal}
                icon={item.icon}
            >
                {item.label}
            </Menu.Item>
            <Modal
                footer={false}
                title={`Employee QR Code - ${data?.applicant?.fname} ${data?.applicant?.lname}`}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                style={{ top: 20 }}
            >
                <div className="space-y-6">
                    {/* QR Code Section */}
                    <div className="flex w-full justify-center">
                        <div className="relative">
                            <QRCode
                                value={createQRUrl()}
                                size={200}
                                level="H"
                                includeMargin={true}
                                icon='/images/e-logo.jpeg'
                            />
                        </div>
                    </div>

                    {/* QR Code Actions */}
                    <div className="flex justify-center">
                        <Space>
                            <Button
                                icon={<EyeOutlined />}
                                onClick={handleOpenPage}
                                type="primary"
                            >
                                Preview Page
                            </Button>
                            <Button
                                icon={<CopyOutlined />}
                                onClick={handleCopyUrl}
                            >
                                Copy URL
                            </Button>
                        </Space>
                    </div>

                    <div className="text-center text-gray-600 text-sm">
                        <p><strong>QR Code URL:</strong></p>
                        <code className="bg-gray-100 p-1 rounded text-xs break-all">{createQRUrl()}</code>
                    </div>

                    <Divider>Employee Information Preview</Divider>

                    {/* Employee Information Display */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                        {/* Personal Information */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Personal Information</h3>
                            <div className="space-y-2 text-sm">
                                <div><span className="font-medium">Employee ID:</span> {formatValue(data?.emp_id)}</div>
                                <div><span className="font-medium">Application ID:</span> {formatValue(data?.applicant?.app_id)}</div>
                                <div><span className="font-medium">Full Name:</span> {`${formatValue(data?.applicant?.fname)} ${formatValue(data?.applicant?.mname)} ${formatValue(data?.applicant?.lname)} ${formatValue(data?.applicant?.suffix)}`.trim()}</div>
                                <div><span className="font-medium">Date of Birth:</span> {data?.applicant?.dob ? moment(data.applicant.dob).format('LL') : '--'}</div>
                                <div><span className="font-medium">Age:</span> {calculateAge(data?.applicant?.dob)}</div>
                                <div><span className="font-medium">Gender:</span> {formatValue(data?.applicant?.gender)}</div>
                                <div><span className="font-medium">Marital Status:</span> {formatValue(data?.applicant?.marital)}</div>
                                <div><span className="font-medium">Religion:</span> {formatValue(data?.applicant?.religion)}</div>
                                <div><span className="font-medium">Nationality:</span> {formatValue(data?.applicant?.nationality)}</div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Contact Information</h3>
                            <div className="space-y-2 text-sm">
                                <div><span className="font-medium">Email:</span> {formatValue(data?.applicant?.email)}</div>
                                <div><span className="font-medium">Phone:</span> {formatValue(data?.applicant?.phone)}</div>
                                <div><span className="font-medium">Address:</span> {formatValue(data?.applicant?.caddress)}</div>
                            </div>
                        </div>

                        {/* Government Information */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Government IDs</h3>
                            <div className="space-y-2 text-sm">
                                <div><span className="font-medium">SSS:</span> {formatValue(data?.applicant?.sss)}</div>
                                <div><span className="font-medium">TIN:</span> {formatValue(data?.applicant?.tin)}</div>
                                <div><span className="font-medium">PhilHealth:</span> {formatValue(data?.applicant?.philh)}</div>
                                <div><span className="font-medium">Pag-IBIG:</span> {formatValue(data?.applicant?.pagibig)}</div>
                            </div>
                        </div>

                        {/* Work Information */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Work Information</h3>
                            <div className="space-y-2 text-sm">
                                <div><span className="font-medium">Position:</span> {formatValue(data?.position)}</div>
                                <div><span className="font-medium">Department:</span> {formatValue(data?.dept)}</div>
                                <div><span className="font-medium">Account:</span> {formatValue(data?.account)}</div>
                                <div><span className="font-medium">Site:</span> {formatValue(data?.applicant?.site)}</div>
                                <div><span className="font-medium">Hired Date:</span> {data?.hired ? moment(data.hired).format('LL') : '--'}</div>
                                <div><span className="font-medium">Status:</span> {formatValue(data?.status)}</div>
                            </div>
                        </div>

                        {/* Family Information */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Family Information</h3>
                            <div className="space-y-2 text-sm">
                                <div><span className="font-medium">Mother's Name:</span> {formatValue(data?.applicant?.mmname)}</div>
                                <div><span className="font-medium">Father's Name:</span> {formatValue(data?.applicant?.ffname)}</div>
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Emergency Contact</h3>
                            <div className="space-y-2 text-sm">
                                <div><span className="font-medium">Name:</span> {formatValue(data?.applicant?.ename)}</div>
                                <div><span className="font-medium">Address:</span> {formatValue(data?.applicant?.eaddress)}</div>
                                <div><span className="font-medium">Phone:</span> {formatValue(data?.applicant?.ephone)}</div>
                                <div><span className="font-medium">Relationship:</span> {formatValue(data?.applicant?.relationship)}</div>
                            </div>
                        </div>

                        {/* Education Information */}
                        <div className="space-y-3 md:col-span-2">
                            <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Education Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div><span className="font-medium">Education Level:</span> {formatValue(data?.applicant?.educ)}</div>
                                <div><span className="font-medium">Course/Field:</span> {formatValue(data?.applicant?.courset)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

import { Menu, Modal, QRCode, Divider, Button, Space, message } from "antd";
import React from "react";
import { useState } from "react";
import moment from "moment";
import { LinkOutlined, CopyOutlined, EyeOutlined } from '@ant-design/icons';

export default function GenerateQrComponent({ data, item }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
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
        const employeeId = data?.emp_id;
        
        // Use the correct URL path that matches our route
        return `${baseUrl}/admin/employee-qr-scan/${employeeId}`;
    };

    // Fallback: Create comprehensive employee information for preview
    const createEmployeeInfo = () => {
        const applicant = data?.applicant;
        const employee = data;
        
        const employeeInfo = {
            // Employee Information
            employeeId: employee?.emp_id || 'N/A',
            applicationId: applicant?.app_id || 'N/A',
            
            // Personal Information
            fullName: `${applicant?.fname || ''} ${applicant?.mname || ''} ${applicant?.lname || ''} ${applicant?.suffix || ''}`.trim(),
            dateOfBirth: applicant?.dob ? moment(applicant.dob).format('YYYY-MM-DD') : 'N/A',
            age: applicant?.age || 'N/A',
            gender: applicant?.gender || 'N/A',
            maritalStatus: applicant?.marital || 'N/A',
            religion: applicant?.religion || 'N/A',
            nationality: applicant?.nationality || 'N/A',
            
            // Contact Information
            email: applicant?.email || 'N/A',
            phone: applicant?.phone || 'N/A',
            currentAddress: applicant?.caddress || 'N/A',
            permanentAddress: applicant?.paddress || 'N/A',
            
            // Government IDs
            sss: applicant?.sss || 'N/A',
            tin: applicant?.tin || 'N/A',
            philhealth: applicant?.philh || 'N/A',
            pagibig: applicant?.pagibig || 'N/A',
            
            // Family Information
            motherName: applicant?.mmname || 'N/A',
            fatherName: applicant?.ffname || 'N/A',
            
            // Emergency Contact
            emergencyContactName: applicant?.ename || 'N/A',
            emergencyContactAddress: applicant?.eaddress || 'N/A',
            emergencyContactPhone: applicant?.ephone || 'N/A',
            relationship: applicant?.relationship || 'N/A',
            
            // Work Information
            position: employee?.position || 'N/A',
            department: employee?.dept || 'N/A',
            account: employee?.account || 'N/A',
            site: applicant?.site || 'N/A',
            hiredDate: employee?.hired ? moment(employee.hired).format('YYYY-MM-DD') : 'N/A',
            status: employee?.status || 'N/A',
            
            // Education
            education: applicant?.educ || 'N/A',
            course: applicant?.courset || 'N/A',
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
                                <div><span className="font-medium">Employee ID:</span> {data?.emp_id || 'N/A'}</div>
                                <div><span className="font-medium">Application ID:</span> {data?.applicant?.app_id || 'N/A'}</div>
                                <div><span className="font-medium">Full Name:</span> {`${data?.applicant?.fname || ''} ${data?.applicant?.mname || ''} ${data?.applicant?.lname || ''} ${data?.applicant?.suffix || ''}`.trim()}</div>
                                <div><span className="font-medium">Date of Birth:</span> {data?.applicant?.dob ? moment(data.applicant.dob).format('LL') : 'N/A'}</div>
                                <div><span className="font-medium">Age:</span> {data?.applicant?.age || 'N/A'}</div>
                                <div><span className="font-medium">Gender:</span> {data?.applicant?.gender || 'N/A'}</div>
                                <div><span className="font-medium">Marital Status:</span> {data?.applicant?.marital || 'N/A'}</div>
                                <div><span className="font-medium">Religion:</span> {data?.applicant?.religion || 'N/A'}</div>
                                <div><span className="font-medium">Nationality:</span> {data?.applicant?.nationality || 'N/A'}</div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Contact Information</h3>
                            <div className="space-y-2 text-sm">
                                <div><span className="font-medium">Email:</span> {data?.applicant?.email || 'N/A'}</div>
                                <div><span className="font-medium">Phone:</span> {data?.applicant?.phone || 'N/A'}</div>
                                <div><span className="font-medium">Current Address:</span> {data?.applicant?.caddress || 'N/A'}</div>
                                <div><span className="font-medium">Permanent Address:</span> {data?.applicant?.paddress || 'N/A'}</div>
                            </div>
                        </div>

                        {/* Government Information */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Government IDs</h3>
                            <div className="space-y-2 text-sm">
                                <div><span className="font-medium">SSS:</span> {data?.applicant?.sss || 'N/A'}</div>
                                <div><span className="font-medium">TIN:</span> {data?.applicant?.tin || 'N/A'}</div>
                                <div><span className="font-medium">PhilHealth:</span> {data?.applicant?.philh || 'N/A'}</div>
                                <div><span className="font-medium">Pag-IBIG:</span> {data?.applicant?.pagibig || 'N/A'}</div>
                            </div>
                        </div>

                        {/* Work Information */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Work Information</h3>
                            <div className="space-y-2 text-sm">
                                <div><span className="font-medium">Position:</span> {data?.position || 'N/A'}</div>
                                <div><span className="font-medium">Department:</span> {data?.dept || 'N/A'}</div>
                                <div><span className="font-medium">Account:</span> {data?.account || 'N/A'}</div>
                                <div><span className="font-medium">Site:</span> {data?.applicant?.site || 'N/A'}</div>
                                <div><span className="font-medium">Hired Date:</span> {data?.hired ? moment(data.hired).format('LL') : 'N/A'}</div>
                                <div><span className="font-medium">Status:</span> {data?.status || 'N/A'}</div>
                            </div>
                        </div>

                        {/* Family Information */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Family Information</h3>
                            <div className="space-y-2 text-sm">
                                <div><span className="font-medium">Mother's Name:</span> {data?.applicant?.mmname || 'N/A'}</div>
                                <div><span className="font-medium">Father's Name:</span> {data?.applicant?.ffname || 'N/A'}</div>
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Emergency Contact</h3>
                            <div className="space-y-2 text-sm">
                                <div><span className="font-medium">Name:</span> {data?.applicant?.ename || 'N/A'}</div>
                                <div><span className="font-medium">Address:</span> {data?.applicant?.eaddress || 'N/A'}</div>
                                <div><span className="font-medium">Phone:</span> {data?.applicant?.ephone || 'N/A'}</div>
                                <div><span className="font-medium">Relationship:</span> {data?.applicant?.relationship || 'N/A'}</div>
                            </div>
                        </div>

                        {/* Education Information */}
                        <div className="space-y-3 md:col-span-2">
                            <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Education Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div><span className="font-medium">Education Level:</span> {data?.applicant?.educ || 'N/A'}</div>
                                <div><span className="font-medium">Course/Field:</span> {data?.applicant?.courset || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

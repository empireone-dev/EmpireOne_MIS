import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Avatar, Button, Alert, Spin } from 'antd';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

export default function EmployeeQRScanPage() {
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { props } = usePage();
    const empId = props.emp_id;

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                if (empId) {
                    // Fetch employee data from backend using employee ID
                    console.log('Fetching employee data for ID:', empId);
                    const response = await axios.get(`/api/employee/${empId}`);
                    console.log('API Response:', response.data);
                    const employee = response.data.data;
                    
                    if (employee && employee.applicant) {
                        const applicant = employee.applicant;
                        
                        const employeeInfo = {
                            employeeId: employee.emp_id || 'N/A',
                            applicationId: applicant.app_id || 'N/A',
                            fullName: `${applicant.fname || ''} ${applicant.mname || ''} ${applicant.lname || ''} ${applicant.suffix || ''}`.trim(),
                            dateOfBirth: applicant.dob ? moment(applicant.dob).format('YYYY-MM-DD') : 'N/A',
                            age: applicant.age || 'N/A',
                            gender: applicant.gender || 'N/A',
                            maritalStatus: applicant.marital || 'N/A',
                            religion: applicant.religion || 'N/A',
                            nationality: applicant.nationality || 'N/A',
                            email: applicant.email || 'N/A',
                            phone: applicant.phone || 'N/A',
                            currentAddress: applicant.caddress || 'N/A',
                            permanentAddress: applicant.paddress || 'N/A',
                            sss: applicant.sss || 'N/A',
                            tin: applicant.tin || 'N/A',
                            philhealth: applicant.philh || 'N/A',
                            pagibig: applicant.pagibig || 'N/A',
                            motherName: applicant.mmname || 'N/A',
                            fatherName: applicant.ffname || 'N/A',
                            emergencyContactName: applicant.ename || 'N/A',
                            emergencyContactAddress: applicant.eaddress || 'N/A',
                            emergencyContactPhone: applicant.ephone || 'N/A',
                            relationship: applicant.relationship || 'N/A',
                            position: employee.position || 'N/A',
                            department: employee.dept || 'N/A',
                            account: employee.account || 'N/A',
                            site: applicant.site || 'N/A',
                            hiredDate: employee.hired ? moment(employee.hired).format('YYYY-MM-DD') : 'N/A',
                            status: employee.status || 'N/A',
                            education: applicant.educ || 'N/A',
                            course: applicant.courset || 'N/A',
                        };
                        
                        setEmployeeData(employeeInfo);
                    } else {
                        setError('Employee not found.');
                    }
                } else {
                    // Fallback to previous methods (URL params or localStorage)
                    const urlParams = new URLSearchParams(window.location.search);
                    const data = urlParams.get('data');
                    
                    if (data) {
                        const decodedData = decodeURIComponent(data);
                        const parsedData = JSON.parse(decodedData);
                        setEmployeeData(parsedData);
                    } else {
                        // Check localStorage for scanned data
                        const storedData = localStorage.getItem('scannedEmployeeData');
                        if (storedData) {
                            setEmployeeData(JSON.parse(storedData));
                            localStorage.removeItem('scannedEmployeeData'); // Clean up
                        } else {
                            setError('No employee data found. Please scan a valid QR code or provide an employee ID.');
                        }
                    }
                }
            } catch (err) {
                console.error('Error fetching employee data:', err);
                console.error('Error response:', err.response);
                console.error('Error request:', err.request);
                
                if (err.response) {
                    if (err.response.status === 404) {
                        setError(`Employee with ID "${empId}" not found. Please check the employee ID.`);
                    } else if (err.response.status === 401) {
                        setError('Authentication required. Please log in to view employee data.');
                    } else if (err.response.status === 403) {
                        setError('Access denied. You do not have permission to view this employee data.');
                    } else {
                        setError(`Server error (${err.response.status}): ${err.response.data?.message || 'Failed to load employee data'}`);
                    }
                } else if (err.request) {
                    setError('Network error: Unable to connect to the server. Please check your internet connection.');
                } else {
                    setError('Failed to load employee data. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, [empId]);

    const handleBack = () => {
        window.history.back();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-6">
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    action={
                        <Button onClick={handleBack} type="primary">
                            Go Back
                        </Button>
                    }
                />
            </div>
        );
    }

    if (!employeeData) {
        return (
            <div className="container mx-auto p-6">
                <Alert
                    message="No Data"
                    description="No employee information available."
                    type="warning"
                    showIcon
                />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <Button
                    onClick={handleBack}
                    icon={<ArrowLeftOutlined />}
                    className="mb-4"
                >
                    Back
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">Employee Information</h1>
                <p className="text-gray-600">Scanned QR Code Data</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Employee Summary Card */}
                <div className="lg:col-span-1">
                    <Card className="text-center">
                        <Avatar size={120} icon={<UserOutlined />} className="mb-4" />
                        <h2 className="text-xl font-semibold mb-2">{employeeData.fullName}</h2>
                        <p className="text-gray-600 mb-1">Employee ID: {employeeData.employeeId}</p>
                        <p className="text-gray-600 mb-1">Position: {employeeData.position}</p>
                        <p className="text-gray-600">Department: {employeeData.department}</p>
                    </Card>
                </div>

                {/* Detailed Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <Card title="Personal Information" className="shadow-sm">
                        <Descriptions column={2} size="small">
                            <Descriptions.Item label="Full Name">{employeeData.fullName}</Descriptions.Item>
                            <Descriptions.Item label="Application ID">{employeeData.applicationId}</Descriptions.Item>
                            <Descriptions.Item label="Date of Birth">{employeeData.dateOfBirth}</Descriptions.Item>
                            <Descriptions.Item label="Age">{employeeData.age}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{employeeData.gender}</Descriptions.Item>
                            <Descriptions.Item label="Marital Status">{employeeData.maritalStatus}</Descriptions.Item>
                            <Descriptions.Item label="Religion">{employeeData.religion}</Descriptions.Item>
                            <Descriptions.Item label="Nationality">{employeeData.nationality}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Contact Information */}
                    <Card title="Contact Information" className="shadow-sm">
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Email">{employeeData.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{employeeData.phone}</Descriptions.Item>
                            <Descriptions.Item label="Current Address">{employeeData.currentAddress}</Descriptions.Item>
                            <Descriptions.Item label="Permanent Address">{employeeData.permanentAddress}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Government IDs */}
                    <Card title="Government IDs" className="shadow-sm">
                        <Descriptions column={2} size="small">
                            <Descriptions.Item label="SSS">{employeeData.sss}</Descriptions.Item>
                            <Descriptions.Item label="TIN">{employeeData.tin}</Descriptions.Item>
                            <Descriptions.Item label="PhilHealth">{employeeData.philhealth}</Descriptions.Item>
                            <Descriptions.Item label="Pag-IBIG">{employeeData.pagibig}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Work Information */}
                    <Card title="Work Information" className="shadow-sm">
                        <Descriptions column={2} size="small">
                            <Descriptions.Item label="Employee ID">{employeeData.employeeId}</Descriptions.Item>
                            <Descriptions.Item label="Position">{employeeData.position}</Descriptions.Item>
                            <Descriptions.Item label="Department">{employeeData.department}</Descriptions.Item>
                            <Descriptions.Item label="Account">{employeeData.account}</Descriptions.Item>
                            <Descriptions.Item label="Site">{employeeData.site}</Descriptions.Item>
                            <Descriptions.Item label="Hired Date">{employeeData.hiredDate}</Descriptions.Item>
                            <Descriptions.Item label="Status" span={2}>{employeeData.status}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Family Information */}
                    <Card title="Family Information" className="shadow-sm">
                        <Descriptions column={2} size="small">
                            <Descriptions.Item label="Mother's Name">{employeeData.motherName}</Descriptions.Item>
                            <Descriptions.Item label="Father's Name">{employeeData.fatherName}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Emergency Contact */}
                    <Card title="Emergency Contact" className="shadow-sm">
                        <Descriptions column={2} size="small">
                            <Descriptions.Item label="Name">{employeeData.emergencyContactName}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{employeeData.emergencyContactPhone}</Descriptions.Item>
                            <Descriptions.Item label="Relationship">{employeeData.relationship}</Descriptions.Item>
                            <Descriptions.Item label="Address" span={2}>{employeeData.emergencyContactAddress}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Education Information */}
                    <Card title="Education Information" className="shadow-sm">
                        <Descriptions column={2} size="small">
                            <Descriptions.Item label="Education Level">{employeeData.education}</Descriptions.Item>
                            <Descriptions.Item label="Course/Field">{employeeData.course}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </div>
            </div>
        </div>
    );
}

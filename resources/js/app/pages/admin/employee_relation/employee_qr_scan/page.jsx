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
    const [isMobile, setIsMobile] = useState(false);
    const { props } = usePage();
    const empId = props.emp_id;

    // Check if screen is mobile size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

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
                            employeeId: formatValue(employee.emp_id),
                            applicationId: formatValue(applicant.app_id),
                            fullName: `${formatValue(applicant.fname)} ${formatValue(applicant.mname)} ${formatValue(applicant.lname)} ${formatValue(applicant.suffix)}`.trim(),
                            dateOfBirth: applicant.dob ? moment(applicant.dob).format('YYYY-MM-DD') : '--',
                            age: calculateAge(applicant.dob),
                            gender: formatValue(applicant.gender),
                            maritalStatus: formatValue(applicant.marital),
                            religion: formatValue(applicant.religion),
                            nationality: formatValue(applicant.nationality),
                            email: formatValue(applicant.email),
                            phone: formatValue(applicant.phone),
                            currentAddress: formatValue(applicant.caddress),
                            permanentAddress: formatValue(applicant.paddress),
                            sss: formatValue(applicant.sss),
                            tin: formatValue(applicant.tin),
                            philhealth: formatValue(applicant.philh),
                            pagibig: formatValue(applicant.pagibig),
                            motherName: formatValue(applicant.mmname),
                            fatherName: formatValue(applicant.ffname),
                            emergencyContactName: formatValue(applicant.ename),
                            emergencyContactAddress: formatValue(applicant.eaddress),
                            emergencyContactPhone: formatValue(applicant.ephone),
                            relationship: formatValue(applicant.relationship),
                            position: formatValue(employee.position),
                            department: formatValue(employee.dept?.dept || employee.dept),
                            account: formatValue(employee.account),
                            site: formatValue(employee.dept?.site || applicant.site),
                            hiredDate: employee.hired ? moment(employee.hired).format('YYYY-MM-DD') : '--',
                            status: formatValue(employee.status),
                            education: formatValue(applicant.educ),
                            course: formatValue(applicant.courset),
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
        <div className="container mx-auto p-3 sm:p-6 bg-gray-50 min-h-screen">
            <div className="mb-4 sm:mb-6">
                <Button
                    onClick={handleBack}
                    icon={<ArrowLeftOutlined />}
                    className="mb-2 sm:mb-4"
                    size={isMobile ? 'small' : 'middle'}
                >
                    Back
                </Button>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Employee Information</h1>
                <p className="text-sm sm:text-base text-gray-600">Scanned QR Code Data</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
                {/* Employee Summary Card */}
                <div className="xl:col-span-1">
                    <Card className="text-center">
                        <Avatar
                            size={isMobile ? 80 : 120}
                            icon={<UserOutlined />}
                            className="mb-4"
                        />
                        <h2 className="text-lg sm:text-xl font-semibold mb-2 break-words">{employeeData.fullName}</h2>
                        <p className="text-gray-600 mb-1 text-sm sm:text-base">Employee ID: {employeeData.employeeId}</p>
                        <p className="text-gray-600 mb-1 text-sm sm:text-base break-words">Position: {employeeData.position}</p>
                        <p className="text-gray-600 text-sm sm:text-base break-words">Department: {employeeData.department}</p>
                    </Card>
                </div>

                {/* Detailed Information */}
                <div className="xl:col-span-2 space-y-4 md:space-y-6">
                    {/* Personal Information */}
                    <Card title="Personal Information" className="shadow-sm">
                        <Descriptions
                            column={{
                                xs: 1,
                                sm: 1,
                                md: 2,
                                lg: 2,
                                xl: 2
                            }}
                            size="small"
                            labelStyle={{ fontWeight: 'bold' }}
                        >
                            <Descriptions.Item label="Full Name">{employeeData.fullName}</Descriptions.Item>
                            <Descriptions.Item label="Application ID">{employeeData.applicationId}</Descriptions.Item>
                            <Descriptions.Item label="Date of Birth">{moment(employeeData.dateOfBirth).format('LL')}</Descriptions.Item>
                            <Descriptions.Item label="Age">{employeeData.age}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{employeeData.gender}</Descriptions.Item>
                            <Descriptions.Item label="Marital Status">{employeeData.maritalStatus}</Descriptions.Item>
                            <Descriptions.Item label="Religion">{employeeData.religion}</Descriptions.Item>
                            <Descriptions.Item label="Nationality">{employeeData.nationality}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Contact Information */}
                    <Card title="Contact Information" className="shadow-sm">
                        <Descriptions
                            column={{
                                xs: 1,
                                sm: 1,
                                md: 1,
                                lg: 1,
                                xl: 1
                            }}
                            size="small"
                            labelStyle={{ fontWeight: 'bold' }}
                        >
                            <Descriptions.Item label="Address">{employeeData.currentAddress}</Descriptions.Item>
                            <Descriptions.Item label="Email">{employeeData.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{employeeData.phone}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Government IDs */}
                    <Card title="Government IDs" className="shadow-sm">
                        <Descriptions
                            column={{
                                xs: 1,
                                sm: 1,
                                md: 2,
                                lg: 2,
                                xl: 2
                            }}
                            size="small"
                            labelStyle={{ fontWeight: 'bold' }}
                        >
                            <Descriptions.Item label="SSS">{employeeData.sss}</Descriptions.Item>
                            <Descriptions.Item label="TIN">{employeeData.tin}</Descriptions.Item>
                            <Descriptions.Item label="PhilHealth">{employeeData.philhealth}</Descriptions.Item>
                            <Descriptions.Item label="Pag-IBIG">{employeeData.pagibig}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Work Information */}
                    <Card title="Work Information" className="shadow-sm">
                        <Descriptions
                            column={{
                                xs: 1,
                                sm: 1,
                                md: 2,
                                lg: 2,
                                xl: 2
                            }}
                            size="small"
                            labelStyle={{ fontWeight: 'bold' }}
                        >
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
                        <Descriptions
                            column={{
                                xs: 1,
                                sm: 1,
                                md: 2,
                                lg: 2,
                                xl: 2
                            }}
                            size="small"
                            labelStyle={{ fontWeight: 'bold' }}
                        >
                            <Descriptions.Item label="Mother's Name">{employeeData.motherName}</Descriptions.Item>
                            <Descriptions.Item label="Father's Name">{employeeData.fatherName}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Emergency Contact */}
                    <Card title="Emergency Contact" className="shadow-sm">
                        <Descriptions
                            column={{
                                xs: 1,
                                sm: 1,
                                md: 2,
                                lg: 2,
                                xl: 2
                            }}
                            size="small"
                            labelStyle={{ fontWeight: 'bold' }}
                        >
                            <Descriptions.Item label="Name">{employeeData.emergencyContactName}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{employeeData.emergencyContactPhone}</Descriptions.Item>
                            <Descriptions.Item label="Relationship">{employeeData.relationship}</Descriptions.Item>
                            <Descriptions.Item label="Address" span={2}>{employeeData.emergencyContactAddress}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Education Information */}
                    <Card title="Education Information" className="shadow-sm">
                        <Descriptions
                            column={{
                                xs: 1,
                                sm: 1,
                                md: 2,
                                lg: 2,
                                xl: 2
                            }}
                            size="small"
                            labelStyle={{ fontWeight: 'bold' }}
                        >
                            <Descriptions.Item label="Education Level">{employeeData.education}</Descriptions.Item>
                            <Descriptions.Item label="Course/Field">{employeeData.course}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </div>
            </div>
        </div>
    );
}

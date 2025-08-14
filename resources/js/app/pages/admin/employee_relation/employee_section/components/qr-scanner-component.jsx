import React, { useState } from 'react';
import { Button, Modal, Alert, Card, Input, Space } from 'antd';
import { QrcodeOutlined, LinkOutlined, FileTextOutlined, SearchOutlined } from '@ant-design/icons';

export default function QRScannerComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [manualInput, setManualInput] = useState('');
    const [error, setError] = useState(null);

    const showModal = () => {
        setIsModalOpen(true);
        setError(null);
        setManualInput('');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setError(null);
        setManualInput('');
    };

    const handleSubmit = () => {
        try {
            if (!manualInput.trim()) {
                setError('Please enter a valid Employee ID or URL');
                return;
            }

            // Check if it's a URL containing employee ID
            if (manualInput.includes('/admin/employee-qr-scan/')) {
                // Extract employee ID from URL
                const parts = manualInput.split('/admin/employee-qr-scan/');
                const empId = parts[1]?.split('?')[0]?.split('#')[0];
                
                if (empId) {
                    setIsModalOpen(false);
                    window.open(`/admin/employee-qr-scan/${empId}`, '_blank');
                } else {
                    setError('Could not extract employee ID from URL.');
                }
            } else if (manualInput.startsWith('http')) {
                // Handle full URLs - try to open directly
                setIsModalOpen(false);
                window.open(manualInput, '_blank');
            } else {
                // Assume it's an employee ID
                setIsModalOpen(false);
                window.open(`/admin/employee-qr-scan/${manualInput.trim()}`, '_blank');
            }
        } catch (err) {
            console.error('Error processing input:', err);
            setError('Invalid input format. Please check the Employee ID or URL.');
        }
    };

    const openSamplePage = () => {
        // Use a sample employee ID - you might want to change this to a real one
        const sampleEmpId = "240814001"; // This should be a real employee ID from your database
        window.open(`/admin/employee-qr-scan/${sampleEmpId}`, '_blank');
    };

    return (
        <>
            <Button
                type="primary"
                icon={<QrcodeOutlined />}
                onClick={showModal}
                className="mb-4"
            >
                View Employee QR Data
            </Button>

            <Modal
                title={
                    <div className="flex items-center gap-2">
                        <QrcodeOutlined />
                        <span>Employee QR Code Data Viewer</span>
                    </div>
                }
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit}>
                        View Employee Data
                    </Button>
                ]}
                width={600}
                centered
            >
                <div className="space-y-4">
                    <Alert
                        message="Instructions"
                        description="Enter an Employee ID or paste the QR code URL to view employee information."
                        type="info"
                        showIcon
                        className="mb-4"
                    />

                    {error && (
                        <Alert
                            message="Error"
                            description={error}
                            type="error"
                            showIcon
                            closable
                            onClose={() => setError(null)}
                        />
                    )}

                    <Card title="Employee Lookup" className="mb-4">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Employee ID or QR Code URL:
                                </label>
                                <Input
                                    value={manualInput}
                                    onChange={(e) => setManualInput(e.target.value)}
                                    placeholder="Enter Employee ID (e.g., 240814001) or paste QR URL"
                                    prefix={<SearchOutlined />}
                                    onPressEnter={handleSubmit}
                                />
                            </div>
                        </Space>
                    </Card>

                    <Card title="Quick Demo" className="mb-4">
                        <div className="text-center">
                            <p className="mb-3 text-gray-600">
                                Want to see how the employee information page looks?
                            </p>
                            <Button 
                                icon={<FileTextOutlined />}
                                onClick={openSamplePage}
                                type="dashed"
                            >
                                View Sample Employee Data
                            </Button>
                        </div>
                    </Card>

                    <div className="text-center text-gray-600 text-sm">
                        <p><strong>How to use:</strong></p>
                        <p>1. Generate a QR code from the employee table</p>
                        <p>2. Scan the QR code or copy its URL</p>
                        <p>3. Paste the URL above or just enter the Employee ID</p>
                        <p>4. Click "View Employee Data" to see the information</p>
                    </div>
                </div>
            </Modal>
        </>
    );
}

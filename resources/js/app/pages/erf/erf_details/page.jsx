import React, { useState, useEffect } from "react";
import {
    Card,
    Descriptions,
    Button,
    Alert,
    Spin,
    Badge,
    Typography,
    Row,
    Col,
    Divider,
    Modal,
    Input,
    message,
} from "antd";
import {
    ArrowLeftOutlined,
    FileTextOutlined,
    UserOutlined,
    CalendarOutlined,
} from "@ant-design/icons";
import moment from "moment";
import axios from "axios";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function ErfDetailsPage() {
    const [erfData, setErfData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [declineModalVisible, setDeclineModalVisible] = useState(false);
    const [declineReason, setDeclineReason] = useState("");

    // Extract reference ID from URL path
    const ref_id = window.location.pathname.split("/")[3];

    // Helper function to format values
    const formatValue = (value) => {
        if (
            value === undefined ||
            value === null ||
            value === "" ||
            value === "undefined"
        ) {
            return "--";
        }
        return value;
    };

    // Helper function to format date
    const formatDate = (date) => {
        if (!date) return "--";
        return moment(date).format("MMMM DD, YYYY");
    };

    // Get status badge color
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return "success";
            case "approved by site head":
                return "processing";
            case "declined":
                return "error";
            case "pending":
                return "processing";
            default:
                return "default";
        }
    };

    // Fetch ERF data
    useEffect(() => {
        const fetchErfData = async () => {
            try {
                if (ref_id) {
                    setLoading(true);
                    const response = await axios.get(
                        `/api/outsourcing_erf_by_id/${ref_id}`,
                    );
                    setErfData(response.data.data);
                    console.log("ERF Data:", response.data.data);
                } else {
                    setError("No reference ID provided");
                }
            } catch (err) {
                console.error("Error fetching ERF data:", err);
                setError("Failed to fetch ERF details");
            } finally {
                setLoading(false);
            }
        };

        fetchErfData();
    }, [ref_id]);

    // Handle back navigation
    const handleBack = () => {
        window.history.back();
    };

    // Handle ERF approval
    const handleApprove = async () => {
        try {
            setActionLoading(true);
            const response = await axios.put(
                `/api/outsourcing_erf/${erfData.id}`,
                {
                    id: erfData.id,
                    status: "Approved by Site Head",
                    ref_id: erfData.ref_id,
                    budgetCost: erfData.budgetCost,
                    jobTitle: erfData.jobTitle,
                    site: erfData.site,
                },
            );

            if (response.status === 200) {
                message.success(
                    "ERF has been approved by Site Head successfully",
                );
                // Update local state
                setErfData((prev) => ({
                    ...prev,
                    status: "Approved by Site Head",
                }));
            }
        } catch (error) {
            console.error("Error approving ERF:", error);
            message.error("Failed to approve ERF. Please try again.");
        } finally {
            setActionLoading(false);
        }
    };

    // Handle ERF decline
    const handleDecline = () => {
        setDeclineModalVisible(true);
    };

    // Submit decline with reason
    const handleDeclineSubmit = async () => {
        if (!declineReason.trim()) {
            message.error("Please provide a reason for declining the ERF");
            return;
        }

        try {
            setActionLoading(true);
            const response = await axios.put(
                `/api/outsourcing_erf/${erfData.id}`,
                {
                    id: erfData.id,
                    status: "Declined",
                    reason: declineReason,
                    ref_id: erfData.ref_id,
                    requestor_email:
                        erfData.user?.employee?.applicant?.email ||
                        erfData.user?.employee?.eogs ||
                        erfData.user?.email,
                },
            );

            if (response.status === 200) {
                message.success("ERF has been declined successfully");
                // Update local state
                setErfData((prev) => ({
                    ...prev,
                    status: "Declined",
                    reason: declineReason,
                }));
                setDeclineModalVisible(false);
                setDeclineReason("");
            }
        } catch (error) {
            console.error("Error declining ERF:", error);
            message.error("Failed to decline ERF. Please try again.");
        } finally {
            setActionLoading(false);
        }
    };

    // Cancel decline modal
    const handleDeclineCancel = () => {
        setDeclineModalVisible(false);
        setDeclineReason("");
    };

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "400px",
                }}
            >
                <Spin size="large" tip="Loading ERF details..." />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: "20px" }}>
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

    return (
        <div
            style={{
                padding: "24px",
                background: "#f5f5f5",
                minHeight: "100vh",
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: "24px" }}>
                <Title level={2} style={{ margin: 0 }}>
                    <FileTextOutlined style={{ marginRight: "8px" }} />
                    Employee Requisition Form Details
                </Title>
                <Text type="secondary">
                    Reference ID: {formatValue(erfData.ref_id)}
                </Text>
            </div>

            <Row gutter={[24, 24]}>
                {/* Main ERF Information */}
                <Col xs={24} lg={16}>
                    <Card
                        title="ERF Information"
                        style={{ marginBottom: "24px" }}
                        extra={
                            <Badge
                                status={getStatusColor(erfData.status)}
                                text={formatValue(erfData.status)}
                            />
                        }
                    >
                        <Descriptions bordered column={{ xs: 1, sm: 2 }}>
                            <Descriptions.Item label="Job Title">
                                <strong>{formatValue(erfData.jobTitle)}</strong>
                            </Descriptions.Item>
                            <Descriptions.Item label="Job Type">
                                {formatValue(erfData.jobType)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Department">
                                {formatValue(erfData.department)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Account">
                                {formatValue(erfData.account)}
                            </Descriptions.Item>
                            <Descriptions.Item label="No. of Personnel">
                                {formatValue(erfData.personnel)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Target Date">
                                {formatDate(erfData.dateNeed)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Position Status">
                                {formatValue(erfData.positionStatus)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Sourcing Method">
                                {formatValue(erfData.sourcingMethod)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Budget/Cost per head">
                                {erfData.budgetCost
                                    ? `₱${parseFloat(erfData.budgetCost).toLocaleString()}`
                                    : "--"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Site">
                                {formatValue(erfData.site)}
                            </Descriptions.Item>
                        </Descriptions>

                        <Divider />

                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Justification/Reason">
                                <div style={{ whiteSpace: "pre-wrap" }}>
                                    {formatValue(erfData.justification)}
                                </div>
                            </Descriptions.Item>
                            {erfData.reason && (
                                <Descriptions.Item label="Decline Reason">
                                    <Text
                                        type="danger"
                                        style={{ whiteSpace: "pre-wrap" }}
                                    >
                                        {formatValue(erfData.reason)}
                                    </Text>
                                </Descriptions.Item>
                            )}
                        </Descriptions>
                    </Card>

                    {/* Action buttons - only show if status is Pending */}
                    {erfData.status === "Pending" && (
                        <div style={{ marginTop: "16px" }}>
                            <Button
                                type="primary"
                                style={{ margin: "10px", width: "45%" }}
                                loading={actionLoading}
                                onClick={handleApprove}
                            >
                                Approve
                            </Button>
                            <Button
                                type="danger"
                                style={{ margin: "10px", width: "45%" }}
                                loading={actionLoading}
                                onClick={handleDecline}
                            >
                                Decline
                            </Button>
                        </div>
                    )}

                    {/* Show status message for non-pending ERFs */}
                    {erfData.status !== "Pending" && (
                        <div style={{ marginTop: "16px", textAlign: "center" }}>
                            <Alert
                                message={`ERF has been ${erfData.status}`}
                                type={
                                    erfData.status === "Approved"
                                        ? "success"
                                        : erfData.status ===
                                            "Approved by Site Head"
                                          ? "info"
                                          : "error"
                                }
                                showIcon
                            />
                        </div>
                    )}
                </Col>

                {/* Requestor Information */}
                <Col xs={24} lg={8}>
                    <Card
                        title={
                            <span>
                                <UserOutlined style={{ marginRight: "8px" }} />
                                Requestor Information
                            </span>
                        }
                        style={{ marginBottom: "24px" }}
                    >
                        <Descriptions column={1}>
                            <Descriptions.Item label="Submitted By">
                                {formatValue(erfData.submitted)}
                            </Descriptions.Item>
                            {erfData.user && (
                                <>
                                    <Descriptions.Item label="Full Name">
                                        {`${formatValue(erfData.user.employee_fname)} ${formatValue(erfData.user.employee_lname)}`}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Department">
                                        {formatValue(erfData.user.department)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Position">
                                        {formatValue(erfData.user.position)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Site">
                                        {formatValue(erfData.user.site)}
                                    </Descriptions.Item>
                                </>
                            )}
                        </Descriptions>
                    </Card>

                    {/* Job Analysis & Description */}
                    <Card
                        title={
                            <span>
                                <FileTextOutlined
                                    style={{ marginRight: "8px" }}
                                />
                                Job Documents
                            </span>
                        }
                    >
                        <div style={{ textAlign: "center" }}>
                            {erfData.ja && (
                                <Button
                                    type="primary"
                                    style={{ margin: "8px", width: "100%" }}
                                    onClick={() => {
                                        // Navigate to job analysis page with correct URL structure
                                        window.open(
                                            `/admin/sourcing/job_title_section/job_analysis/${ref_id}`,
                                            "_blank",
                                        );
                                    }}
                                >
                                    View Job Analysis
                                </Button>
                            )}
                            {erfData.jd && (
                                <Button
                                    type="primary"
                                    style={{ margin: "8px", width: "100%" }}
                                    onClick={() => {
                                        // Navigate to job description page with correct URL structure
                                        window.open(
                                            `/admin/sourcing/job_title_section/job_description/${ref_id}`,
                                            "_blank",
                                        );
                                    }}
                                >
                                    View Job Description
                                </Button>
                            )}
                            {!erfData.ja && !erfData.jd && (
                                <Text type="secondary">
                                    No job documents available
                                </Text>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Decline Modal */}
            <Modal
                title="Decline ERF"
                open={declineModalVisible}
                onOk={handleDeclineSubmit}
                onCancel={handleDeclineCancel}
                confirmLoading={actionLoading}
                okText="Decline ERF"
                okType="danger"
            >
                <div style={{ marginBottom: "16px" }}>
                    <Text strong>
                        Are you sure you want to decline this ERF for "
                        {erfData?.jobTitle}"?
                    </Text>
                </div>
                <div>
                    <Text>Please provide a reason for declining:</Text>
                    <TextArea
                        rows={4}
                        value={declineReason}
                        onChange={(e) => setDeclineReason(e.target.value)}
                        placeholder="Enter the reason for declining this ERF..."
                        style={{ marginTop: "8px" }}
                    />
                </div>
            </Modal>
        </div>
    );
}

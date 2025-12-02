import {
    FilePdfOutlined,
    LoadingOutlined,
    RobotOutlined,
    PlayCircleOutlined,
    PauseCircleOutlined,
    DownloadOutlined,
    ClockCircleOutlined,
    FileOutlined,
} from "@ant-design/icons";
import {
    Menu,
    Modal,
    Tooltip,
    Card,
    Row,
    Col,
    Alert,
    Button,
    Spin,
    Tag,
    Divider,
} from "antd";
import React from "react";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
    get_ai_interview_results,
    getInterviewRecordingService,
} from "@/app/pages/services/open-ai-service";

export default function ApplicantAiInterviewComponent({ data, item }) {
    const [open, setOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    // AI Interview specific states
    const [interviewData, setInterviewData] = useState(null);
    const [recordingData, setRecordingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [videoLoading, setVideoLoading] = useState(true);
    const [videoError, setVideoError] = useState(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Safety check for data and client-side rendering
    // if (!data || !isClient) {
    //     return (
    //         <Menu.Item icon={item?.icon} disabled>
    //             {item?.label || "Loading..."}{" "}
    //             {!data ? "(No data available)" : ""}
    //         </Menu.Item>
    //     );
    // }

    const openHandler = async () => {
        setOpen(true);
        await loadInterviewData();
    };

    const loadInterviewData = async () => {
        if (!data?.app_id) return;

        try {
            setLoading(true);
            setError(null);

            // Load interview results and recording data
            const [interviewResponse, recordingResponse] =
                await Promise.allSettled([
                    get_ai_interview_results(data.app_id),
                    getInterviewRecordingService(data.app_id),
                ]);

            // Handle interview results
            if (
                interviewResponse.status === "fulfilled" &&
                interviewResponse.value.data.status === "success"
            ) {
                setInterviewData(interviewResponse.value.data);
            }

            // Handle recording data
            if (
                recordingResponse.status === "fulfilled" &&
                recordingResponse.value.data.status === "success"
            ) {
                setRecordingData(recordingResponse.value.data.data);
                console.log(
                    "Recording data loaded:",
                    recordingResponse.value.data.data
                );
            } else {
                console.log(
                    "Recording response failed or no recording found:",
                    recordingResponse
                );
            }
        } catch (error) {
            console.error("Failed to load interview data:", error);
            setError("Failed to load interview data");
        } finally {
            setLoading(false);
        }
    };

    const handleConvertToPDF = async () => {
        try {
            setIsGeneratingPDF(true);
            const formElement = document?.getElementById(
                "interview-results-pdf"
            );

            if (!formElement) {
                console.error("Interview results element not found");
                return;
            }

            const canvas = await html2canvas(formElement, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save(
                `AI_Interview_${data?.fname}_${data?.lname}_${data?.app_id}.pdf`
            );
        } catch (error) {
            console.error("Error in PDF conversion:", error);
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    const formatDuration = (seconds) => {
        if (!seconds) return "N/A";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return "N/A";
        const mb = bytes / (1024 * 1024);
        return `${mb.toFixed(2)} MB`;
    };

    console.log("data", data);

    try {
        return (
            <>
                <Tooltip
                    title={`Application AI Interview of ${data?.fname} ${data?.lname}`}
                >
                    <button type="button" onClick={openHandler}>
                        <RobotOutlined className="h-9 w-9 text-2xl text-blue-500 hover:text-blue-600" />
                    </button>
                </Tooltip>
                <Modal
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    width={1400}
                    footer={null}
                    destroyOnClose={true}
                >
                    <div className="flex text-2xl items-center justify-center mb-4">
                        <RobotOutlined className="mr-3 text-blue-600" />
                        <h1>
                            <b>AI INTERVIEW RESULTS</b>
                        </h1>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-lg mb-1">
                                <b>
                                    {data?.fname} {data?.lname}
                                </b>{" "}
                                - {data?.app_id}
                            </h2>
                            {/* <Tag color="blue">Position: {data?.position}</Tag> */}
                            <Tag color="green">Site: {data?.site}</Tag>
                        </div>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Spin size="large" />
                            <span className="ml-3 text-lg">
                                Loading interview data...
                            </span>
                        </div>
                    ) : error ? (
                        <Alert
                            message="Error Loading Interview Data"
                            description={error}
                            type="error"
                            showIcon
                            className="mb-4"
                        />
                    ) : (
                        <div id="interview-results-pdf" className="space-y-6">
                            {/* Recording Section */}
                            {recordingData ? (
                                <Card
                                    title="📹 Interview Recording"
                                    className="mb-6"
                                >
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} lg={16}>
                                            <div className="bg-gray-100 rounded-lg overflow-hidden relative">
                                                {videoLoading && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                                                        <Spin size="large" />
                                                        <span className="ml-3 text-white">
                                                            Loading video...
                                                        </span>
                                                    </div>
                                                )}
                                                <video
                                                    controls
                                                    preload="metadata"
                                                    playsInline
                                                    className="w-full h-screen bg-red-500"
                                                    style={{
                                                        maxHeight: "400px",
                                                        minHeight: "200px",
                                                        objectFit: "contain",
                                                    }}
                                                    onLoadStart={() =>
                                                        setVideoLoading(true)
                                                    }
                                                    onLoadedMetadata={() => {
                                                        console.log(
                                                            "Video metadata loaded"
                                                        );
                                                        setVideoLoading(false);
                                                    }}
                                                    onCanPlay={() => {
                                                        console.log(
                                                            "Video can play"
                                                        );
                                                        setVideoLoading(false);
                                                    }}
                                                    onError={(e) => {
                                                        console.error(
                                                            "Video error:",
                                                            e
                                                        );
                                                        setVideoError(
                                                            e.target.error
                                                        );
                                                        setVideoLoading(false);
                                                    }}
                                                    onLoadedData={() => {
                                                        console.log(
                                                            "Video data loaded"
                                                        );
                                                    }}
                                                >
                                                    <source
                                                        src={
                                                            recordingData.file_url
                                                        }
                                                        type={
                                                            recordingData.file_type ||
                                                            "video/webm"
                                                        }
                                                    />
                                                    <source
                                                        src={
                                                            recordingData.file_url
                                                        }
                                                        type="video/mp4"
                                                    />
                                                    <source
                                                        src={
                                                            recordingData.file_url
                                                        }
                                                        type="video/webm"
                                                    />
                                                    <p className="text-center py-8">
                                                        Your browser does not
                                                        support video playback.
                                                        <br />
                                                        <a
                                                            href={
                                                                recordingData.file_url
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 underline"
                                                        >
                                                            Download the video
                                                            file
                                                        </a>
                                                    </p>
                                                </video>

                                                {/* Video Error or Alternative Display */}
                                                {videoError && (
                                                    <div className="absolute top-2 left-2 right-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                                        <p className="text-sm">
                                                            <strong>
                                                                Video Error:
                                                            </strong>{" "}
                                                            Unable to display
                                                            video. Error code:{" "}
                                                            {videoError?.code}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Alternative Access Methods */}
                                            <div className="mt-4 space-y-2">
                                                <Button
                                                    type="default"
                                                    icon={
                                                        <PlayCircleOutlined />
                                                    }
                                                    className="w-full"
                                                    onClick={() =>
                                                        window.open(
                                                            recordingData.file_url,
                                                            "_blank"
                                                        )
                                                    }
                                                >
                                                    Open in New Tab
                                                </Button>
                                                <div className="text-center">
                                                    <a
                                                        href={
                                                            recordingData.file_url
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 text-sm underline"
                                                    >
                                                        Direct Video Link
                                                    </a>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={24} lg={8}>
                                            <div className="space-y-4">
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="flex items-center mb-2">
                                                        <ClockCircleOutlined className="mr-2 text-blue-600" />
                                                        <b>Duration:</b>
                                                    </div>
                                                    <p className="text-lg">
                                                        {formatDuration(
                                                            recordingData.duration
                                                        )}
                                                    </p>
                                                </div>

                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="flex items-center mb-2">
                                                        <FileOutlined className="mr-2 text-green-600" />
                                                        <b>File Size:</b>
                                                    </div>
                                                    <p className="text-lg">
                                                        {formatFileSize(
                                                            recordingData.file_size
                                                        )}
                                                    </p>
                                                </div>

                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="flex items-center mb-2">
                                                        <ClockCircleOutlined className="mr-2 text-purple-600" />
                                                        <b>Interview Date:</b>
                                                    </div>
                                                    <p>
                                                        {recordingData.interview_date
                                                            ? new Date(
                                                                  recordingData.interview_date
                                                              ).toLocaleString()
                                                            : "N/A"}
                                                    </p>
                                                </div>

                                                <Button
                                                    type="primary"
                                                    icon={<DownloadOutlined />}
                                                    className="w-full"
                                                    onClick={() =>
                                                        window.open(
                                                            recordingData.file_url,
                                                            "_blank"
                                                        )
                                                    }
                                                >
                                                    Download Recording
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            ) : (
                                <Alert
                                    message="No Interview Recording Found"
                                    description="This applicant has not completed the AI interview or the recording is not available."
                                    type="warning"
                                    showIcon
                                    className="mb-6"
                                />
                            )}

                            {(interviewData?.data?.length > 0 ||
                                recordingData) && (
                                <Card
                                    title="📊 Interview Summary"
                                    className="mb-6"
                                >
                                    <Row gutter={[16, 16]}>
                                        <Col xs={12} sm={6}>
                                            <div className="text-center bg-blue-50 p-4 rounded-lg">
                                                <h3 className="text-2xl font-bold text-blue-600">
                                                    {interviewData?.data
                                                        ?.length || 0}
                                                </h3>
                                                <p className="text-gray-600">
                                                    Questions Answered
                                                </p>
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <div className="text-center bg-green-50 p-4 rounded-lg">
                                                <h3 className="text-2xl font-bold text-green-600">
                                                    {recordingData
                                                        ? formatDuration(
                                                              recordingData.duration
                                                          )
                                                        : "N/A"}
                                                </h3>
                                                <p className="text-gray-600">
                                                    Interview Duration
                                                </p>
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <div className="text-center bg-purple-50 p-4 rounded-lg">
                                                <h3 className="text-2xl font-bold text-purple-600">
                                                    {recordingData
                                                        ? formatFileSize(
                                                              recordingData.file_size
                                                          )
                                                        : "N/A"}
                                                </h3>
                                                <p className="text-gray-600">
                                                    Recording Size
                                                </p>
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <div className="text-center bg-orange-50 p-4 rounded-lg">
                                                <h3 className="text-2xl font-bold text-orange-600">
                                                    {recordingData?.interview_date
                                                        ? new Date(
                                                              recordingData.interview_date
                                                          ).toLocaleDateString()
                                                        : "N/A"}
                                                </h3>
                                                <p className="text-gray-600">
                                                    Interview Date
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            )}
                        </div>
                    )}
                </Modal>
            </>
        );
    } catch (error) {
        console.error("Error rendering ApplicantDetaillsComponent:", error);
        return (
            <Menu.Item icon={item?.icon} disabled>
                {item?.label} (Error loading)
            </Menu.Item>
        );
    }
}

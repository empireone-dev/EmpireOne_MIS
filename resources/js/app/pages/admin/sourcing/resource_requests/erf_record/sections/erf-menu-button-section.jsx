import React from "react";
import { Button, Dropdown, message, Space, Modal, Menu } from "antd";
import {
    DeliveredProcedureOutlined,
    DownOutlined,
    EditOutlined,
    FileOutlined,
    FileSearchOutlined,
    FileTextOutlined,
    FolderOpenOutlined,
} from "@ant-design/icons";
import ErfJAComponent from "../components/erf-ja-component";
import ErfJdComponent from "../components/erf-jd-component";
import ErfUpdateStatusComponent from "../components/erf-update-status-component";
// import UpdateEmployeeComponent from "../components/update-employee-component";
// import File201Component from "../components/file-201-component";
// import EmploymentStatusComponent from "../components/employment-status-component";
// import PrintCoeComponent from "../components/print-coe-component";
// import GenerateQrComponent from "../components/generate-qr-component";
// import FileIrComponent from "../components/file-ir-component";
// import FileNteComponent from "../components/file-nte-component";


export default function ErfMenuButtonSection({ data }) {
    const items = [
        {
            component: (
                <ErfUpdateStatusComponent
                    item={{
                        label: "Update Status",
                        key: "1",
                        icon: <EditOutlined />,
                    }}
                    data={data}
                />
            ),
        },
        {
            component: (
                <ErfJAComponent
                    item={{
                        label: "Job Analysis",
                        key: "2",
                        icon: <FileOutlined />,
                    }}
                    data={data}
                />
            ),
        },
        {
            component: (
                <ErfJdComponent
                    item={{
                        label: "Job Description",
                        key: "3",
                        icon: <FileTextOutlined />,
                    }}
                    data={data}
                />
            ),
        },
        
        // ...(data?.estatus == "Pending"
        //     ? [
        //         {
        //             component: (
        //                 <AttritionExitInterviewComponent
        //                     // status="Initial Phase"
        //                     item={{
        //                         label: "Procees Exit Interview & Clearance",
        //                         key: "3",
        //                         icon: <DeliveredProcedureOutlined />,
        //                     }}
        //                     data={data}
        //                 />
        //             ),
        //         },
        //     ]
        //     : []),
        // ...(data.status == "Initial Phase"
        //     ? [
        //         {
        //             component: (
        //                 <ApplicantInitialRatingScale
        //                     item={{
        //                         label: "Initial Rating Scale",
        //                         key: "3",
        //                         icon: <DotChartOutlined />,
        //                     }}
        //                     data={data}
        //                 />
        //             ),
        //         },
        //     ]
        //     : []),
        // ...(data.status == "Final Phase"
        //     ? [
        //         {
        //             component: (
        //                 <ApplicantProceedInitalPhaseComponent
        //                     item={{
        //                         label: "Initial Phase Result",
        //                         key: "4",
        //                         icon: <InfoCircleOutlined />,
        //                     }}
        //                     data={data}
        //                 />
        //             ),
        //         },
        //     ]
        //     : []),
        // ...(data.status == "Final Phase" && data.final
        //     ? [
        //         {
        //             component: (
        //                 <ApplicantFinalRatingScaleComponent
        //                     item={{
        //                         label: "Final Rating Scale",
        //                         key: "5",
        //                         icon: <DotChartOutlined />,
        //                     }}
        //                     data={data}
        //                 />
        //             ),
        //         },
        //     ]
        //     : []),
        // ...(data.status == "Final Phase" && !data.final
        //     ? [
        //         {
        //             component: (
        //                 <ApplicantSetScheduleComponent
        //                     status="Final Phase"
        //                     item={{
        //                         label: "Set Schedule Final Phase",
        //                         key: "6",
        //                         icon: <CalendarOutlined />,
        //                     }}
        //                     data={data}
        //                 />
        //             ),
        //         },
        //     ]
        //     : []),
        // ...(data.status == "Final Phase" && !data.final
        //     ? [
        //         {
        //             component: (
        //                 <ApplicantCheckScheduleComponent
        //                     data={data}
        //                     item={{
        //                         label: "Check Schedule of Interviewer",
        //                         key: "7",
        //                         icon: <ScheduleOutlined />,
        //                     }}
        //                 />
        //             ),
        //         },
        //     ]
        //     : []),
        // ...(data.status == "Passed" ||
        //     data.status == "Pooling" ||
        //     data.status == "Failed" ||
        //     data.status == "Dismissal" ||
        //     data.status == "Resignation" ||
        //     data.status == "EOPE" ||
        //     data.status == "AWOL" ||
        //     data.status == "Probationary" ||
        //     data.status == "Regular"
        //     ? [
        //         {
        //             component: (
        //                 <ApplicantResultsComponent
        //                     data={data}
        //                     item={{
        //                         label: "Application Results",
        //                         key: "8",
        //                         icon: <InfoCircleOutlined />,
        //                     }}
        //                 />
        //             ),
        //         },
        //     ]
        //     : []),
        // ...(data.status == "Passed"
        //     ? [
        //         {
        //             component: (
        //                 <ApplicantJobOfferComponent
        //                     item={{
        //                         label: "Job Offer",
        //                         key: "9",
        //                         icon: (
        //                             <BriefcaseIcon className="h-4 mr-0.5" />
        //                         ),
        //                     }}
        //                     data={data}
        //                 />
        //             ),
        //         },
        //     ]
        //     : []),
    ];
console.log('data',data)
    return (
        <div>
            <Dropdown
                overlay={
                    <Menu>
                        {items.map((item, i) => {
                            return item.component;
                        })}
                    </Menu>
                }
                trigger={["click"]}
            >
                <Button type="primary">
                    <Space>
                        Menu
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </div>
    );
}

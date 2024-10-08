import React from "react";
import { Button, Dropdown, message, Space, Modal, Menu } from "antd";
import {
    DeliveredProcedureOutlined,
    DownOutlined,
    EditOutlined,
    FolderOpenOutlined,
    PrinterOutlined,
    QrcodeOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import File201Component from "../../../employee_relation/employee_section/components/file-201-component";
// import UpdateEmployeeComponent from "../components/update-employee-component";
// import File201Component from "../components/file-201-component";
// import EmploymentStatusComponent from "../components/employment-status-component";
// import PrintCoeComponent from "../components/print-coe-component";
// import GenerateQrComponent from "../components/generate-qr-component";
// import FileIrComponent from "../components/file-ir-component";
// import FileNteComponent from "../components/file-nte-component";


export default function AttritionMenuSection({ data }) {
    const items = [
        // {
        //     component: (
        //         <UpdateEmployeeComponent
        //             item={{
        //                 label: "Update Employee",
        //                 key: "1",
        //                 icon: <EditOutlined />,
        //             }}
        //             data={data}
        //         />
        //     ),
        // },
        {
            component: (
                <File201Component
                    item={{
                        label: "201 File",
                        key: "2",
                        icon: <FolderOpenOutlined />,
                    }}
                    data={data}
                />
            ),
        },
        // ...(data.status == "Cleared"
        //     ? [
        //         {
        //             component: (
        //                 <ApplicantSetScheduleComponent
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

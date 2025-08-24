import React from "react";
import { Button, Dropdown, message, Space, Modal, Menu } from "antd";
import {
    DeliveredProcedureOutlined,
    DownOutlined,
    EditOutlined,
    FileDoneOutlined,
    FileSearchOutlined,
    FolderOpenOutlined,
    SolutionOutlined,
} from "@ant-design/icons";
import File201Component from "../../../employee_relation/employee_section/components/file-201-component";
import AttritionReasonComponent from "../components/attrition-reason-components";
import AttritionExitInterviewComponent from "../components/attrition-exit-interview-component";
import AttritionExitInterviewResultComponent from "../components/attrition-exit-interview-result-component";
import AttritionUploadClearanceComponent from "../components/attrition-upload-clearance-component";
import AttritionQuitClaimComponent from "../components/attrition-quit-claim-component";
import AttritionViewQuitClaimComponent from "../components/attirition-view-quit-claim-component";
// import UpdateEmployeeComponent from "../components/update-employee-component";
// import File201Component from "../components/file-201-component";
// import EmploymentStatusComponent from "../components/employment-status-component";
// import PrintCoeComponent from "../components/print-coe-component";
// import GenerateQrComponent from "../components/generate-qr-component";
// import FileIrComponent from "../components/file-ir-component";
// import FileNteComponent from "../components/file-nte-component";


export default function AttritionMenuSection({ data }) {
    const items = [
        {
            component: (
                <AttritionReasonComponent
                    item={{
                        label: "View Reason",
                        key: "1",
                        icon: <FileSearchOutlined />,
                    }}
                    data={data}
                />
            ),
        },
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
        ...(data?.estatus == "Pending Clearance" || data?.estatus == "Cleared"
            ? [
                {
                    component: (
                        <AttritionExitInterviewResultComponent
                            // status="Exit Interview Results"
                            item={{
                                label: "Exit Interview Results",
                                key: "3",
                                icon: <FileDoneOutlined />,
                            }}
                            data={data}
                        />
                    ),
                },
            ]
            : []),
        ...(data?.estatus == "Pending"
            ? [
                {
                    component: (
                        <AttritionExitInterviewComponent
                            // status="Exit Interview"
                            item={{
                                label: "Proceed Exit Interview",
                                key: "3",
                                icon: <DeliveredProcedureOutlined />,
                            }}
                            data={data}
                        />
                    ),
                },
            ]
            : []),
        ...(data?.estatus == "Pending Clearance"
            ? [
                {
                    component: (
                        <AttritionUploadClearanceComponent
                            // status="Exit Clearance"
                            item={{
                                label: "Upload Exit Clearance",
                                key: "3",
                                icon: <DeliveredProcedureOutlined />,
                            }}
                            data={data}
                        />
                    ),
                },
            ]
            : []),
        ...(data?.estatus == "Cleared" && !data?.quit_claim
            ? [
                {
                    component: (
                        <AttritionQuitClaimComponent
                            // status="Quit Claim"
                            item={{
                                label: "Send Quit Claim",
                                key: "3",
                                icon: <DeliveredProcedureOutlined />,
                            }}
                            data={data}
                        />
                    ),
                },
            ]
            : []),
        ...(data?.quit_claim
            ? [
                {
                    component: (
                        <AttritionViewQuitClaimComponent
                            item={{
                                label: "View Quit Claim",
                                key: "1",
                                icon: <SolutionOutlined />,
                            }}
                            data={data}
                        />
                    ),
                },
            ]
            : []),
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
    console.log('data', data)
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

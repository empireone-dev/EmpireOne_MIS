import React from "react";
import { Button, Dropdown, message, Space, Modal, Menu } from "antd";
import {
    AuditOutlined,
    CalendarOutlined,
    CheckCircleFilled,
    DotChartOutlined,
    DownOutlined,
    InfoCircleOutlined,
    LoadingOutlined,
    MedicineBoxOutlined,
    RiseOutlined,
    ScheduleOutlined,
    SolutionOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import ApplicantProceedInitalPhaseComponent from "../components/applicant-proceed-inital-phase-component";
import ApplicantInitialRatingScale from "../components/applicant-initial-rating-scale";
import ApplicantFinalRatingScaleComponent from "../components/applicant-final-rating-scale-component";
import ApplicantCheckScheduleComponent from "../components/applicant-check-schedule-component";
import ApplicantResultsComponent from "../components/applicant-results-component";
import ApplicantJobOfferComponent from "../components/applicant-job-offer-component";
import ApplicantDetaillsComponent from "../components/applicant-detaills-component";
import ApplicantSetScheduleComponent from "../components/applicant-set-schedule-component";
import ApplicantPoolingComponent from "../components/applicant-pooling-component";
import ApplicantCvFileComponent from "../components/applicant-cv-file-component";

export default function ApplicantMenuSection({ data, interviewer }) {
    const items = [
        {
            component: (
                <ApplicantDetaillsComponent
                    item={{
                        label: "Application Details",
                        key: "1",
                        icon: <AuditOutlined />,
                    }}
                    data={data}
                />
            ),
        },
        {
            component: (
                <ApplicantCvFileComponent
                    item={{
                        label: "CV FIle",
                        key: "1",
                        icon: <SolutionOutlined />,
                    }}
                    data={data}
                />
            ),
        },
        ...(data.status == "Pending"
            ? [
                {
                    component: (
                        <ApplicantSetScheduleComponent
                            status="Initial Phase"
                            item={{
                                label: "Proceed to Initial Phase",
                                key: "2",
                                icon: <RiseOutlined />,
                            }}
                            data={data}
                        />
                    ),
                },
            ]
            : []),
        ...(data.status == "Initial Phase"
            ? [
                {
                    component: (
                        <ApplicantInitialRatingScale
                            item={{
                                label: "Initial Rating Scale",
                                key: "3",
                                icon: <DotChartOutlined />,
                            }}
                            data={data}
                        />
                    ),
                },
            ]
            : []),
        ...(data.status == "Final Phase"
            ? [
                {
                    component: (
                        <ApplicantProceedInitalPhaseComponent
                            item={{
                                label: "Initial Phase Result",
                                key: "4",
                                icon: <InfoCircleOutlined />,
                            }}
                            data={data}
                        />
                    ),
                },
            ]
            : []),
        ...(data.status == "Final Phase" && data.final
            ? [
                {
                    component: (
                        <ApplicantFinalRatingScaleComponent
                            item={{
                                label: "Final Rating Scale",
                                key: "5",
                                icon: <DotChartOutlined />,
                            }}
                            data={data}
                        />
                    ),
                },
            ]
            : []),
        ...(data.status == "Final Phase" && !data.final
            ? [
                {
                    component: (
                        <ApplicantSetScheduleComponent
                            status="Final Phase"
                            item={{
                                label: "Set Schedule Final Phase",
                                key: "6",
                                icon: <CalendarOutlined />,
                            }}
                            data={data}
                        />
                    ),
                },
            ]
            : []),
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
        ...(data.status == "Passed" ||
            data.status == "Pooling" ||
            data.status == "Failed" ||
            data.status == "Dismissal" ||
            data.status == "Resignation" ||
            data.status == "EOPE" ||
            data.status == "AWOL" ||
            data.status == "Probationary" ||
            data.status == "Regular"
            ? [
                {
                    component: (
                        <ApplicantResultsComponent
                            data={data}
                            item={{
                                label: "Application Results",
                                key: "8",
                                icon: <InfoCircleOutlined />,
                            }}
                        />
                    ),
                },
            ]
            : []),
        ...(data.status == "Passed"
            ? [
                {
                    component: (
                        <ApplicantPoolingComponent
                            item={{
                                label: "Proceed for Pooling",
                                key: "9",
                                icon: <TeamOutlined />,
                            }}
                            data={data}
                        />
                    ),
                },
            ]
            : []),
        ...(data.status == "Passed" || data.status == "Pooling"
            ? [
                {
                    component: (
                        <ApplicantJobOfferComponent
                            item={{
                                label: "Make a Job Offer",
                                key: "10",
                                icon: (
                                    <BriefcaseIcon className="h-4 mr-0.5" />
                                ),
                            }}
                            data={data}
                        />
                    ),
                },
            ]
            : []),

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

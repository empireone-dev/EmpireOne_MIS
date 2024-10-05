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
} from "@ant-design/icons";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import ApplicantDetaillsComponent from "../../../recruitment/applicants/applicant_records/components/applicant-detaills-component";
import ApplicantSetScheduleComponent from "../../../recruitment/applicants/applicant_records/components/applicant-set-schedule-component";
import ApplicantInitialRatingScale from "../../../recruitment/applicants/applicant_records/components/applicant-initial-rating-scale";
import ApplicantProceedInitalPhaseComponent from "../../../recruitment/applicants/applicant_records/components/applicant-proceed-inital-phase-component";
import ApplicantFinalRatingScaleComponent from "../../../recruitment/applicants/applicant_records/components/applicant-final-rating-scale-component";
import ApplicantCheckScheduleComponent from "../../../recruitment/applicants/applicant_records/components/applicant-check-schedule-component";
import ApplicantResultsComponent from "../../../recruitment/applicants/applicant_records/components/applicant-results-component";
import ApplicantJobOfferComponent from "../../../recruitment/applicants/applicant_records/components/applicant-job-offer-component";


export default function EmployeeMenuSection({ data, interviewer }) {
    // const items = [
    //     {
    //         component: (
    //             <ApplicantDetaillsComponent
    //                 item={{
    //                     label: "Application Details",
    //                     key: "1",
    //                     icon: <AuditOutlined />,
    //                 }}
    //                 data={data}
    //             />
    //         ),
    //     },
    //     ...(data.status == "Pending"
    //         ? [
    //             {
    //                 component: (
    //                     <ApplicantSetScheduleComponent
    //                         status="Initial Phase"
    //                         item={{
    //                             label: "Proceed to Initial Phase",
    //                             key: "2",
    //                             icon: <RiseOutlined />,
    //                         }}
    //                         data={data}
    //                     />
    //                 ),
    //             },
    //         ]
    //         : []),
    //     ...(data.status == "Initial Phase"
    //         ? [
    //             {
    //                 component: (
    //                     <ApplicantInitialRatingScale
    //                         item={{
    //                             label: "Initial Rating Scale",
    //                             key: "3",
    //                             icon: <DotChartOutlined />,
    //                         }}
    //                         data={data}
    //                     />
    //                 ),
    //             },
    //         ]
    //         : []),
    //     ...(data.status == "Final Phase"
    //         ? [
    //             {
    //                 component: (
    //                     <ApplicantProceedInitalPhaseComponent
    //                         item={{
    //                             label: "Initial Phase Result",
    //                             key: "4",
    //                             icon: <InfoCircleOutlined />,
    //                         }}
    //                         data={data}
    //                     />
    //                 ),
    //             },
    //         ]
    //         : []),
    //     ...(data.status == "Final Phase" && data.final
    //         ? [
    //             {
    //                 component: (
    //                     <ApplicantFinalRatingScaleComponent
    //                         item={{
    //                             label: "Final Rating Scale",
    //                             key: "5",
    //                             icon: <DotChartOutlined />,
    //                         }}
    //                         data={data}
    //                     />
    //                 ),
    //             },
    //         ]
    //         : []),
    //     ...(data.status == "Final Phase" && !data.final
    //         ? [
    //             {
    //                 component: (
    //                     <ApplicantSetScheduleComponent
    //                         status="Final Phase"
    //                         item={{
    //                             label: "Set Schedule Final Phase",
    //                             key: "6",
    //                             icon: <CalendarOutlined />,
    //                         }}
    //                         data={data}
    //                     />
    //                 ),
    //             },
    //         ]
    //         : []),
    //     ...(data.status == "Final Phase" && !data.final
    //         ? [
    //             {
    //                 component: (
    //                     <ApplicantCheckScheduleComponent
    //                         data={data}
    //                         item={{
    //                             label: "Check Schedule of Interviewer",
    //                             key: "7",
    //                             icon: <ScheduleOutlined />,
    //                         }}
    //                     />
    //                 ),
    //             },
    //         ]
    //         : []),
    //     ...(data.status == "Passed" ||
    //         data.status == "Pooling" ||
    //         data.status == "Failed" ||
    //         data.status == "Dismissal" ||
    //         data.status == "Resignation" ||
    //         data.status == "EOPE" ||
    //         data.status == "AWOL" ||
    //         data.status == "Probationary" ||
    //         data.status == "Regular"
    //         ? [
    //             {
    //                 component: (
    //                     <ApplicantResultsComponent
    //                         data={data}
    //                         item={{
    //                             label: "Application Results",
    //                             key: "8",
    //                             icon: <InfoCircleOutlined />,
    //                         }}
    //                     />
    //                 ),
    //             },
    //         ]
    //         : []),
    //     ...(data.status == "Passed"
    //         ? [
    //             {
    //                 component: (
    //                     <ApplicantJobOfferComponent
    //                         item={{
    //                             label: "Job Offer",
    //                             key: "9",
    //                             icon: (
    //                                 <BriefcaseIcon className="h-4 mr-0.5" />
    //                             ),
    //                         }}
    //                         data={data}
    //                     />
    //                 ),
    //             },
    //         ]
    //         : []),
    // ];

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

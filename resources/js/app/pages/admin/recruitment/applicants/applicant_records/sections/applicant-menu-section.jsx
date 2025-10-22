import React from "react";
import { Button, Dropdown, message, Space, Modal, Menu } from "antd";
import {
    ArrowRightOutlined,
    AuditOutlined,
    CalendarOutlined,
    DeleteOutlined,
    DotChartOutlined,
    DownOutlined,
    InfoCircleOutlined,
    ReconciliationOutlined,
    RiseOutlined,
    SendOutlined,
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
import ApplicantRejectionComponent from "../components/applicant-rejection-component";
import ApplicantSetRescheduleComponent from "../components/applicant-set-reschedule-component";
import ApplicantImmediateInitialComponent from "../components/applicant-immediate-initial-component";
import ApplicantImmediateFinalComponent from "../components/applicant-immediate-final-component";
import ApplicantProceedFinalComponent from "../components/applicant-proceed-final-component";
import ApplicantDeleteComponent from "../components/applicant-delete-component";

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
        // {
        //     component: (
        //         <ApplicantDeleteComponent
        //             item={{
        //                 label: "Delete Application",
        //                 key: "1",
        //                 icon: <DeleteOutlined />,
        //             }}
        //             data={data}
        //         />
        //     ),
        // },
        ...(data.status == "Initial Phase"
            ? [
                  {
                      component: (
                          <ApplicantSetRescheduleComponent
                              status="Reschedule Initial Phase"
                              item={{
                                  label: "Reschedule Interview",
                                  key: "1",
                                  icon: <ReconciliationOutlined />,
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
                          <ApplicantSetRescheduleComponent
                              status="Reschedule Final Phase"
                              item={{
                                  label: "Reschedule Interview",
                                  key: "1",
                                  icon: <ReconciliationOutlined />,
                              }}
                              data={data}
                          />
                      ),
                  },
              ]
            : []),
        ...(data.status == "Pending"
            ? [
                  {
                      component: (
                          <ApplicantSetScheduleComponent
                              status="Initial Phase"
                              item={{
                                  label: "Set Initial Phase Interview",
                                  key: "2",
                                  icon: <RiseOutlined />,
                              }}
                              data={data}
                          />
                      ),
                  },
              ]
            : []),
        ...(data.status == "Pending"
            ? [
                  {
                      component: (
                          <ApplicantImmediateInitialComponent
                              status="Initial Phase"
                              item={{
                                  label: "Proceed Initial Interview",
                                  key: "2",
                                  icon: <ArrowRightOutlined />,
                              }}
                              data={data}
                          />
                      ),
                  },
              ]
            : []),
        ...(data.status == "Pending" || data.status == "Initial Phase"
            ? [
                  {
                      component: (
                          <ApplicantProceedFinalComponent
                              status="Initial Phase"
                              item={{
                                  label: "Proceed Final Phase",
                                  key: "2",
                                  icon: <ArrowRightOutlined />,
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
        ...(data.status == "Final Phase" || data.status == "For Final Phase"
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
        ...(data.status == "For Final Phase"
            ? [
                  {
                      component: (
                          <ApplicantImmediateFinalComponent
                              status="Final Phase"
                              item={{
                                  label: "Proceed Interview Immediately",
                                  key: "2",
                                  icon: <ArrowRightOutlined />,
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
        ...(data.status == "For Final Phase"
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
        data.status == "Regular" ||
        data.status == "Counter Offer" ||
        data.status == "Accepted Offer" ||
        data.status == "Send Failed"
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
        ...(data.status == "Send Failed"
            ? [
                  {
                      component: (
                          <ApplicantRejectionComponent
                              item={{
                                  label: "Sending Failed Email",
                                  key: "3",
                                  icon: <SendOutlined />,
                              }}
                              data={data}
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
        ...(data.status == "Passed" ||
        data.status == "Pooling" ||
        data.status == "Counter Offer" ||
        data.status == "Accepted Offer"
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

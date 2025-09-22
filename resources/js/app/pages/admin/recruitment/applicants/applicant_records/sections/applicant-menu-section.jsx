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
    // Safety check to ensure data exists and has required properties
    if (!data || typeof data !== 'object' || !data.status) {
        console.warn('ApplicantMenuSection: Invalid data provided', data);
        return null;
    }

    // Debug logging
    console.log('ApplicantMenuSection: Rendering with status:', data.status);

    try {
        const items = [
        {
            key: "details",
            component: (
                <ApplicantDetaillsComponent
                    item={{
                        label: "Application Details",
                        key: "details",
                        icon: <AuditOutlined />,
                    }}
                    data={data}
                />
            ),
        },
        {
            key: "delete",
            component: (
                <ApplicantDeleteComponent
                    item={{
                        label: "Delete Application",
                        key: "delete",
                        icon: <DeleteOutlined />,
                    }}
                    data={data}
                />
            ),
        },
        {
            key: "cv",
            component: (
                <ApplicantCvFileComponent
                    item={{
                        label: "CV File",
                        key: "cv",
                        icon: <SolutionOutlined />,
                    }}
                    data={data}
                />
            ),
        },
        ...(data.status === "Initial Phase"
            ? [
                  {
                      key: "reschedule-initial",
                      component: (
                          <ApplicantSetRescheduleComponent
                              status="Reschedule Initial Phase"
                              item={{
                                  label: "Reschedule Interview",
                                  key: "reschedule-initial",
                                  icon: <ReconciliationOutlined />,
                              }}
                              data={data}
                          />
                      ),
                  },
              ]
            : []),
        ...(data.status === "Final Phase"
            ? [
                  {
                      key: "reschedule-final",
                      component: (
                          <ApplicantSetRescheduleComponent
                              status="Reschedule Final Phase"
                              item={{
                                  label: "Reschedule Interview",
                                  key: "reschedule-final",
                                  icon: <ReconciliationOutlined />,
                              }}
                              data={data}
                          />
                      ),
                  },
              ]
            : []),
        ...(data.status === "Pending"
            ? [
                  {
                      key: "set-initial-schedule",
                      component: (
                          <ApplicantSetScheduleComponent
                              status="Initial Phase"
                              item={{
                                  label: "Set Initial Phase Interview",
                                  key: "set-initial-schedule",
                                  icon: <RiseOutlined />,
                              }}
                              data={data}
                          />
                      ),
                  },
              ]
            : []),
        ...(data.status === "Pending"
            ? [
                  {
                      key: "immediate-initial",
                      component: (
                          <ApplicantImmediateInitialComponent
                              status="Initial Phase"
                              item={{
                                  label: "Proceed Initial Interview",
                                  key: "immediate-initial",
                                  icon: <ArrowRightOutlined />,
                              }}
                              data={data}
                          />
                      ),
                  },
              ]
            : []),
        ...(data.status === "Pending" || data.status === "Initial Phase"
            ? [
                  {
                      key: "proceed-final",
                      component: (
                          <ApplicantProceedFinalComponent
                              status="Initial Phase"
                              item={{
                                  label: "Proceed Final Phase",
                                  key: "proceed-final",
                                  icon: <ArrowRightOutlined />,
                              }}
                              data={data}
                          />
                      ),
                  },
              ]
            : []),
        ...(data.status === "Initial Phase"
            ? [
                  {
                      key: "initial-rating",
                      component: (
                          <ApplicantInitialRatingScale
                              item={{
                                  label: "Initial Rating Scale",
                                  key: "initial-rating",
                                  icon: <DotChartOutlined />,
                              }}
                              data={data}
                          />
                      ),
                  },
              ]
            : []),
        ...(data.status === "Final Phase" || data.status === "For Final Phase"
            ? [
                  {
                      key: "initial-result",
                      component: (
                          <ApplicantProceedInitalPhaseComponent
                              item={{
                                  label: "Initial Phase Result",
                                  key: "initial-result",
                                  icon: <InfoCircleOutlined />,
                              }}
                              data={data}
                          />
                      ),
                  },
              ]
            : []),
        ...(data.status === "For Final Phase"
            ? [
                  {
                      key: "immediate-final",
                      component: (
                          <ApplicantImmediateFinalComponent
                              status="Final Phase"
                              item={{
                                  label: "Proceed Interview Immediately",
                                  key: "immediate-final",
                                  icon: <ArrowRightOutlined />,
                              }}
                              data={data}
                          />
                      ),
                  },
              ]
            : []),
        ...(data.status === "Final Phase"
            ? [
                  {
                      key: "final-rating",
                      component: (
                          <ApplicantFinalRatingScaleComponent
                              item={{
                                  label: "Final Rating Scale",
                                  key: "final-rating",
                                  icon: <DotChartOutlined />,
                              }}
                              data={data}
                          />
                      ),
                  },
              ]
            : []),
        ...(data.status === "For Final Phase"
            ? [
                  {
                      key: "set-final-schedule",
                      component: (
                          <ApplicantSetScheduleComponent
                              status="Final Phase"
                              item={{
                                  label: "Set Schedule Final Phase",
                                  key: "set-final-schedule",
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
        ...(data.status === "Passed" ||
        data.status === "Pooling" ||
        data.status === "Failed" ||
        data.status === "Dismissal" ||
        data.status === "Resignation" ||
        data.status === "EOPE" ||
        data.status === "AWOL" ||
        data.status === "Probationary" ||
        data.status === "Regular" ||
        data.status === "Counter Offer" ||
        data.status === "Accepted Offer" ||
        data.status === "Send Failed"
            ? [
                  {
                      key: "results",
                      component: (
                          <ApplicantResultsComponent
                              data={data}
                              item={{
                                  label: "Application Results",
                                  key: "results",
                                  icon: <InfoCircleOutlined />,
                              }}
                          />
                      ),
                  },
              ]
            : []),
        ...(data.status === "Send Failed"
            ? [
                  {
                      key: "rejection",
                      component: (
                          <ApplicantRejectionComponent
                              item={{
                                  label: "Sending Failed Email",
                                  key: "rejection",
                                  icon: <SendOutlined />,
                              }}
                              data={data}
                          />
                      ),
                  },
              ]
            : []),
        ...(data.status === "Passed"
            ? [
                  {
                      key: "pooling",
                      component: (
                          <ApplicantPoolingComponent
                              item={{
                                  label: "Proceed for Pooling",
                                  key: "pooling",
                                  icon: <TeamOutlined />,
                              }}
                              data={data}
                          />
                      ),
                  },
              ]
            : []),
        ...(data.status === "Passed" ||
        data.status === "Pooling" ||
        data.status === "Counter Offer" ||
        data.status === "Accepted Offer"
            ? [
                  {
                      key: "job-offer",
                      component: (
                          <ApplicantJobOfferComponent
                              item={{
                                  label: "Make a Job Offer",
                                  key: "job-offer",
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
                    menu={{
                        items: items.map((item, i) => ({
                            key: item.key || i.toString(),
                            label: item.component,
                        })),
                    }}
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
    } catch (error) {
        console.error('ApplicantMenuSection: Error rendering component', error);
        return <div>Error loading menu</div>;
    }
}

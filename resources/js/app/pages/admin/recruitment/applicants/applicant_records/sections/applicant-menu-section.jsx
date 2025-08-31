import React from "react";
import { Button, Dropdown, Space, Menu } from "antd";
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

// Factory helper to create an item wrapper
const renderItem = (Component, item, data, extraProps = {}) => ({
    component: <Component item={item} data={data} {...extraProps} />,
});

export default function ApplicantMenuSection({ data }) {
    const { status } = data;

    const items = [
        renderItem(ApplicantDetaillsComponent, {
            label: "Application Details",
            key: "1",
            icon: <AuditOutlined />,
        }, data),

        renderItem(ApplicantDeleteComponent, {
            label: "Delete Application",
            key: "2",
            icon: <DeleteOutlined />,
        }, data),

        // renderItem(ApplicantCvFileComponent, {
        //     label: "CV File",
        //     key: "3",
        //     icon: <SolutionOutlined />,
        // }, data),

        ...(status === "Initial Phase"
            ? [renderItem(ApplicantSetRescheduleComponent, {
                  label: "Reschedule Interview",
                  key: "4",
                  icon: <ReconciliationOutlined />,
              }, data, { status: "Reschedule Initial Phase" })]
            : []),

        ...(status === "Final Phase"
            ? [renderItem(ApplicantSetRescheduleComponent, {
                  label: "Reschedule Interview",
                  key: "5",
                  icon: <ReconciliationOutlined />,
              }, data, { status: "Reschedule Final Phase" })]
            : []),

        ...(status === "Pending"
            ? [
                  renderItem(ApplicantSetScheduleComponent, {
                      label: "Set Initial Phase Interview",
                      key: "6",
                      icon: <RiseOutlined />,
                  }, data, { status: "Initial Phase" }),

                  renderItem(ApplicantImmediateInitialComponent, {
                      label: "Proceed Initial Interview",
                      key: "7",
                      icon: <ArrowRightOutlined />,
                  }, data, { status: "Initial Phase" }),
              ]
            : []),

        ...(status === "Pending" || status === "Initial Phase"
            ? [renderItem(ApplicantProceedFinalComponent, {
                  label: "Proceed Final Phase",
                  key: "8",
                  icon: <ArrowRightOutlined />,
              }, data, { status: "Initial Phase" })]
            : []),

        ...(status === "Initial Phase"
            ? [renderItem(ApplicantInitialRatingScale, {
                  label: "Initial Rating Scale",
                  key: "9",
                  icon: <DotChartOutlined />,
              }, data)]
            : []),

        ...(status === "Final Phase" || status === "For Final Phase"
            ? [renderItem(ApplicantProceedInitalPhaseComponent, {
                  label: "Initial Phase Result",
                  key: "10",
                  icon: <InfoCircleOutlined />,
              }, data)]
            : []),

        ...(status === "For Final Phase"
            ? [
                  renderItem(ApplicantImmediateFinalComponent, {
                      label: "Proceed Interview Immediately",
                      key: "11",
                      icon: <ArrowRightOutlined />,
                  }, data, { status: "Final Phase" }),

                  renderItem(ApplicantSetScheduleComponent, {
                      label: "Set Schedule Final Phase",
                      key: "12",
                      icon: <CalendarOutlined />,
                  }, data, { status: "Final Phase" }),
              ]
            : []),

        ...(status === "Final Phase"
            ? [renderItem(ApplicantFinalRatingScaleComponent, {
                  label: "Final Rating Scale",
                  key: "13",
                  icon: <DotChartOutlined />,
              }, data)]
            : []),

        ...(status === "Passed" ||
        status === "Pooling" ||
        status === "Failed" ||
        status === "Dismissal" ||
        status === "Resignation" ||
        status === "EOPE" ||
        status === "AWOL" ||
        status === "Probationary" ||
        status === "Regular" ||
        status === "Counter Offer" ||
        status === "Accepted Offer" ||
        status === "Send Failed"
            ? [renderItem(ApplicantResultsComponent, {
                  label: "Application Results",
                  key: "14",
                  icon: <InfoCircleOutlined />,
              }, data)]
            : []),

        ...(status === "Send Failed"
            ? [renderItem(ApplicantRejectionComponent, {
                  label: "Sending Failed Email",
                  key: "15",
                  icon: <SendOutlined />,
              }, data)]
            : []),

        ...(status === "Passed"
            ? [renderItem(ApplicantPoolingComponent, {
                  label: "Proceed for Pooling",
                  key: "16",
                  icon: <TeamOutlined />,
              }, data)]
            : []),

        ...(status === "Passed" ||
        status === "Pooling" ||
        status === "Counter Offer" ||
        status === "Accepted Offer"
            ? [renderItem(ApplicantJobOfferComponent, {
                  label: "Make a Job Offer",
                  key: "17",
                  icon: <BriefcaseIcon className="h-4 mr-0.5" />,
              }, data)]
            : []),
    ];

    return (
        <Dropdown
            overlay={
                <Menu>
                    {items.map((item, i) => (
                        <Menu.Item key={i}>{item.component}</Menu.Item>
                    ))}
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
    );
}

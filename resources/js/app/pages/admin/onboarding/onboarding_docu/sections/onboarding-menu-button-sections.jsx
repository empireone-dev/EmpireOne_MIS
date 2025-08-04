import React from "react";
import { Button, Dropdown, Space, Menu } from "antd";
import {
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import EditOnboardingDocumentComponent from "../components/edit-onboarding-document-component";
import ViewOnboardingDocument from "../components/view-onboarding-document";
import RemoveDocumentComponent from "../components/remove-document-component";

export default function OnboardingMenuButtonSection({ data, interviewer }) {
    const items = [
        {
            component: (
                <EditOnboardingDocumentComponent
                    item={{
                        label: "Edit Document",
                        key: "1",
                        icon: <EditOutlined />,
                    }}
                    data={data}
                />
            ),
        },
        {
            component: (
                <RemoveDocumentComponent
                    item={{
                        label: "Delete Document",
                        key: "2",
                        icon: <DeleteOutlined />,
                    }}
                    data={data}
                />
            ),
        },
        {
            component: (
                <ViewOnboardingDocument
                    item={{
                        label: "View Document",
                        key: "2",
                        icon: <EyeOutlined />,
                    }}
                    data={data}
                />
            ),
        },
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

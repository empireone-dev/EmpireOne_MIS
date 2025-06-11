import React from "react";
import { Table, Tooltip } from "antd";
import { useSelector } from "react-redux";
import DepartmentDeleteSection from "./department-delete-section";
import DepartmentUpdateSection from "./department-update-section";

const DepartmentTableSection = () => {
    // Get departments and user data from Redux store
    const { departments } = useSelector((store) => store.departments);
    const { user } = useSelector((state) => state.app);

    // If there is no user or departments, return an empty table
    if (!user || !departments) {
        return <div>No data available</div>;
    }

    // Filter departments by user's site
    const filteredDepartments = user.role_id === 1
        ? departments // Show all departments for admin users
        : departments?.filter((dept) => dept.site === user.site);

    // Prepare the data for the table
    const data = filteredDepartments?.map((res) => ({
        dept: res?.dept,
        depthead: `${res?.user?.employee_fname ?? ''} ${res?.user?.employee_lname ?? ''}`,
        site: res?.site,
        action: res,
    }));

    // Define table columns
    const columns = [
        {
            title: "Departments",
            dataIndex: "dept",
            key: "dept",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Department Head",
            dataIndex: "depthead",
            key: "depthead",
        },
        {
            title: "Site",
            dataIndex: "site",
            key: "site",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_record) => {
                return (
                    <div className="flex flex-1 gap-1.5">
                        <div>
                            <Tooltip title="Update Department">
                                <div>
                                    <DepartmentUpdateSection data={_record} />
                                </div>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip title="Delete Department">
                                <div>
                                    <DepartmentDeleteSection data={_record} />
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                );
            },
        },
    ];

    // Return the table
    return <Table columns={columns} dataSource={data} />;
};

export default DepartmentTableSection;

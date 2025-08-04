import React from "react";
import { Table, Tooltip } from "antd";
import { useSelector } from "react-redux";
import AccountsUpdateSection from "./accounts-update-section";
import AccountsDeleteSection from "./accounts-delete-section";

const AccountsTableSection = () => {
    // Get accounts and user data from Redux store
    const { accounts } = useSelector((store) => store.accounts);
    const { user } = useSelector((state) => state.app);

    // If there is no user or accounts, return an empty table
    if (!user || !accounts || accounts.length === 0) {
        return <div>No data available</div>;
    }

    // Filter accounts by user's site
    const filteredAccounts = user.role_id === 1
        ? accounts // Show all accounts for admin users
        : accounts?.filter((acct) => acct.site === user.site);

    // Prepare the data for the table
    const data = filteredAccounts?.map((res) => ({
        account: res?.acc,
        accountManager: `${res?.user?.employee_fname ?? ''} ${res?.user?.employee_lname ?? ''}`,
        site: res?.site,
        action: res,
    }));

    // Define table columns
    const columns = [
        {
            title: "Account Name",
            dataIndex: "account",
            key: "account",
            render: (text) => <a>{text}</a>,
        },
        // {
        //     title: "Department Head",
        //     dataIndex: "depthead",
        //     key: "depthead",
        // },
        // {
        //     title: "Site",
        //     dataIndex: "site",
        //     key: "site",
        // },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_record) => {
                return (
                    <div className="flex flex-1 gap-2">
                        <div>
                            <Tooltip title="Update Account">
                                <div>
                                    <AccountsUpdateSection data={_record} />
                                </div>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip title="Delete Account">
                                <div>
                                    <AccountsDeleteSection data={_record} />
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

export default AccountsTableSection;

import { Menu, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
    get_erf_record_thunk,
    update_outsourcing_erf_thunk,
} from "../redux/erf-record-thunk";
import store from "@/app/store/store";

export default function ErfUpdateStatusComponent({ data, item }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [dataValue, setDataValue] = useState({});

    useEffect(() => {
        if (data) {
            setDataValue(data);
        }
    }, [data]);

    function openHandler() {
        setModalOpen(true);
    }

    async function edit_outsourcing_erf(e) {
        e.preventDefault();

        if (!dataValue.status) {
            message.error("Please select a valid status.");
            return;
        }

        if (dataValue.status === "Declined" && !dataValue.reason?.trim()) {
            message.error(
                "Please provide a reason for declining this request.",
            );
            return;
        }

        try {
            await store.dispatch(
                update_outsourcing_erf_thunk(dataValue, {
                    reason: dataValue.reason || null,
                    requestor_email: dataValue?.user?.employee?.eogs || dataValue?.user?.employee?.applicant?.email || null,
                }),
            );
            await store.dispatch(get_erf_record_thunk());
            message.success("Updated Successfully");
            setModalOpen(false);
        } catch (error) {
            message.error("Error updating status. Please try again.");
            console.error(error);
        }
    }

    return (
        <>
            <Menu.Item onClick={openHandler} icon={item.icon}>
                {item.label}
            </Menu.Item>

            <Modal
                title="Update Request Status"
                centered
                visible={modalOpen}
                onCancel={() => setModalOpen(false)}
                width={1200}
                footer={null}
            >
                <form className="w-full pb-4" onSubmit={edit_outsourcing_erf}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="flex flex-1 ">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Reference No.
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={data?.ref_id || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Job Title
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={data?.jobTitle || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Job Type
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={data?.jobType || ""}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                Request Status
                            </label>
                            <select
                                onChange={(e) =>
                                    setDataValue({
                                        ...dataValue,
                                        status: e.target.value,
                                    })
                                }
                                className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                defaultValue={data?.status || ""}
                            >
                                <option value="" disabled>
                                    Select status
                                </option>
                                <option value="Pending" disabled>
                                    Pending
                                </option>
                                <option value="In Review">In Review</option>
                                <option value="Approved">Approved</option>
                                <option value="Declined">Declined</option>
                            </select>
                        </div>
                        {dataValue.status === "Declined" && (
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Reason for Decline{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    onChange={(e) =>
                                        setDataValue({
                                            ...dataValue,
                                            reason: e.target.value,
                                        })
                                    }
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    rows="3"
                                    placeholder="Please provide a reason for declining this request..."
                                    value={dataValue.reason || ""}
                                />
                            </div>
                        )}
                        <div className="flex flex-1 gap-1.5 justify-end mt-1">
                            <button
                                className="flex justify-end px-2 py-1.5 rounded-md hover:bg-gray-300"
                                onClick={() => setModalOpen(false)}
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                className="flex justify-end bg-blue-600 px-2 py-1.5 rounded-md text-white hover:bg-blue-500"
                                type="submit"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}

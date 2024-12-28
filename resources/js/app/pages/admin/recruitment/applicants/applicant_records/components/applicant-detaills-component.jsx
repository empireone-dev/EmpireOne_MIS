import { Menu, Modal } from "antd";
import React from "react";
import { useState } from "react";

export default function ApplicantDetaillsComponent({ data, item }) {
    const [open, setOpen] = useState(false);

    function openHandler(params) {
        setOpen(true);
    }
    console.log('data', data)
    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title="Application Details"
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1200}
                footer={null}
            >
                <div className="flex text-2xl items-center justify-center">
                    <h1>
                        <b>Personal Information</b>
                    </h1>
                </div>
                <div className="flex justify-end">
                    <h1 className="text-lg mb-2">
                        <b>Status:</b> {data?.status}
                    </h1>
                </div>
                <form className="border rounded-lg p-3.5">
                    <h1 className="text-xl font-semibold mb-3 text-gray-900  text-center"></h1>
                    <div className="mb-4">
                        <label htmlFor="">
                            <b>Application No.</b>
                        </label>
                        <input
                            type="number"
                            value={data?.app_id}
                            placeholder="N/A"
                            className="border p-2 rounded w-full"
                            readOnly
                        />
                    </div>
                    <div className="flex flex-1 gap-4">
                        <div className="flex flex-col w-full mb-4">
                            <label htmlFor="">
                                <b>Full Name</b>
                            </label>
                            <div className="flex flex-1 gap-3">
                                <input
                                    type="text"
                                    value={data?.fname}
                                    placeholder="N/A"
                                    className="border p-2 rounded w-full"
                                    readOnly
                                />
                                <input
                                    type="text"
                                    value={data?.mname}
                                    placeholder="N/A"
                                    className="border p-2 rounded w-full"
                                    readOnly
                                />
                                <input
                                    type="text"
                                    value={data?.lname}
                                    placeholder="N/A"
                                    className="border p-2 rounded w-full"
                                    readOnly
                                />
                                <input
                                    type="text"
                                    value={data?.suffix}
                                    placeholder="(Suffix)"
                                    className="border p-2 rounded w-1/5"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 gap-4">
                        <div className="flex w-full">
                            <div className="flex flex-col gap-4 mb-4 w-full">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="">
                                        <b>Gender</b>
                                    </label>
                                    <input
                                        type="text"
                                        value={data?.gender}
                                        placeholder="N/A"
                                        className="border p-2 rounded w-full"
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="">
                                        <b>Date of Birth</b>
                                    </label>
                                    <input
                                        type="date"
                                        value={data?.dob}
                                        placeholder="N/A"
                                        className="border p-2 rounded w-full"
                                        readOnly
                                    />
                                </div>
                                <div className=" w-full">
                                    <label htmlFor="">
                                        <b>Email</b>
                                    </label>
                                    <input
                                        type="email"
                                        value={data?.email}
                                        placeholder="N/A"
                                        className="border p-2 rounded w-full "
                                        readOnly
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="">
                                        <b>Phone Number</b>
                                    </label>
                                    <input
                                        type="number"
                                        value={data?.phone}
                                        placeholder="N/A"
                                        className="border p-2 rounded w-full "
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full">
                            <div className="flex flex-col gap-4 mb-4 w-full">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="">
                                        <b>Marital Status</b>
                                    </label>
                                    <input
                                        type="text"
                                        value={data?.marital}
                                        placeholder="N/A"
                                        className="border p-2 rounded w-full "
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="">
                                        <b>Religion</b>
                                    </label>
                                    <input
                                        type="text"
                                        value={data?.religion}
                                        placeholder="N/A"
                                        className="border p-2 rounded w-full"
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="">
                                        <b>Nationality</b>
                                    </label>
                                    <input
                                        type="text"
                                        value={data?.nationality}
                                        placeholder="N/A"
                                        className="border p-2 rounded w-full"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="">
                            <b>Mother's Maiden Name</b>
                        </label>
                        <input
                            type="text"
                            value={data?.mmname}
                            placeholder="N/A"
                            className="border p-2 rounded w-full "
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="">
                            <b>Father's Full Name</b>
                        </label>
                        <input
                            type="text"
                            value={data?.ffname}
                            placeholder="N/A"
                            className="border p-2 rounded w-full "
                            readOnly
                        />
                    </div>
                    <div className="flex flex-1 gap-4 mb-4">
                        <div className="w-full">
                            <label htmlFor="">
                                <b>Highest Educational Attainment</b>
                            </label>
                            <input
                                type="text"
                                value={data?.educ}
                                placeholder="N/A"
                                className="border p-2 rounded w-full "
                                readOnly
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="">
                                <b>Course Taken (Only if Applicable)</b>
                            </label>
                            <input
                                type="text"
                                value={data?.courset}
                                placeholder="N/A"
                                className="border p-2 rounded w-full "
                                readOnly
                            />
                        </div>
                    </div>
                    <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">
                        Address Information
                    </h1>
                    <div className="mb-4">
                        <label htmlFor="">
                            <b>
                                House/Lot No. , Street , Purok/Sitio , Barangay
                                , City/Municipality , Province
                            </b>
                        </label>
                        <input
                            type="text"
                            value={data?.caddress}
                            placeholder="N/A"
                            className="border p-2 rounded w-full"
                            readOnly
                        />
                    </div>
                    <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">
                        Government ID Information
                    </h1>
                    <div className="flex flex-1 gap-4 mb-4">
                        <div className="w-full">
                            <label htmlFor="">
                                <b>SSS No.</b>
                            </label>
                            <input
                                type="text"
                                value={data?.sss}
                                placeholder="N/A"
                                className="border p-2 rounded w-full "
                                readOnly
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="">
                                <b>Pag-IBIG No.</b>
                            </label>
                            <input
                                type="text"
                                value={data?.pagibig}
                                placeholder="N/A"
                                className="border p-2 rounded w-full "
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex flex-1 gap-4 mb-4">
                        <div className="w-full">
                            <label htmlFor="">
                                <b>Tin No.</b>
                            </label>
                            <input
                                type="text"
                                value={data?.tin}
                                placeholder="N/A"
                                className="border p-2 rounded w-full "
                                readOnly
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="">
                                <b>Philhealth No.</b>
                            </label>
                            <input
                                type="text"
                                value={data?.philh}
                                placeholder="N/A"
                                className="border p-2 rounded w-full "
                                readOnly
                            />
                        </div>
                    </div>
                    <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">
                        Emergency Contact Information
                    </h1>
                    <div className="mb-4 w-full">
                        <label htmlFor="">
                            <b>Emergency Contact Fullname</b>
                        </label>
                        <input
                            type="text"
                            value={data?.ename}
                            placeholder="N/A"
                            className="border p-2 rounded w-full "
                            readOnly
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="">
                            <b>Address</b>
                        </label>
                        <input
                            type="text"
                            value={data?.eaddress}
                            placeholder="N/A"
                            className="border p-2 rounded w-full "
                            readOnly
                        />
                    </div>
                    <div className="flex flex-1 gap-4 mb-4">
                        <div className="w-full">
                            <label htmlFor="">
                                <b>Relationship</b>
                            </label>
                            <input
                                type="text"
                                value={data?.relationship}
                                placeholder="N/A"
                                className="border p-2 rounded w-full "
                                readOnly
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="">
                                <b>Contact No.</b>
                            </label>
                            <input
                                type="number"
                                value={data?.ephone}
                                placeholder="N/A"
                                className="border p-2 rounded w-full "
                                readOnly
                            />
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}

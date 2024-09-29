import { CheckCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import { useState } from "react";

export default function PhysicalCOntractSigning({setOpen}) {
    const [openPhysicalSigning, setPhysicalSigningOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [physical, setPhysical] = useState({
    //     ifftime: "",
    //     iffdate: "",
    // });
    // const { applicants, interviewer } = useSelector(
    //     (state) => state.applicants
    // );

    async function send_f2f_signing(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                sendiv_email_thunk({
                    ...data,
                    ifftime: initial.ifftime,
                    iffdate: initial.iffdate,
                    phase_status: status,
                })
            );
            store.dispatch(get_applicant_thunk());
            setLoading(false);
            setOpen(false);
            setOpenDialog(false);
            message.success("Email sent successfully");
        } catch (error) {
            message.error("There was an error sending the email!");
            setLoading(false);
        }
    }
    return (
        <div className="flex w-full items-center justify-center">
            <button
                onClick={() => {
                    setPhysicalSigningOpen(true);
                    setOpen(false);
                }}
                className="bg-blue-500 w-full rounded-md text-white hover:bg-blue-600 p-1.5"
            >
                Physical Contract Signing
            </button>
            <Modal
                title={`Contract Signing (Physical Contract Signing)`}
                centered
                visible={openPhysicalSigning}
                width={900}
                onOk={() => {
                    setPhysicalSigningOpen(false);
                }}
                onCancel={() => setPhysicalSigningOpen(false)}
                footer={null}
            >
                <li className="bg-gray-300 h-0.5 mb-3"></li>
                <form onSubmit={send_f2f_signing} className="w-full h-full">
                    <div className="flex flex-col -mx-3 mb-3">
                        <div className="w-full px-2.5">
                            <label
                                className="block uppercase tracking-wide  text-xs font-bold mb-1"
                                for="grid-text"
                            >
                                Application No.
                            </label>
                            <input
                                // value={data?.app_id}
                                className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-text"
                                type="number"
                                placeholder=""
                                readOnly
                            />
                        </div>

                        <div className="flex flex-1">
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Applicant's Name
                                </label>
                                <input
                                    // value={`${data.fname} ${data.mname} ${data.lname}`}
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="flex flex-1 ">
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Email Address
                                </label>
                                <input
                                    // value={data?.email}
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="email"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Job Position
                                </label>
                                <input
                                    // value={data?.phone}
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Salary
                                </label>
                                <input
                                    // value={data?.phone}
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className=" flex">
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Schedule date for Contract Signing
                                </label>
                                <input
                                    // onChange={(e) =>
                                    //     setInitial({
                                    //         ...initial,
                                    //         iffdate: e.target.value,
                                    //     })
                                    // }
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="date"
                                    placeholder=""
                                    required
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Schedule time for Contract Signing
                                    {/* {status} */}
                                </label>
                                <input
                                    // onChange={(e) =>
                                    //     setInitial({
                                    //         ...initial,
                                    //         ifftime: e.target.value,
                                    //     })
                                    // }
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="time"
                                    placeholder=""
                                    required
                                />
                            </div>
                        </div>
                        {/* <div className="w-full px-2.5">
                            <label
                                className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                for="grid-text"
                            >
                                {status} Interviewer
                            </label>
                            <select
                                className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name=""
                                id=""
                            >
                                {interviewer?.map((res, i) => {
                                    return (
                                        <option
                                            value={res?.employee_id}
                                            key={i}
                                        >
                                            {res?.employee_fname}{" "}
                                            {res?.employee_lname}
                                        </option>
                                    );
                                })}
                            </select>
                        </div> */}
                    </div>
                    <button
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${
                            loading ? "cursor-not-allowed opacity-75" : ""
                        }`}
                        onClick={send_f2f_signing}
                        disabled={loading}
                    >
                        {loading ? (
                            <LoadingOutlined spin />
                        ) : (
                            <CheckCircleFilled />
                        )}
                        {loading ? " SENDING..." : " CONFIRM"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}

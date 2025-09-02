import store from "@/app/store/store";
import { CheckCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import {
    get_applicant_thunk,
    sendiv_email_thunk,
} from "../redux/applicant-thunk";
import { useState } from "react";

export default function ApplicantVirtualScheduleComponent({
    open,
    setOpen,
    data,
    status,
    setOpenDialog,
    openDialog,
}) {
    const [loading, setLoading] = useState(false);
    const [initial, setInitial] = useState({
        // ifftime: "",
        // iffdate: "",
        ivtime: "",
        ivdate: "",
        meet_link: "",
        interviewer_id: "",
    });
    const { applicants, interviewer } = useSelector(
        (state) => state.applicants
    );

    async function send_vertual_schedule(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                sendiv_email_thunk({
                    ...data,
                    ivtime: initial.ivtime,
                    ivdate: initial.ivdate,
                    meet_link: initial.meet_link,
                    interviewer_id: initial.interviewer_id,
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
        <Modal
            title={`Schedule for ${status} Interview (Virtual Interview)`}
            centered
            visible={open}
            width={900}
            onOk={() => {
                setOpen(false);
            }}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <li className="bg-gray-300 h-0.5"></li>
            <div className="flex justify-end mt-1.5">
                <h1>
                    <b>Status:</b> ({status})
                </h1>
            </div>
            <form onSubmit={send_vertual_schedule} className="w-full h-full">
                <div className="flex flex-col -mx-3 mb-3">
                    <div className="w-full px-2.5">
                        <label
                            className="block uppercase tracking-wide  text-xs font-bold mb-1"
                            for="grid-text"
                        >
                            Application No.
                        </label>
                        <input
                            value={data.app_id}
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
                                value={`${data.fname} ${data.mname} ${data.lname}`}
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
                                Email Address
                            </label>
                            <input
                                value={data.email}
                                className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-text"
                                type="email"
                                placeholder=""
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="flex flex-1">
                        <div className="w-3/5 px-2.5">
                            <label
                                className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                for="grid-text"
                            >
                                Contact No.
                            </label>
                            <input
                                value={data.phone}
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
                                Meeting Link
                            </label>
                            <input
                                onChange={(e) =>
                                    setInitial({
                                        ...initial,
                                        meet_link: e.target.value,
                                    })
                                }
                                className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-text"
                                type="text"
                                placeholder=""
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-1 ">
                        <div className="w-full px-2.5">
                            <label
                                className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                for="grid-text"
                            >
                                Schedule date for {status}
                            </label>
                            <input
                                onChange={(e) =>
                                    setInitial({
                                        ...initial,
                                        ivdate: e.target.value,
                                    })
                                }
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
                                Schedule time for {status}
                            </label>
                            <input
                                onChange={(e) =>
                                    setInitial({
                                        ...initial,
                                        ivtime: e.target.value,
                                    })
                                }
                                className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-text"
                                type="time"
                                placeholder=""
                                required
                            />
                        </div>
                    </div>
                    {status === "Final Phase" && (
                        <div className="w-full px-2.5">
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
                                value={initial.interviewer_id}
                                onChange={(e) =>
                                    setInitial({
                                        ...initial,
                                        interviewer_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">Select Interviewer</option>
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
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${
                        loading ? "cursor-not-allowed opacity-75" : ""
                    }`}
                    disabled={loading}
                >
                    {loading ? <LoadingOutlined spin /> : <CheckCircleFilled />}
                    {loading ? " SENDING..." : " CONFIRM"}
                </button>
            </form>
        </Modal>
    );
}

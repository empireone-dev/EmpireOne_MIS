import { Menu, Modal, Button, message } from "antd";
import React from "react";
import { useState } from "react";
import store from "@/app/store/store";
import {
    direct_hire_applicant_thunk,
    get_applicant_thunk,
} from "../applicant_records/redux/applicant-thunk";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Input2 from "@/app/pages/_components/input2";

export default function ApplicantDirectHireComponent({ data, item, status }) {
    const [open, setOpen] = useState(false);
    const { job_positions } = useSelector((state) => state.job_positions);
    const { departments } = useSelector((state) => state.departments);
    const { accounts } = useSelector((state) => state.accounts);
    const { users } = useSelector((state) => state.app);
    const { user } = useSelector((state) => state.app);
    const { applicantForm } = useSelector((state) => state.applicants);
    const [loading, setLoading] = useState(false);

    function openHandler() {
        setOpen(true);
    }

    function closeHandler() {
        setOpen(false);
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
    } = useForm({
        defaultValues: {
            work_experience: [
                { company: "", position: "", started_at: "", end_at: "" },
            ],
        },
    });

    async function handleDirectHire(formData) {
        setLoading(true);
        try {
            await store.dispatch(
                direct_hire_applicant_thunk({
                    ...formData,
                    id: data.id,
                    app_id: data.app_id,
                })
            );
            await store.dispatch(get_applicant_thunk());
            message.success("Applicant has been direct hired successfully");
            reset();
            closeHandler();
        } catch (error) {
            console.error("Error Direct Hiring Applicant:", error);
            message.error("Failed to direct hire applicant.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Menu.Item onClick={openHandler} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title="Direct Hire Applicant"
                centered
                open={open}
                onCancel={closeHandler}
                footer={[
                    <Button key="cancel" onClick={closeHandler}>
                        Cancel
                    </Button>,
                    <Button
                        key="directHire"
                        type="primary"
                        loading={loading}
                        onClick={handleSubmit(handleDirectHire)}
                    >
                        Direct Hire
                    </Button>,
                ]}
            >
                <div className="flex flex-col gap-4 mb-7">
                    <h1 className="text-lg font-semibold">
                        Are you sure you want to direct hire this applicant?
                    </h1>
                    {data && (
                        <div className="text-sm text-gray-600">
                            <p>
                                <strong>Name:</strong>{" "}
                                {data.fname || data.lname
                                    ? `${data.fname ?? ""} ${data.lname ?? ""}`.trim()
                                    : "N/A"}
                            </p>
                            <p>
                                <strong>Status:</strong> {data.status || "N/A"}
                            </p>
                        </div>
                    )}
                    <div>
                        <div className="flex flex-1 gap-4">
                            <div className="flex flex-col w-full mb-4">
                                <div className="flex flex-1 gap-3">
                                    <select
                                        {...register("position", {
                                            required: false,
                                        })}
                                        name="position"
                                        className="border p-2 rounded  w-full"
                                    >
                                        <option disabled selected value="">
                                            Job Position
                                        </option>
                                        {job_positions
                                            .filter(
                                                (res) =>
                                                    res.site === "San Carlos",
                                            )
                                            .filter(
                                                (res, index, self) =>
                                                    index ===
                                                    self.findIndex(
                                                        (item) =>
                                                            item.jPosition ===
                                                            res.jPosition,
                                                    ),
                                            )
                                            .map((res, i) => (
                                                <option
                                                    value={res.jPosition}
                                                    key={i}
                                                >
                                                    {res.jPosition}
                                                </option>
                                            ))}
                                    </select>
                                    <select
                                        {...register("dept", {
                                            required: false,
                                        })}
                                        name="dept"
                                        className="border p-2 rounded  w-full"
                                    >
                                        <option disabled selected value="">
                                            Department
                                        </option>
                                        {departments
                                            .filter(
                                                (res) =>
                                                    res.site === "San Carlos",
                                            )
                                            .map((res, i) => (
                                                <option
                                                    value={res.dept}
                                                    key={i}
                                                >
                                                    {res.dept}
                                                </option>
                                            ))}
                                    </select>
                                    <select
                                        {...register("account", {
                                            required: false,
                                        })}
                                        name="account"
                                        className="border p-2 rounded  w-full"
                                    >
                                        <option disabled selected value="">
                                            Account (If Applicable)
                                        </option>
                                        {accounts
                                            // .filter(res => res.site === "San Carlos")
                                            .map((res, i) => (
                                                <option value={res.acc} key={i}>
                                                    {res.acc}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-1 gap-4">
                            <div className="flex flex-col w-full mb-4">
                                <div className="flex flex-1 gap-3">
                                    <select
                                        {...register("sup_id", {
                                            required: false,
                                        })}
                                        name="sup_id"
                                        value={applicantForm.sup_id}
                                        className="border p-2 rounded  w-full"
                                    >
                                        <option disabled selected value="">
                                            Supervisor
                                        </option>
                                        {users
                                            .filter(
                                                (res) =>
                                                    (!user?.site ||
                                                        res.site ===
                                                            user.site ||
                                                        !res.site) &&
                                                    [
                                                        "Manager",
                                                        "Account Manager",
                                                        "Supervisor",
                                                        "Team Leader",
                                                        "Director",
                                                        "CEO",
                                                        "HR Lead",
                                                        "Accounting Head",
                                                        "TQA Manager",
                                                        "TQA Director",
                                                        "IT Manager",
                                                        "I.T Manager",
                                                        "IT Lead",
                                                        "I.T Lead",
                                                        "Compliance Officer",
                                                        "Site Admin",
                                                        "Talent Acquisition Manager",
                                                        "HR Director",
                                                        "Director of Operations",
                                                        "Operations Manager",
                                                        "Site Director",
                                                        "Site Manager",
                                                        "Director, Learning Leadership & Development",
                                                        "Director, Accounting & Finance",
                                                        "Director, Marketing & Communications",
                                                        "Director, Quality & Training",
                                                        "Facilities Manager",
                                                        "WFM and Data Analytics Manager",
                                                    ].includes(res.position) &&
                                                    ![
                                                        "Resigned",
                                                        "AWOL",
                                                        "End of Contract",
                                                        "Terminated",
                                                        "Trainee Fallout",
                                                    ].includes(
                                                        res?.employee?.status,
                                                    ),
                                            )
                                            .sort((a, b) => {
                                                const nameA =
                                                    `${a.employee_fname} ${a.employee_lname}`.toLowerCase();
                                                const nameB =
                                                    `${b.employee_fname} ${b.employee_lname}`.toLowerCase();
                                                return nameA.localeCompare(
                                                    nameB,
                                                );
                                            })
                                            .map((res) => (
                                                <option
                                                    key={res.id}
                                                    value={res.id}
                                                >
                                                    {res.employee_fname}{" "}
                                                    {res.employee_lname}
                                                </option>
                                            ))}
                                    </select>
                                    <Input2
                                        register={{
                                            ...register("hired", {
                                                required: false,
                                            }),
                                        }}
                                        value={applicantForm.hired ?? ""}
                                        name="hired"
                                        label="Hired Date"
                                        type="date"
                                    />
                                    <select
                                        {...register("status", {
                                            required: false,
                                        })}
                                        name="status"
                                        className="border p-2 rounded  w-full"
                                        required
                                    >
                                        <option disabled selected>
                                            Employee Status
                                        </option>
                                        <option> Probationary</option>
                                        <option> Regular</option>
                                        <option> Contractual</option>
                                        <option> Trainee Fallout</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

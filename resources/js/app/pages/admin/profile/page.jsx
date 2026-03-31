import React, { useEffect, useRef, useState } from "react";
import { CheckCircleFilled, UserOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useSelector } from "react-redux";
import SignatureCanvas from "react-signature-canvas";
import store from "@/app/store/store";
import { get_user_thunk, update_user_thunk } from "../../redux/app-thunk";
import AdminLayout from "../admin-layout";

export default function Page() {
    const { user } = useSelector((state) => state.app);
    const [form, setForm] = useState({
        employee_id: user?.employee_id,
        id: user?.id,
        employee_fname: "",
        employee_mname: "",
        employee_lname: "",
        employee_suffix: "",
        gender: "",
    });
    const [loading, setLoading] = useState(false);
    const [canvasEmpty, setCanvasEmpty] = useState(true);
    const [uploadedSignature, setUploadedSignature] = useState(null);
    const sigCanvasRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        store.dispatch(get_user_thunk());
    }, []);

    useEffect(() => {
        if (user) {
            setForm({
                id: user?.id,
                employee_id: user?.employee_id,
                employee_fname: user?.employee_fname || "",
                employee_mname: user?.employee_mname || "",
                employee_lname: user?.employee_lname || "",
                employee_suffix: user?.employee_suffix || "",
                gender: user?.gender || "",
                app_id: user?.employee?.applicant?.app_id || "",
            });
        }
    }, [user]);

    const clearSignature = () => {
        sigCanvasRef.current?.clear();
        setCanvasEmpty(true);
        setUploadedSignature(null);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setUploadedSignature(ev.target.result);
            setCanvasEmpty(true);
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    console.log("usssser", user);

    async function update_user(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const signatureData = uploadedSignature
                ? uploadedSignature
                : sigCanvasRef.current && !sigCanvasRef.current.isEmpty()
                ? sigCanvasRef.current.toDataURL("image/png")
                : null;
            await store.dispatch(
                update_user_thunk({ ...form, signature: signatureData, app_id: user?.employee?.applicant?.app_id || "" }),
            );
            await store.dispatch(get_user_thunk());
            setCanvasEmpty(true);
            setUploadedSignature(null);
            if (sigCanvasRef.current) sigCanvasRef.current.clear();
            message.success("Updated Successfully!");
        } catch (error) {
            message.error("Failed to update. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AdminLayout>
            <div className="p-6 w-full">
                <h1 className="text-2xl font-bold mb-6">Update My Profile</h1>
                <hr className="bg-gray-300 h-0.5 mb-6" />
                <form onSubmit={update_user} className="w-full h-full">
                    <h1 className="text-xl">
                        <b>My Personal Information</b>
                    </h1>
                    <div className="flex flex-col -mx-3 mb-3 mt-3">
                        <div className="w-full px-2.5">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-1">
                                Employee's ID
                            </label>
                            <input
                                className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="number"
                                value={user?.employee_id ?? ""}
                                readOnly
                            />
                        </div>

                        <div className="flex flex-1">
                            <div className="w-full px-2.5">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Employee's Firstname
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={form?.employee_fname ?? ""}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            employee_fname: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Employee's Middlename
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={form?.employee_mname ?? ""}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            employee_mname: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Employee's Lastname
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={form?.employee_lname ?? ""}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            employee_lname: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Employee's Suffix
                                </label>
                                <select
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={form?.employee_suffix ?? ""}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            employee_suffix: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">---</option>
                                    <option value="Jr.">Jr.</option>
                                    <option value="Sr.">Sr.</option>
                                    <option value="II">II</option>
                                    <option value="III">III</option>
                                    <option value="IV">IV</option>
                                    <option value="V">V</option>
                                    <option value="VI">VI</option>
                                    <option value="VII">VII</option>
                                    <option value="VIII">VIII</option>
                                    <option value="IX">IX</option>
                                    <option value="X">X</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-1">
                            <div className="w-full px-2.5">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Employee's Gender
                                </label>
                                <select
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={form?.gender ?? ""}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            gender: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">---</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="w-full px-2.5">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Department
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={user?.department ?? ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Position
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={user?.position ?? ""}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="w-full px-2.5 mt-2">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-1">
                                Signature
                            </label>
                            {uploadedSignature ? (
                                <div className="border border-gray-400 rounded overflow-hidden mb-2" style={{ width: "100%", height: 300 }}>
                                    <img
                                        src={uploadedSignature}
                                        alt="Uploaded Signature"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ) : user?.e_signature?.signature && canvasEmpty ? (
                                <div className="border border-gray-400 rounded overflow-hidden mb-2" style={{ width: "100%", height: 300 }}>
                                    <img
                                        src={user.e_signature.signature}
                                        alt="Current Signature"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ) : (
                                <div
                                    className="relative border border-gray-400 rounded overflow-hidden"
                                    style={{ width: "100%", height: 300 }}
                                >
                                    {canvasEmpty && !user?.e_signature?.signature && (
                                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-gray-400 text-sm select-none">
                                            Upload a Signature
                                        </div>
                                    )}
                                    <SignatureCanvas
                                        ref={sigCanvasRef}
                                        penColor="black"
                                        onBegin={() => setCanvasEmpty(false)}
                                        canvasProps={{
                                            width: 1500,
                                            height: 300,
                                            style: {
                                                width: "100%",
                                                height: "100%",
                                            },
                                            className: "rounded",
                                        }}
                                    />
                                </div>
                            )}
                            <div className="flex items-center gap-3 mt-1">
                                <button
                                    type="button"
                                    onClick={clearSignature}
                                    className="text-sm text-red-500 hover:text-red-700 underline"
                                >
                                    Clear Signature
                                </button>
                                {user?.e_signature?.signature && canvasEmpty && !uploadedSignature && (
                                    <button
                                        type="button"
                                        onClick={() => setCanvasEmpty(false)}
                                        className="text-sm text-blue-500 hover:text-blue-700 underline"
                                    >
                                        Draw Signature
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-sm text-green-600 hover:text-green-800 underline"
                                >
                                    Upload Image
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full disabled:opacity-50"
                    >
                        <CheckCircleFilled /> {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}

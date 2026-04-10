import React, { useState } from "react";
import videoBackground from "./../../../../../public/images/design.mp4";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import axios from "axios";

export default function Page({ status, canResetPassword }) {
    const { url } = usePage();
    const searchStatus = url.split("=")[1];
    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id: "",
        password: "",
        remember: false,
    });

    // ── Forgot-password OTP state ──
    const [forgotStep, setForgotStep] = useState(0); // 0=closed 1=send-otp 2=reset-password 3=done
    const [forgotEmpId, setForgotEmpId] = useState("");
    const [forgotOtp, setForgotOtp] = useState("");
    const [forgotNewPass, setForgotNewPass] = useState("");
    const [forgotConfirm, setForgotConfirm] = useState("");
    const [forgotEmailHint, setForgotEmailHint] = useState("");
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotError, setForgotError] = useState("");

    function openForgot(e) {
        e.preventDefault();
        setForgotStep(1);
        setForgotEmpId("");
        setForgotOtp("");
        setForgotNewPass("");
        setForgotConfirm("");
        setForgotEmailHint("");
        setForgotError("");
    }

    function closeForgot() {
        setForgotStep(0);
        setForgotError("");
    }

    async function handleSendOtp(e) {
        e.preventDefault();
        setForgotLoading(true);
        setForgotError("");
        try {
            const res = await axios.post("/otp/send", {
                employee_id: forgotEmpId,
            });
            setForgotEmailHint(res.data.email_hint);
            setForgotStep(2);
        } catch (err) {
            setForgotError(
                err.response?.data?.message ||
                    "Something went wrong. Please try again.",
            );
        } finally {
            setForgotLoading(false);
        }
    }

    async function handleResetPassword(e) {
        e.preventDefault();
        if (forgotNewPass !== forgotConfirm) {
            setForgotError("Passwords do not match.");
            return;
        }
        setForgotLoading(true);
        setForgotError("");
        try {
            await axios.post("/otp/reset", {
                employee_id: forgotEmpId,
                otp: forgotOtp,
                password: forgotNewPass,
                password_confirmation: forgotConfirm,
            });
            setForgotStep(3);
        } catch (err) {
            setForgotError(
                err.response?.data?.message ||
                    "Something went wrong. Please try again.",
            );
        } finally {
            setForgotLoading(false);
        }
    }

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);
    function submitLogin(e) {
        e.preventDefault();
        post(route("login"));
    }

    function formHandler(value, employee_id) {
        setData(employee_id, value);
    }

    return (
        <div className="relative w-screen h-screen">
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src={videoBackground} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative z-10">
                    <form onSubmit={submitLogin}>
                        <section>
                            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
                                    <a
                                        href="#"
                                        className="flex items-center justify-center p-3"
                                    >
                                        <img
                                            className="w-full"
                                            src="images/newlogo.png"
                                            alt="logo"
                                        />
                                    </a>
                                    <div className="px-8 pt-6 pb-8 md:px-10">
                                        <h1 className="text-2xl font-bold leading-tight tracking-tight mb-6 text-center md:text-3xl">
                                            Sign in to your account
                                        </h1>
                                        <form className="space-y-4" action="#">
                                            <div class="flex flex-col gap-6 w-full">
                                                <div className="w-full">
                                                    <div className="relative">
                                                        <input
                                                            required
                                                            value={
                                                                data?.employee_id ??
                                                                ""
                                                            }
                                                            onChange={(e) =>
                                                                setData({
                                                                    ...data,
                                                                    [e.target
                                                                        .name]:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                            type={"text"}
                                                            id="employee_id"
                                                            name="employee_id"
                                                            className="peer text-black rounded-md placeholder-transparent w-full py-2.5 px-5 border-gray-500 border bg-transparent  bg-white focus-within:outline-none focus-within:border-blue-500"
                                                            placeholder=""
                                                        />
                                                        <label
                                                            htmlFor="employee_id"
                                                            className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white"
                                                        >
                                                            Employee ID
                                                        </label>
                                                    </div>
                                                    {errors.employee_id ==
                                                        "These credentials do not match our records." &&
                                                        (data?.employee_id ??
                                                            "") !== "" && (
                                                            <p className="text-red-500 text-sm mt-1.5 font-light">
                                                                {
                                                                    errors.employee_id
                                                                }
                                                            </p>
                                                        )}
                                                </div>
                                                <div className="w-full">
                                                    <div className="relative">
                                                        <input
                                                            required={true}
                                                            value={
                                                                data?.password ??
                                                                ""
                                                            }
                                                            onChange={(e) =>
                                                                setData({
                                                                    ...data,
                                                                    [e.target
                                                                        .name]:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            }
                                                            type={"password"}
                                                            id="password"
                                                            name="password"
                                                            className="peer text-black placeholder-transparent w-full py-2.5 px-5 border-gray-500 border bg-transparent rounded-md bg-white focus-within:outline-none focus-within:border-blue-500"
                                                            placeholder="Hello"
                                                        />
                                                        <label
                                                            htmlFor="password"
                                                            className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white"
                                                        >
                                                            Password
                                                        </label>
                                                    </div>
                                                    {errors.password ==
                                                        "These credentials do not match our records." &&
                                                        (data?.password ??
                                                            "") !== "" && (
                                                            <p className="text-red-500 text-sm mt-1.5 font-light">
                                                                {
                                                                    errors.password
                                                                }
                                                            </p>
                                                        )}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-start">
                                                    <input
                                                        id="remember"
                                                        aria-describedby="remember"
                                                        type="checkbox"
                                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                                    />
                                                    <label
                                                        htmlFor="remember"
                                                        className="ml-2 text-sm"
                                                    >
                                                        Remember me
                                                    </label>
                                                </div>
                                                <a
                                                    href="#"
                                                    onClick={openForgot}
                                                    className="text-sm font-medium text-blue-600 hover:underline"
                                                >
                                                    Forgot password?
                                                </a>
                                            </div>
                                            <button
                                                onClick={submitLogin}
                                                type="submit"
                                                className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2"
                                            >
                                                Sign in
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="text-center mt-3 text-[11px] font-bold tracking-[0.1em]">
                                    Built with{" "}
                                    <span className="text-[#1E90FF] font-bold">
                                        EmpireOne Dev Team
                                    </span>{" "}
                                    &copy;2024-{new Date().getFullYear()}
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>

            {/* ── Forgot Password OTP Modal ── */}
            {forgotStep > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="relative w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-8">
                        {/* Close button */}
                        <button
                            onClick={closeForgot}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        {/* ── Step 1 : Enter Employee ID ── */}
                        {forgotStep === 1 && (
                            <>
                                <h2 className="text-xl font-bold text-gray-800 mb-1">
                                    Forgot Password
                                </h2>
                                <p className="text-sm text-gray-500 mb-6">
                                    Enter your Employee ID and we'll send an OTP
                                    to your registered email.
                                </p>
                                <form
                                    onSubmit={handleSendOtp}
                                    className="space-y-4"
                                >
                                    <div className="relative">
                                        <input
                                            required
                                            type="text"
                                            id="forgot_emp_id"
                                            value={forgotEmpId}
                                            onChange={(e) =>
                                                setForgotEmpId(e.target.value)
                                            }
                                            placeholder=""
                                            className="peer text-black rounded-md placeholder-transparent w-full py-2.5 px-5 border-gray-400 border bg-white focus:outline-none focus:border-blue-500"
                                        />
                                        <label
                                            htmlFor="forgot_emp_id"
                                            className="absolute left-2.5 px-2.5 transition-all bg-white text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white"
                                        >
                                            Employee ID
                                        </label>
                                    </div>
                                    {forgotError && (
                                        <p className="text-red-500 text-sm">
                                            {forgotError}
                                        </p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={forgotLoading}
                                        className="w-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5"
                                    >
                                        {forgotLoading
                                            ? "Sending OTP..."
                                            : "Send OTP"}
                                    </button>
                                </form>
                            </>
                        )}

                        {/* ── Step 2 : Enter OTP + New Password ── */}
                        {forgotStep === 2 && (
                            <>
                                <h2 className="text-xl font-bold text-gray-800 mb-1">
                                    Reset Password
                                </h2>
                                <p className="text-sm text-gray-500 mb-1">
                                    A 6-digit OTP was sent to:
                                </p>
                                <p className="text-sm font-semibold text-blue-600 mb-5">
                                    {forgotEmailHint}
                                </p>
                                <form
                                    onSubmit={handleResetPassword}
                                    className="space-y-4"
                                >
                                    {/* OTP */}
                                    <div className="relative">
                                        <input
                                            required
                                            type="text"
                                            id="forgot_otp"
                                            maxLength={6}
                                            inputMode="numeric"
                                            value={forgotOtp}
                                            onChange={(e) =>
                                                setForgotOtp(
                                                    e.target.value
                                                        .replace(/\D/g, "")
                                                        .slice(0, 6),
                                                )
                                            }
                                            placeholder=""
                                            className="peer text-black rounded-md placeholder-transparent w-full py-2.5 px-5 border-gray-400 border bg-white focus:outline-none focus:border-blue-500 tracking-widest text-center text-lg font-bold"
                                        />
                                        <label
                                            htmlFor="forgot_otp"
                                            className="absolute left-2.5 px-2.5 transition-all bg-white text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white"
                                        >
                                            Enter OTP
                                        </label>
                                    </div>
                                    {/* New Password */}
                                    <div className="relative">
                                        <input
                                            required
                                            type="password"
                                            id="forgot_new_pass"
                                            value={forgotNewPass}
                                            onChange={(e) =>
                                                setForgotNewPass(e.target.value)
                                            }
                                            placeholder=""
                                            className="peer text-black rounded-md placeholder-transparent w-full py-2.5 px-5 border-gray-400 border bg-white focus:outline-none focus:border-blue-500"
                                        />
                                        <label
                                            htmlFor="forgot_new_pass"
                                            className="absolute left-2.5 px-2.5 transition-all bg-white text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white"
                                        >
                                            New Password
                                        </label>
                                    </div>
                                    {/* Confirm Password */}
                                    <div className="relative">
                                        <input
                                            required
                                            type="password"
                                            id="forgot_confirm"
                                            value={forgotConfirm}
                                            onChange={(e) =>
                                                setForgotConfirm(e.target.value)
                                            }
                                            placeholder=""
                                            className="peer text-black rounded-md placeholder-transparent w-full py-2.5 px-5 border-gray-400 border bg-white focus:outline-none focus:border-blue-500"
                                        />
                                        <label
                                            htmlFor="forgot_confirm"
                                            className="absolute left-2.5 px-2.5 transition-all bg-white text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white"
                                        >
                                            Confirm New Password
                                        </label>
                                    </div>
                                    {forgotError && (
                                        <p className="text-red-500 text-sm">
                                            {forgotError}
                                        </p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={
                                            forgotLoading ||
                                            forgotOtp.length !== 6
                                        }
                                        className="w-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5"
                                    >
                                        {forgotLoading
                                            ? "Resetting..."
                                            : "Reset Password"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setForgotStep(1);
                                            setForgotError("");
                                        }}
                                        className="w-full text-blue-600 text-sm hover:underline"
                                    >
                                        ← Resend OTP
                                    </button>
                                </form>
                            </>
                        )}

                        {/* ── Step 3 : Success ── */}
                        {forgotStep === 3 && (
                            <div className="text-center">
                                <div className="text-5xl mb-4">✅</div>
                                <h2 className="text-xl font-bold text-gray-800 mb-2">
                                    Password Reset!
                                </h2>
                                <p className="text-sm text-gray-500 mb-6">
                                    Your password has been reset successfully.
                                    You can now sign in with your new password.
                                </p>
                                <button
                                    onClick={closeForgot}
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5"
                                >
                                    Back to Sign In
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

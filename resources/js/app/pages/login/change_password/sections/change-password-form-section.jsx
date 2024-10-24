import React from 'react';
// import videoBackground from '../../../../../../../../HRIS/public/images/design.mp4';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { KeyIcon, LockClosedIcon } from '@heroicons/react/20/solid';

export default function ChangePasswordFormSection({ status, canResetPassword }) {
    const { url } = usePage();
    const searchStatus = url.split("=")[1];
    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id: "",
        password: "",
        remember: false,
    });

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
            {/* <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
                <source src={videoBackground} type="video/mp4" />
                Your browser does not support the video tag.
            </video> */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative z-10">
                    <form
                        onSubmit={submitLogin}
                    >
                        <section>
                            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
                                    <a href="#" className="flex items-center justify-center p-3">
                                        <img className="w-full" src="/images/newlogo.png" alt="logo" />
                                    </a>
                                    <div className="px-8 pt-2 pb-8 md:px-10">
                                        <h1 className="text-2xl font-bold leading-tight tracking-tight text-center md:text-3xl flex items-center justify-center">
                                            <LockClosedIcon className="h-8 mr-1.5" />
                                            Change Password
                                        </h1>
                                        <form className="space-y-4" action="#">
                                            <div class="flex flex-col gap-6 w-full">
                                                <div className="w-full">
                                                    {errors.employee_id ==
                                                        "These credentials do not match our records." &&
                                                        (data?.employee_id ?? "") !== "" && (
                                                            <p className="text-red-500 text-sm mt-1.5 font-light">
                                                                {errors.employee_id}
                                                            </p>
                                                        )}

                                                </div>
                                                <div className="w-full">
                                                    <div className="relative">
                                                        <input
                                                            required={true}
                                                            value={data?.password ?? ""}
                                                            onChange={(e) =>
                                                                setData({
                                                                    ...data,
                                                                    [e.target.name]: e.target.value
                                                                })
                                                            }
                                                            type={'password'}
                                                            id="password"
                                                            name='password'
                                                            className="peer text-black placeholder-transparent w-full py-2.5 px-5 border-gray-500 border bg-transparent rounded-md bg-white focus-within:outline-none focus-within:border-blue-500"
                                                            placeholder="Hello"
                                                        />
                                                        <label
                                                            htmlFor='New Password'
                                                            className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white"
                                                        >
                                                            New Password
                                                        </label>
                                                    </div>
                                                    {errors.password ==
                                                        "These credentials do not match our records." &&
                                                        (data?.password ?? "") !== "" && (
                                                            <p className="text-red-500 text-sm mt-1.5 font-light">
                                                                {errors.password}
                                                            </p>
                                                        )}
                                                </div>
                                                <div className="w-full">
                                                    <div className="relative">
                                                        <input
                                                            required={true}
                                                            value={data?.password ?? ""}
                                                            onChange={(e) =>
                                                                setData({
                                                                    ...data,
                                                                    [e.target.name]: e.target.value
                                                                })
                                                            }
                                                            type={'password'}
                                                            id="password"
                                                            name='password'
                                                            className="peer text-black placeholder-transparent w-full py-2.5 px-5 mb-1 border-gray-500 border bg-transparent rounded-md bg-white focus-within:outline-none focus-within:border-blue-500"
                                                            placeholder="Hello"
                                                        />
                                                        <label
                                                            htmlFor='Confirm Password'
                                                            className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white"
                                                        >
                                                            Confirm Password
                                                        </label>
                                                    </div>
                                                    {errors.password ==
                                                        "These credentials do not match our records." &&
                                                        (data?.password ?? "") !== "" && (
                                                            <p className="text-red-500 text-sm mt-1.5 font-light">
                                                                {errors.password}
                                                            </p>
                                                        )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={submitLogin}
                                                type="submit"
                                                className="w-full mt-6 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2 flex items-center justify-center"
                                            >
                                                <KeyIcon className='h-5 mr-1'/>
                                                Change Password
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </div>
    );
}

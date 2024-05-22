import Password from 'antd/es/input/Password';
import React, { useState } from 'react';

export default function LoginFormSection() {
    const [form, setForm] = useState({
        username:null,
        Password:null
    })
    return (
        <div>
            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
                        <a href="#" className="flex items-center justify-center p-3">
                            <img className="w-full" src="images/newlogo.png" alt="logo" />
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
                                                required={true}
                                                value={form.username}
                                                onChange={(e) => setForm({
                                                    ...form,
                                                    username: e.target.value
                                                })}
                                                type={'text'}
                                                id="username"
                                                name='username'
                                                className="peer text-black rounded-md placeholder-transparent w-full py-2.5 px-5 border-gray-500 border bg-transparent  bg-white focus-within:outline-none focus-within:border-blue-500"
                                                placeholder="Hello"
                                            />
                                            <label
                                                htmlFor='username'
                                                className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white"
                                            >
                                                Username
                                            </label>
                                        </div>
                                        {
                                            form.username == '' && <p className="text-red-500 text-sm mt-1.5 font-light">
                                                Username is required
                                            </p>
                                        }



                                    </div>
                                    <div className="w-full">
                                        <div className="relative">
                                            <input
                                                required={true}
                                                value={form.Password}
                                                onChange={(e) => setForm({
                                                    ...form,
                                                    username: e.target.value
                                                })}
                                                type={'text'}
                                                id="password"
                                                name='password'
                                                className="peer text-black placeholder-transparent w-full py-2.5 px-5 border-gray-500 border bg-transparent rounded-md bg-white focus-within:outline-none focus-within:border-blue-500"
                                                placeholder="Hello"
                                            />
                                            <label
                                                htmlFor='password'
                                                className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white"
                                            >
                                                Password
                                            </label>
                                        </div>

                                        <p className="text-red-500 text-sm mt-1.5 font-light">
                                            Password is required
                                        </p>


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
                                        <label htmlFor="remember" className="ml-2 text-sm">Remember me</label>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2"
                                >
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

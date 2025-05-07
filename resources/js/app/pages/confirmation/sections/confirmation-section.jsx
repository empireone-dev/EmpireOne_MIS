import { CheckOutlined, CloseOutlined, LoadingOutlined, SendOutlined } from '@ant-design/icons'
import React from 'react'
import { useState } from 'react';
import DeclinedSection from './declined-section';

export default function ConfirmationSection() {
    const [loading, setLoading] = useState(null);

    const submitConfirmation = async (e) => {
        e.preventDefault()
        setLoading(true);
        // try {
        //   await store.dispatch(
        //     create_internet_plan_thunk({
        //       ...form,
        //     })
        //   );
        //   store.dispatch(get_internet_plan_thunk())
        //   // message.success("Successfully Added!"); 
        //   setIsModalOpen(false);
        // } catch (error) {
        //   message.error("Failed to add department. Please try again."); // Show error message
        // } finally {
        //   setLoading(false); // Always reset loading state
        // }
    };
    return (
        <div className="h-screen overflow-hidden ">
            <div className="bg-gray-200 transition-colors duration-300 h-full overflow-y-scroll">
                <div className="container mx-auto px-20 flex justify-center">
                    <div className="bg-white shadow-2xl  shadow-black rounded-lg p-6 mt-12 w-full">
                        <div className="flex items-center justify-center p-3">
                            <img className="w-60" src="/images/newlogo.png" alt="logo" />
                        </div>
                        <div className='mb-3 mt-7'>
                            <h1 className='text-2xl text-center'><b>Will you be able to attend the scheduled interview?</b></h1>
                        </div>
                        <div className='flex gap-2 items-center justify-center'>
                            <button
                                type="submit"
                                onClick={submitConfirmation}
                                disabled={loading}
                                className='bg-blue-500 hover:bg-blue-600 text-white p-2 w-36 rounded-md'>
                                {loading ? (
                                    <LoadingOutlined spin />
                                ) : (
                                    <CheckOutlined />
                                )}
                                {loading ? " SUBMITTING..." : " Yes"}
                            </button>
                            <DeclinedSection />
                        </div>
                        {/* <div className="flex justify-end mt-2.5">

                            <button
                                type="submit"
                                className={` bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${loading ? "cursor-not-allowed opacity-75" : ""
                                    }`}
                                onClick={submitConfirmation}
                                disabled={loading}
                            >
                                {loading ? (
                                    <LoadingOutlined spin />
                                ) : (
                                    <SendOutlined />
                                )}
                                {loading ? " SUBMITTING..." : " SUBMIT RESPONSE"}
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div >
    )
}

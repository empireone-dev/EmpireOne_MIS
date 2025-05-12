import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { useState } from 'react';
import Modal from '../../_components/modal';
import Input from '../../_components/input';

export default function DeclinedSection() {
    const [loading, setLoading] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);

    const submitDecline = async (e) => {
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

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                type='button'
                onClick={openModal}
                className='bg-red-500 hover:bg-red-600 text-white p-2 w-36 rounded-md'>
                <XMarkIcon className="h-5 w-5 inline-block text-white" />
                No
            </button>
            <div className=''>
                <Modal open={isModalOpen} setOpen={setIsModalOpen} width="w-20 mx-96">
                    <h2 className="text-xl font-semibold mb-4">
                        Kindly provide your reason for declining the interview invitation.
                    </h2>
                    <form action="" onSubmit={submitDecline}>
                        <div>
                            <textarea
                                // onChange={(event) => data_handler(event)}
                                // value={applicantForm.fname ?? ""}
                                // required={error?.fname ? true : false}
                                className='w-full h-20 mb-'
                                name="fname"
                                label="First Name"
                                type="text"
                                placeholder='Your reason..'
                            />
                        </div>
                        <div className="flex w-full gap-2 items-center justify-end mt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="p-2 px-4 rounded-md hover:text-blue-400"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={loading}
                                type="submit"
                                className="bg-blue-500 p-2 px-4 rounded-md text-white hover:bg-blue-400"
                            >

                                {
                                    loading ? 'Loading...' : 'Submit'
                                }
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    )
}

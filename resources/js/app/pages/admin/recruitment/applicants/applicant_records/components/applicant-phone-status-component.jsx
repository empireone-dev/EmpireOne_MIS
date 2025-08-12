import Modal from '@/app/pages/_components/modal'
import { PhoneFilled } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React, { useState } from 'react'
import { get_applicant_thunk, phone_call_status_thunk } from '../redux/applicant-thunk';
import store from '@/app/store/store';

export default function ApplicantPhoneStatusComponent({ record, open, setOpen }) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    function closeHandler() {
        setOpen(false);
        setStatus('');
    }

    async function handleCallStatus(e) {
        e.preventDefault();

        if (!status) {
            alert('Please select a contact status');
            return;
        }

        setLoading(true);
        try {
            store.dispatch(phone_call_status_thunk({
                id: record.id,
                status: status
            }));
            store.dispatch(get_applicant_thunk());
            await new Promise(resolve => setTimeout(resolve, 1000));
            closeHandler();
        } catch (error) {
            console.error("Error update status:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex items-center justify-between font-semibold gap-2">
            <span className={`${record.call_status === "Answered" ? "text-green-500" :
                    record.call_status === "Contacted" ? "text-orange-500" :
                        record.call_status === "Cannot be reached" ? "text-red-500" :
                            "text-gray-900"
                }`}>
                {record.phone}
            </span>
            <div>
                <Tooltip title="Contact Status">
                    <button type="button" onClick={() => setOpen(true)}>
                        <PhoneFilled />
                    </button>
                </Tooltip>
                <Modal open={open} setOpen={setOpen} title="Contact Status">
                    <div>
                        <h3>Contact No.: {record.phone}</h3>
                        <h3>Contact Status: {record.status}</h3>
                        <form onSubmit={handleCallStatus}>
                            <div className='mt-2'>
                                <select
                                    className='w-full rounded-md'
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                >
                                    <option value="">Select Contact Status</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Answered">Answered</option>
                                    <option value="Cannot be reached">Cannot be reached</option>
                                </select>
                            </div>
                            <div className='mt-2 flex items-center justify-end gap-2'>
                                <button
                                    type='button'
                                    onClick={closeHandler}
                                    className='hover:bg-gray-200 px-4 py-2 rounded-md mt-2'
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-2 disabled:opacity-50'
                                    disabled={loading}
                                >
                                    {loading ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

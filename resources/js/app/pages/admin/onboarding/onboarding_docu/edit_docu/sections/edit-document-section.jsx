import Summernote from '@/app/pages/_components/summernote-view';
import { router } from '@inertiajs/react';
import { message } from 'antd';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { get_onboarding_docu_by_id_thunk, update_onboarding_doc_thunk } from '../../redux/onboarding-docu-thunk';
import store from '@/app/store/store';

export default function EditDocumentSection() {

    const { onboarding_doc } = useSelector((state) => state.onboarding_docs);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const id = window.location.pathname.split('/')[5]

    async function update_onboarding_doc() {
        setLoading(true);

        // Validate that form contains doc_content
        if (!form.doc_content) {
            message.error("Document content is required.");
            setLoading(false);
            return;
        }

        try {
            await store.dispatch(update_onboarding_doc_thunk({
                ...onboarding_doc.data,
                ...form,
            }));
            await message.success("Updated Successfully!");
            setLoading(true);
        } catch (error) {
            message.error("Failed to update. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    console.log('onboarding_asdasdasdasdoc', onboarding_doc?.data)

    console.log()
    return (
        <div className=''>
            <div>
                <Summernote
                    data={onboarding_doc?.data?.doc_content ?? ""}
                    form={form}
                    setForm={setForm} />
            </div>
            <div className='flex flex-1 gap-2 mt-5 items-center justify-end'>
                <div >
                    <button
                        className=' py-1.5 px-5 rounded-md hover:bg-slate-200'
                        onClick={() =>
                            router.visit("/admin/onboarding/onboarding_docu")
                        }>
                        Cancel
                    </button>
                </div>
                <div >
                    <button
                        className='bg-blue-500 py-1.5 px-5 rounded-md text-white hover:bg-blue-600'
                        onClick={update_onboarding_doc}
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    )
}

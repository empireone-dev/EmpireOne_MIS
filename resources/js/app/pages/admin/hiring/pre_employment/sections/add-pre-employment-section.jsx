import store from '@/app/store/store';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store_checklist_thunk } from '../redux/pre-employment-thunk';
import { setChecklistForm } from '../redux/pre-employment-slice';

export default function AddPreEmploymentSection() {
    const [open, setOpen] = useState(false);
    const { checklistForm } = useSelector((state) => state.checklists);
    const dispatch = useDispatch();

    const closeModal = () => {
        setOpen(false);
    };

    function changeHandler(e) {
        const { name, value } = e.target;
        dispatch(setChecklistForm({
            ...checklistForm,
            [name]: value,
        }));
    }

    function submitChecklist(e) {
        e.preventDefault();
        store.dispatch(store_checklist_thunk(checklistForm));
        closeModal();
    }

    return (
        <div className="my-2">
            <button
                type="button"
                onClick={() => setOpen(true)}
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-500"
            >
                Add Pre-Employment Requirements
            </button>
            <Modal
                title="New Pre Employment Requirements"
                centered
                open={open}
                onOk={submitChecklist}
                onCancel={closeModal}
                width={1000}
                okText="Save"
                cancelText="Cancel"
            >
                <form class="w-full" onSubmit={submitChecklist}>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                                Requirement's Name
                            </label>
                            <input
                                name='reqs'
                                class="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-text"
                                type="text"
                                placeholder=""
                                onChange={changeHandler}
                            />
                        </div>
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                                Is this Required?
                            </label>
                            <div className='flex flex-1 mt-2.5 ml-3 space-x-4'>
                                <div className='flex items-center'>
                                    <input
                                        name='remarks'
                                        id="required-radio"
                                        type="radio"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-black focus:ring-blue-500 focus:ring-2"
                                        value="Yes"
                                        checked={checklistForm.remarks === "Yes"}
                                        onChange={changeHandler}
                                    />
                                    <label class="ml-2 text-xs font-bold" for="required-radio">
                                        Required
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <input
                                        name='remarks'
                                        id="applicable-radio"
                                        type="radio"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-black focus:ring-blue-500 focus:ring-2"
                                        value="No"
                                        checked={checklistForm.remarks === "No"}
                                        onChange={changeHandler}
                                    />
                                    <label class="ml-2 text-xs font-bold" for="applicable-radio">
                                        Only if Applicable
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
